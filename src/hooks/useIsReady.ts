import { useNavigation } from "@react-navigation/native";
import React from "react";

const useIsReady = (stack = true) => {
  const navigation = useNavigation();
  const [isReady, setIsReady] = React.useState(false);
  React.useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      if (!isReady) setIsReady(true);
    });

    const unsubscribeTransitionEnd = stack
      ? // @ts-ignore
        navigation.addListener("transitionEnd", () => {
          if (!isReady) setIsReady(true);
        })
      : undefined;

    return () => {
      unsubscribeFocus();
      unsubscribeTransitionEnd && unsubscribeTransitionEnd();
    };
  }, []);
  return isReady;
};

export default useIsReady;
