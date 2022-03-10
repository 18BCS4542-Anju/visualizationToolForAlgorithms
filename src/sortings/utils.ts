import { sortedStatusShape } from './selection/types';

export const getClassNames = (
  index: number,
  currentIndex: number,
  swapIndex: number,
  sortStatus: sortedStatusShape,
): string => {
  const className: Array<string> = ['rectangle'];

  if (index === currentIndex && sortStatus === 'IP') {
    className.push('active');
  } else if (index < currentIndex) {
    className.push('sorted');
  } else if (index === swapIndex) {
    className.push('swap');
  } else if (sortStatus === 'AS') {
    className.push('sorted');
  }
  return className.join(' ');
};

export const testing = () => {
  // do nothing
};
