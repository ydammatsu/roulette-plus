export const calcWinner = (angle: number, numSlots: number) => {
  console.log(`%cnumslots: ${numSlots}`, "font-size: 12px; color: red");
  const a = angle % 360;
  const u = 360 / numSlots;
  const start = u / 2;
  return Math.floor((start + (360 - a)) / u) % numSlots;
};
