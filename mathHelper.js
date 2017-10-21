const MathHelper = {
  sigmoid: (x) => {
      return 1/(1+Math.exp(-x));
  },
  RLU: (x) => {
      return (x <= 0) ? 0 : x;
  },
  boolean: (x) => {
    return (x > 0) ? 1 : 0;
  },
  randomInt: (min, max) => {
    return Math.floor((Math.random() * max) + min);
  },
  random: (min, max) => {
    return (Math.random() * max) + min;
  }
}
