const sumSizes = (sizes: number[], value: number, index: number) => {
  let newArray = [...sizes];

  newArray[index] = value;

  let total = newArray.reduce((prev, curr) => {
    return prev + curr;
  });

  return { newArray, total };
};

export { sumSizes };
