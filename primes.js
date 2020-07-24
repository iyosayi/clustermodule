module.exports = (num) => {
  if ([2, 3].indexOf(num) >= 0) {
    return true;
  } else if ([2, 3].some((n) => num % n == 0)) {
    return false;
  } else {
    let i = 5;
    let j = 2;
    while (i * i <= num) {
      if (num % i == 0) return false;
      i += j;
      j = 6 - j;
    }
  }
  return true;
};
