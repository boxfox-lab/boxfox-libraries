export const WIDTH_BY_SCREEN = {
  xsm: 350,
  sm: 640,
  md: 980,
  lg: 1024,
  xl: 1280,
  ["2xl"]: 1536,
  ["3xl"]: 2200,
};

export type SCREEN_SIZE = keyof typeof WIDTH_BY_SCREEN;
