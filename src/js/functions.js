export {
  getNoun
};

const getNoun = (number, nouns) => {
  switch (true) {
    case (number === 1):
      return nouns[0];
    case ((number > 1) && (number < 5)):
      return nouns[1];
    case (number === 0):
    case ((number > 4) && (number < 21)):
      return nouns[2];
    default:
      let numberLastDigit = +Array.from(number.toString()).pop();
      return getNoun(numberLastDigit, nouns);
  }
};