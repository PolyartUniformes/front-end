const isLate = (date: string) => {
  const date1 = new Date();
  const date2 = new Date(date);

  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  const dayMath = 1000 * 60 * 60 * 24;
  const result = Math.floor((utc2 - utc1) / dayMath);

  if (result >= 0) {
    return false;
  }

  return true;
};

export { isLate };
