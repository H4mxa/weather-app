import { StatusBar, useWindowDimensions } from "react-native";

const useApplicationDimensions = () => {
  const { width, height, scale, fontScale } = useWindowDimensions();

  return {
    width,
    height: height + (StatusBar?.currentHeight || 0),
    scale,
    fontScale,
  };
};

export default useApplicationDimensions;
