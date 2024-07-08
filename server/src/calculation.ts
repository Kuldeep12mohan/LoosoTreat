
export const Calculate = ({ Users }: { Users: any }) => {
  let sum = 0;

  // Calculate the sum of selectedNum
  for (let i = 0; i < Users.length; ++i) {
    sum += Users[i].selectedNum;
  }

  // Calculate the average and adjust it to 80%
  let res = (sum / Users.length) * 0.8;

  // Find the user whose selectedNum is closest to res
  let closestUser = Users[0];
  let minDiff = Math.abs(Users[0].selectedNum - res);

  for (let i = 1; i < Users.length; ++i) {
    let diff = Math.abs(Users[i].selectedNum - res);
    if (diff < minDiff) {
      minDiff = diff;
      closestUser = Users[i];
    }
  }

  return closestUser;
};
