import { NativeModules } from "react-native";
import { loadWebSession, saveWebSession } from "@/lib/evrasia-storage";

export const EVRASIA_BASE_URL = "https://evrasia.spb.ru/api/v3";
export const EVRASIA_COMMON_URL = "https://evrasia.rest";

export class ApiError extends Error {
  status: number;
  kind: "offline" | "timeout" | "auth" | "server" | "http" | "invalid";
  constructor(message: string, status = 0, kind: ApiError["kind"] = "http") {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.kind = kind;
  }
}

export type AuthTokens = { access_token: string; refresh_token: string };
export type BonusData = { bonusPoints: number; bonusAccrualPercentage: number; overallPayedOrderSum: number };
export type UserCard = { cardIdInBX: number; type: number; title: string; name: string; cardNumberInRestis: string; created: string; status: string; picture: string; cid?: number };
export type ProfileData = { name: string; lastname: string; email: string; phone: string; registerDate: string; birthday: string; gender: string; bonusPoints: number; bonusAccrualPercentage: number; overallPayedOrderSum: number; cards: UserCard[] };
export type EditableProfile = { name: string; lastname: string; email: string; birthday: string; gender?: string };
export type BonusCardType = { id: number; title: string; picture: string };
export type CommonHistory = { raw: string; historyHtml: string; cardCids: number[] };

async function request(url: string, init: RequestInit = {}, timeoutMs = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (error: any) {
    if (error?.name === "AbortError") throw new ApiError("Сервер Евразии не ответил вовремя.", 0, "timeout");
    throw new ApiError("Нет соединения с интернетом или сервер Евразии недоступен.", 0, "offline");
  } finally {
    clearTimeout(timer);
  }
}

function errorKind(status: number): ApiError["kind"] {
  if (status === 401 || status === 403) return "auth";
  if (status >= 500) return "server";
  return "http";
}

function serverMessage(raw: string) {
  const text = raw.trim();
  if (!text) return "";
  try {
    const body = JSON.parse(text);
    const value = body?.message ?? body?.error?.message ?? body?.error ?? body?.detail ?? body?.errors?.[0]?.message;
    if (value != null) return typeof value === "string" ? value : JSON.stringify(value, null, 2);
  } catch {}
  return text;
}

async function checkedText(response: Response) {
  const value = await response.text();
  if (!response.ok) throw new ApiError(serverMessage(value) || `HTTP ${response.status}`, response.status, errorKind(response.status));
  return value;
}

async function parseJson(response: Response) {
  const value = await checkedText(response);
  try {
    return value ? JSON.parse(value) : {};
  } catch {
    throw new ApiError("Сервер Евразии вернул некорректный ответ.", response.status, "invalid");
  }
}

export function friendlyApiError(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export function isAuthError(error: unknown) {
  return error instanceof ApiError && (error.kind === "auth" || error.status === 401 || error.status === 403);
}

export async function login(phone: string, password: string): Promise<AuthTokens> {
  const form = new FormData();
  form.append("phone", phone);
  form.append("password", password);
  const body = await parseJson(await request(`${EVRASIA_BASE_URL}/signin/`, { method: "POST", headers: { accept: "application/json" }, body: form }));
  if (!body?.access_token || !body?.refresh_token) throw new ApiError("Сервер не вернул данные авторизации.", 0, "invalid");
  return { access_token: String(body.access_token), refresh_token: String(body.refresh_token) };
}

export async function refreshTokens(accessToken: string, refreshToken: string): Promise<AuthTokens> {
  const form = new FormData();
  form.append("token", refreshToken);
  const body = await parseJson(await request(`${EVRASIA_BASE_URL}/signin_refresh/`, { method: "POST", headers: { accept: "application/json", authorization: accessToken }, body: form }));
  if (!body?.access_token || !body?.refresh_token) throw new ApiError("Сервер не вернул обновлённую пару токенов.", 0, "invalid");
  return { access_token: String(body.access_token), refresh_token: String(body.refresh_token) };
}

export async function refreshUser(accessToken: string): Promise<BonusData> {
  const data = (await parseJson(await request(`${EVRASIA_BASE_URL}/users/`, { method: "POST", headers: { authorization: accessToken } })))?.data;
  if (!data) throw new ApiError("Не удалось получить бонусные данные.", 0, "invalid");
  return {
    bonusPoints: Number(data.bonusPoints || 0),
    bonusAccrualPercentage: Number(data.bonusAccrualPercentage || 0),
    overallPayedOrderSum: Number(data.overallPayedOrderSum || 0),
  };
}

export async function getProfile(accessToken: string): Promise<ProfileData> {
  const data = (await parseJson(await request(`${EVRASIA_BASE_URL}/users/`, { method: "POST", headers: { authorization: accessToken } })))?.data;
  if (!data) throw new ApiError("Сервер не вернул профиль.", 0, "invalid");
  return {
    name: String(data.name || ""),
    lastname: String(data.lastname || ""),
    email: String(data.email || ""),
    phone: String(data.phone || ""),
    registerDate: String(data.registerDate || ""),
    birthday: String(data.birthday || ""),
    gender: String(data.gender || data.sex || ""),
    bonusPoints: Number(data.bonusPoints || 0),
    bonusAccrualPercentage: Number(data.bonusAccrualPercentage || 0),
    overallPayedOrderSum: Number(data.overallPayedOrderSum || 0),
    cards: Array.isArray(data.cards) ? data.cards : [],
  };
}

export async function updateProfile(accessToken: string, profile: EditableProfile) {
  const form = new FormData();
  form.append("name", profile.name);
  form.append("lastname", profile.lastname);
  form.append("email", profile.email);
  form.append("birthday", profile.birthday);
  if (profile.gender) form.append("gender", profile.gender);
  return checkedText(await request(`${EVRASIA_BASE_URL}/edit-profile/`, { method: "POST", headers: { authorization: accessToken }, body: form }));
}

export async function getBonusCardTypes(accessToken: string): Promise<BonusCardType[]> {
  const body = await parseJson(await request(`${EVRASIA_BASE_URL}/bonus-card-info`, { headers: { authorization: accessToken } }));
  const source = body?.data?.["card-types"] || body?.["card-types"] || [];
  return Array.isArray(source)
    ? source.map((item: any) => ({ id: Number(item.id || 0), title: String(item.title || item.name || ""), picture: String(item.picture || "") }))
    : [];
}

export async function getCheckin(accessToken: string, restaurantId: number) {
  const body = await parseJson(await request(`${EVRASIA_BASE_URL}/restaurant-discount/?REST_ID=${restaurantId}&GEO=1`, { headers: { authorization: accessToken } }));
  if (!body?.data?.checkin) throw new ApiError("Сервер не вернул чекин-код.", 0, "invalid");
  return String(body.data.checkin);
}

export async function getWriteOffCode(accessToken: string) {
  const body = await parseJson(await request(`${EVRASIA_BASE_URL}/pincode`, { method: "POST", headers: { authorization: accessToken } }));
  if (!body?.message) throw new ApiError("Сервер не вернул код списания.", 0, "invalid");
  return String(body.message);
}

export async function downloadRestaurants(): Promise<Array<{ id: number; title: string; kind: "address" }>> {
  const body = await parseJson(await request(`${EVRASIA_BASE_URL}/restaurants/`));
  return (body?.data || [])
    .filter((item: any) => item?.id != null && item?.title)
    .map((item: any) => ({ id: Number(item.id), title: String(item.title), kind: "address" as const }));
}

function looksLikeSignin(html: string) {
  return /USER_PASSWORD|eurasia:signin|username_phone|username_email/i.test(html) && !/blockAccountHistory|cards_block|client_info/i.test(html);
}

function extractBitrixSessid(html: string) {
  const patterns = [
    /bitrix_sessid["']?\s*[:=]\s*["']([a-z0-9]{16,64})["']/i,
    /BX\.bitrix_sessid\s*=\s*function\s*\([^)]*\)\s*\{[^}]*return\s+["']([a-z0-9]{16,64})["']/i,
    /name=["']sessid["'][^>]*value=["']([a-z0-9]{16,64})["']/i,
    /value=["']([a-z0-9]{16,64})["'][^>]*name=["']sessid["']/i,
    /["']sessid["']\s*:\s*["']([a-z0-9]{16,64})["']/i,
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1];
  }
  return "";
}

type BrowserState = { version: 2; cookies: string; authenticated: boolean };
type BrowserResponse = { status: number; body: string; cookies: string };
const BrowserSessionNative = NativeModules.BrowserSession as {
  request: (path: string, method: string, headers: Record<string,string>, body: string, cookies: string) => Promise<BrowserResponse>
} | undefined;
const sessionQueue = new Map<string, Promise<unknown>>();

function parseBrowserState(value: string | null): BrowserState {
  try {
    const obj = value ? JSON.parse(value) : null;
    if (obj?.version === 2 && typeof obj.cookies === "string") {
      return { version: 2, cookies: obj.cookies, authenticated: obj.authenticated === true };
    }
  } catch {}
  return { version: 2, cookies: "[]", authenticated: false };
}
async function readBrowserState(account: string) { return parseBrowserState(await loadWebSession(account)); }
export async function hasCommonSession(account: string) { return (await readBrowserState(account)).authenticated; }
async function requireCommonSession(account: string) {
  if (!(await hasCommonSession(account))) throw new ApiError("Браузерная сессия отсутствует. Выполните повторную авторизацию аккаунта.", 401, "auth");
}
async function expireCommonSession(account: string) {
  const session = await readBrowserState(account);
  await saveWebSession(account, JSON.stringify({ ...session, authenticated: false }));
}
function encodeForm(values: Record<string,string>) {
  return Object.entries(values).map(([key,value]) =>
    encodeURIComponent(key).replace(/%20/g,"+")+"="+encodeURIComponent(value).replace(/%20/g,"+")).join("&");
}
async function commonRequest(account: string, path: string, init: RequestInit = {}) {
  if (!BrowserSessionNative) throw new ApiError("Модуль браузерных сессий недоступен. Обновите приложение.",0,"invalid");
  const previous = sessionQueue.get(account);
  const operation = (previous ? previous.catch(()=>{}) : Promise.resolve()).then(async () => {
    const session = await readBrowserState(account);
    let result: BrowserResponse;
    try {
      result = await BrowserSessionNative.request(path, init.method || "GET",
        (init.headers || {}) as Record<string,string>, typeof init.body === "string" ? init.body : "", session.cookies);
    } catch (error) {
      throw new ApiError("Ошибка соединения с браузерным API: " + friendlyApiError(error), 0, "offline");
    }
    if (typeof result?.body !== "string" || typeof result?.cookies !== "string") throw new ApiError("Некорректный ответ браузерного API.",0,"invalid");
    await saveWebSession(account, JSON.stringify({ ...session, cookies: result.cookies }));
    return { response: { status: result.status, ok: result.status>=200 && result.status<300 }, body: result.body };
  });
  sessionQueue.set(account, operation);
  try { return await operation; } finally { if (sessionQueue.get(account) === operation) sessionQueue.delete(account); }
}

export type CommonOtpRequest = (errorMessage?: string) => Promise<string>;

function parseBitrixAuthResponse(body: string): "authenticated" | "otp" {
  let parsed: any;
  try {
    parsed = JSON.parse(body);
  } catch {
    throw new ApiError("Общая авторизация: сервер вернул некорректный ответ Bitrix.", 0, "invalid");
  }
  if (parsed?.status === "success") {
    if (parsed.data === true || parsed.data?.authenticated === true) return "authenticated";
    if (parsed.data?.otpRequired === true) return "otp";
    if (parsed.data?.emailRequired === true) {
      throw new ApiError("Сервер запросил подтверждение входа через email; этот способ пока не поддерживается.", 401, "auth");
    }
    if (parsed.data?.smsRequired === true) {
      throw new ApiError("Сервер запросил SMS-подтверждение входа; этот способ пока не поддерживается.", 401, "auth");
    }
  }
  const item = Array.isArray(parsed?.errors) ? parsed.errors[0] : null;
  const message = typeof item?.message === "string" ? item.message
    : typeof item?.customData === "string" ? item.customData
    : typeof parsed?.message === "string" ? parsed.message
    : "Сервер отклонил попытку авторизации.";
  throw new ApiError(`Общая авторизация: ${message}`, 401, "auth");
}

async function confirmBitrixOtp(account: string, sessid: string, requestOtp: CommonOtpRequest) {
  let retryMessage: string | undefined;
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = await requestOtp(retryMessage);
    if (!/^\d{6}$/.test(code)) {
      retryMessage = "Введите ровно шесть цифр.";
      continue;
    }
    const data = encodeForm({ OTP: code });
    const action = await commonRequest(account, "/bitrix/services/main/ajax.php?analyticsLabel%5BviewMode%5D=grid&analyticsLabel%5BfilterState%5D=otp&mode=class&c=eurasia%3Asignin&action=otp", {
      method: "POST",
      headers: {
        Accept: "application/json, text/javascript, */*; q=0.01",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Bx-Ajax": "true",
        "X-Bitrix-Csrf-Token": sessid,
        "X-Bitrix-Site-Id": "s1",
        "X-Requested-With": "XMLHttpRequest",
        Origin: EVRASIA_COMMON_URL,
        Referer: `${EVRASIA_COMMON_URL}/signin/`,
      },
      body: data,
    });
    if (!action.response.ok) {
      throw new ApiError(serverMessage(action.body) || `Подтверждение входа: HTTP ${action.response.status}`,
        action.response.status, errorKind(action.response.status));
    }
    try {
      if (parseBitrixAuthResponse(action.body) !== "authenticated") {
        throw new ApiError("Сервер не подтвердил завершение входа.", 401, "auth");
      }
      return;
    } catch (error) {
      if (!(error instanceof ApiError) || error.kind !== "auth") throw error;
      retryMessage = error.message;
    }
  }
  throw new ApiError("Не удалось подтвердить вход. Начните авторизацию заново.", 401, "auth");
}

export async function commonApiLogin(account: string, phone: string, password: string, requestOtp?: CommonOtpRequest): Promise<string> {
  await saveWebSession(account, JSON.stringify({ version: 2, cookies: "[]", authenticated: false }));
  const first = await commonRequest(account, "/signin/", { method: "GET", headers: { Accept: "text/html" } });
  if (!first.response.ok) throw new ApiError(`Страница входа: HTTP ${first.response.status}`, first.response.status, errorKind(first.response.status));
  const sessid = extractBitrixSessid(first.body);
  if (!sessid) throw new ApiError("На странице входа не найден Bitrix CSRF-токен.", 0, "auth");

  const data = encodeForm({ USER_LOGIN: phone, USER_PASSWORD: password, AUTH_FORM: "Y",
    TYPE: "AUTH", BY: "PHONE", USER_REMEMBER: "Y", backurl: "/signin/" });

  const action = await commonRequest(account, "/bitrix/services/main/ajax.php?analyticsLabel%5BviewMode%5D=grid&analyticsLabel%5BfilterState%5D=closed&mode=class&c=eurasia%3Asignin&action=process", {
    method: "POST",
    headers: {
      Accept: "application/json, text/javascript, */*; q=0.01",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Bx-Ajax": "true",
      "X-Bitrix-Csrf-Token": sessid,
      "X-Bitrix-Site-Id": "s1",
      "X-Requested-With": "XMLHttpRequest",
      Origin: EVRASIA_COMMON_URL,
      Referer: `${EVRASIA_COMMON_URL}/signin/`,
    },
    body: data,
  });
  if (!action.response.ok) throw new ApiError(serverMessage(action.body) || `Общая авторизация: HTTP ${action.response.status}`, action.response.status, errorKind(action.response.status));
  const result = parseBitrixAuthResponse(action.body);
  if (result === "otp") {
    if (!requestOtp) throw new ApiError("Требуется шестизначный код приложения-аутентификатора.", 401, "auth");
    await confirmBitrixOtp(account, sessid, requestOtp);
  }

  const probe = await commonRequest(account, "/account/", { headers: { Accept: "text/html", Referer: `${EVRASIA_COMMON_URL}/signin/` } });
  if (!probe.response.ok || looksLikeSignin(probe.body)) throw new ApiError("Общая авторизация прошла, но личный кабинет не открылся.", 401, "auth");
  const session = await readBrowserState(account);
  if (session.cookies === "[]") throw new ApiError("Сервер не выдал cookies браузерной сессии.", 401, "auth");
  await saveWebSession(account, JSON.stringify({ ...session, authenticated: true }));
  return "browser-cookie-session";
}

function extractCardCids(html: string) {
  const result = new Set<number>();
  const patterns = [
    /data-cid\s*=\s*["']?(\d+)/gi,
    /data-card-cid\s*=\s*["']?(\d+)/gi,
    /["']cid["']\s*[:=]\s*["']?(\d+)/gi,
    /\bcid\s*=\s*(\d+)/gi,
  ];
  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      const value = Number(match[1]);
      if (Number.isFinite(value) && value > 0) result.add(value);
    }
  }
  return [...result];
}

export async function getCommonCardCids(account: string): Promise<number[]> {
  await requireCommonSession(account);
  const cards = await commonRequest(account, "/local/php_interface/account.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
      Referer: `${EVRASIA_COMMON_URL}/account/`,
    },
    body: "type=cards",
  });
  if (!cards.response.ok || looksLikeSignin(cards.body)) {
    await expireCommonSession(account);
    throw new ApiError("Браузерная сессия истекла. Выполните повторную авторизацию аккаунта.", 401, "auth");
  }

  let cids = extractCardCids(cards.body);
  if (!cids.length) {
    const page = await commonRequest(account, "/account/", { headers: { Accept: "text/html", Referer: `${EVRASIA_COMMON_URL}/account/` } });
    if (!page.response.ok || looksLikeSignin(page.body)) {
      await expireCommonSession(account);
      throw new ApiError("Браузерная сессия истекла. Выполните повторную авторизацию аккаунта.", 401, "auth");
    }
    cids = extractCardCids(page.body);
  }
  if (!cids.length) throw new ApiError("Общее API не вернуло cid карт.", 0, "invalid");
  return cids;
}

function prepareHistoryHtml(html: string) {
  return html
    .replace(/<i\b[^>]*class=["'][^"']*\brub\b[^"']*["'][^>]*>\s*c\s*<\/i>/gi, "₽")
    .replace(/(^|>)(\s*\d{2}\.\d{2})(\s*)(?=<|$)/gm, (_all, prefix, date, suffix) => `${prefix}${date}\u200B${suffix}`);
}

export async function getCommonHistory(account: string): Promise<CommonHistory> {
  await requireCommonSession(account);
  const cardCids = await getCommonCardCids(account);
  const update = await commonRequest(account, "/api/v2/history/update", {
    method: "POST",
    headers: {
      "Content-Type": "json",
      "X-Requested-With": "XMLHttpRequest",
      Origin: EVRASIA_COMMON_URL,
      Referer: `${EVRASIA_COMMON_URL}/account/`,
    },
    body: "",
  });
  if (!update.response.ok) throw new ApiError(serverMessage(update.body) || `Не удалось актуализировать историю: HTTP ${update.response.status}`, update.response.status, errorKind(update.response.status));

  const page = await commonRequest(account, "/account/", { headers: { Accept: "text/html", Referer: `${EVRASIA_COMMON_URL}/account/` } });
  if (!page.response.ok || looksLikeSignin(page.body)) {
    await expireCommonSession(account);
    throw new ApiError("Браузерная сессия истекла. Выполните повторную авторизацию аккаунта.", 401, "auth");
  }
  const historyHtml = page.body.match(/id=["']blockAccountHistory["'][^>]*>([\s\S]*?)(?=<\/section>|<script|<footer)/i)?.[1] || "";
  return { raw: page.body, historyHtml: prepareHistoryHtml(historyHtml), cardCids };
}

export async function getCommonWriteOffCode(account: string): Promise<string> {
  await requireCommonSession(account);
  const page = await commonRequest(account, "/account/", {
    headers: { Accept: "text/html", Referer: `${EVRASIA_COMMON_URL}/account/` },
  });
  if (!page.response.ok || looksLikeSignin(page.body)) {
    await expireCommonSession(account);
    throw new ApiError("Браузерная сессия истекла. Выполните повторную авторизацию аккаунта.", 401, "auth");
  }
  const sessid = extractBitrixSessid(page.body);
  if (!sessid) throw new ApiError("Не найден Bitrix sessid для запроса кода.", 0, "invalid");
  const answer = await commonRequest(account, "/local/php_interface/pincode.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest", Referer: `${EVRASIA_COMMON_URL}/account/` },
    body: encodeForm({ sessid }),
  });
  if (!answer.response.ok || looksLikeSignin(answer.body)) {
    if (answer.response.status === 401 || answer.response.status === 403 || looksLikeSignin(answer.body)) {
      await expireCommonSession(account);
      throw new ApiError("Браузерная сессия истекла. Выполните повторную авторизацию аккаунта.", 401, "auth");
    }
    throw new ApiError(serverMessage(answer.body) || "Сервер не выдал PIN-код.", answer.response.status, errorKind(answer.response.status));
  }
  let result: any;
  try { result = JSON.parse(answer.body); } catch {
    throw new ApiError("Сервер вернул некорректный ответ на запрос кода.", 0, "invalid");
  }
  if (result?.status !== "success" || !/^\d{4}$/.test(String(result?.pincode ?? ""))) {
    throw new ApiError(typeof result?.message === "string" ? result.message : "Сервер не вернул четырёхзначный PIN-код.", 0, "invalid");
  }
  return String(result.pincode);
}

export const webLogin = commonApiLogin;
export const getWebCardCids = getCommonCardCids;
export const getWebHistory = getCommonHistory;
export type WebHistory = CommonHistory;
