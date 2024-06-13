import {Dimensions, Platform} from 'react-native';

const {height, width} = Dimensions.get('window');

export const chuckLogEnabled = false;

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

export const sizeHeight = setheight => {
  return (setheight * height) / 100;
};

export const sizeWidth = setwidth => {
  return (setwidth * width) / 100;
};

export const sizeFont = size => {
  return (size * width) / 100;
};

export const isIPhoneX = () =>
  Platform.OS === 'ios'
    ? (width === X_WIDTH && height === X_HEIGHT) ||
      (width === XSMAX_WIDTH && height === XSMAX_HEIGHT)
    : false;

export const ToolbarHeight = Platform.select({
  ios: isIPhoneX() ? 65 : 55,
  android: 60,
  default: 0,
});
