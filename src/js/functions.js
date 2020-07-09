export {
  getNoun,
  prettifyNumber
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

const prettifyNumber = (number, separator = '\u00A0') => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}