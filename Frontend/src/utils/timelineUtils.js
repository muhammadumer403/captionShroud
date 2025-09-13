export const getTimeFromPx = (px, maxTime, width) => {
  return Math.max(0, (px / width) * maxTime);
};

export const getPxFromTime = (time, maxTime, width) => {
  return (time / maxTime) * width;
};