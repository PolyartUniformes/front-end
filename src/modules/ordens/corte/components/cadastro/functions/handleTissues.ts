const setTissues = (tissues: string[], value: string, index: number) => {
  let tissuesList = [...tissues];

  tissuesList[index] = value;

  return tissuesList;
};

export { setTissues };
