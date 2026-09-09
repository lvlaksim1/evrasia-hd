import fs from "node:fs";
import path from "node:path";

const packageDir = path.join(process.cwd(), "node_modules", "react-native-draggable-flatlist");
const packageJsonPath = path.join(packageDir, "package.json");
const targetPath = path.join(packageDir, "src", "hooks", "useAutoScroll.tsx");

if (!fs.existsSync(packageJsonPath) || !fs.existsSync(targetPath)) {
  throw new Error("react-native-draggable-flatlist is not installed");
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
if (packageJson.version !== "4.0.3") {
  throw new Error(`Directional autoscroll patch expects react-native-draggable-flatlist 4.0.3, got ${packageJson.version}`);
}

const patchedSource = `import {
  runOnJS,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { DEFAULT_PROPS, SCROLL_POSITION_TOLERANCE } from "../constants";
import { useProps } from "../context/propsContext";
import { useAnimatedValues } from "../context/animatedValueContext";
import { useRefs } from "../context/refContext";

// EVRASIA_DIRECTIONAL_AUTOSCROLL
// Autoscroll starts only after a deliberate 5 px movement toward an edge and
// only after at least 50% of the dragged cell is outside the visible list area.
export function useAutoScroll() {
  const { flatlistRef } = useRefs();

  const { autoscrollSpeed = DEFAULT_PROPS.autoscrollSpeed } = useProps();

  const {
    scrollOffset,
    scrollViewSize,
    containerSize,
    activeCellSize,
    hoverOffset,
    activeIndexAnim,
    touchTranslate,
  } = useAnimatedValues();

  const hoverScreenOffset = useDerivedValue(() => {
    return hoverOffset.value - scrollOffset.value;
  }, []);

  const isScrolledUp = useDerivedValue(() => {
    return scrollOffset.value - SCROLL_POSITION_TOLERANCE <= 0;
  }, []);

  const isScrolledDown = useDerivedValue(() => {
    return (
      scrollOffset.value + containerSize.value + SCROLL_POSITION_TOLERANCE >=
      scrollViewSize.value
    );
  }, []);

  const topOverflow = useDerivedValue(() => {
    return Math.max(0, -hoverScreenOffset.value);
  }, []);

  const bottomOverflow = useDerivedValue(() => {
    return Math.max(
      0,
      hoverScreenOffset.value + activeCellSize.value - containerSize.value
    );
  }, []);

  const scrollTarget = useSharedValue(0);
  const dragDirection = useSharedValue(0);
  const directionAnchor = useSharedValue(0);
  const dragIsActive = useDerivedValue(() => {
    return activeIndexAnim.value >= 0;
  }, []);

  useAnimatedReaction(
    () => dragIsActive.value,
    (cur, prev) => {
      if (cur && !prev) {
        scrollTarget.value = scrollOffset.value;
        dragDirection.value = 0;
        directionAnchor.value = touchTranslate.value;
      } else if (!cur) {
        dragDirection.value = 0;
        directionAnchor.value = touchTranslate.value;
      }
    }
  );

  useAnimatedReaction(
    () => touchTranslate.value,
    (cur) => {
      if (!dragIsActive.value) return;
      const delta = cur - directionAnchor.value;
      if (delta >= 5) {
        dragDirection.value = 1;
        directionAnchor.value = cur;
      } else if (delta <= -5) {
        dragDirection.value = -1;
        directionAnchor.value = cur;
      }
    }
  );

  const shouldScrollUp = useDerivedValue(() => {
    const halfCell = activeCellSize.value * 0.5;
    return (
      dragDirection.value < 0 &&
      topOverflow.value >= halfCell &&
      !isScrolledUp.value &&
      activeIndexAnim.value >= 0
    );
  }, []);

  const shouldScrollDown = useDerivedValue(() => {
    const halfCell = activeCellSize.value * 0.5;
    return (
      dragDirection.value > 0 &&
      bottomOverflow.value >= halfCell &&
      !isScrolledDown.value &&
      activeIndexAnim.value >= 0
    );
  }, []);

  const shouldAutoScroll = useDerivedValue(() => {
    const scrollTargetDiff = Math.abs(scrollTarget.value - scrollOffset.value);
    const hasScrolledToTarget = scrollTargetDiff < SCROLL_POSITION_TOLERANCE;
    return hasScrolledToTarget && (shouldScrollUp.value || shouldScrollDown.value);
  }, []);

  function scrollToInternal(offset: number) {
    if (flatlistRef && "current" in flatlistRef) {
      flatlistRef.current?.scrollToOffset({ offset, animated: true });
    }
  }

  useDerivedValue(() => {
    if (!shouldAutoScroll.value) return;

    const scrollingUp = shouldScrollUp.value;
    const overflow = scrollingUp ? topOverflow.value : bottomOverflow.value;
    const speedPct = Math.min(
      1,
      Math.max(0.5, overflow / Math.max(1, activeCellSize.value))
    );
    const offset = speedPct * autoscrollSpeed;
    const targetOffset = scrollingUp
      ? Math.max(0, scrollOffset.value - offset)
      : Math.min(
          scrollOffset.value + offset,
          scrollViewSize.value - containerSize.value
        );

    scrollTarget.value = targetOffset;
    runOnJS(scrollToInternal)(targetOffset);
  }, []);

  return null;
}
`;

fs.writeFileSync(targetPath, patchedSource, "utf8");
console.log("Applied EVRASIA_DIRECTIONAL_AUTOSCROLL patch to react-native-draggable-flatlist 4.0.3");
