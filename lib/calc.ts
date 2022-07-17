export const calcWinner = (angle: number, numSlots: number) => {
  const a = angle % 360;
  const u = 360 / numSlots;
  const start = u / 2;
  return Math.floor((start + (360 - a)) / u) % numSlots;
};
