export {
  dayNouns,
  weekNouns,
  monthNouns,
  yearNouns,
  variantNouns,
  facilities,
  guests,
  roomCards
};

const dayNouns = ['день', 'дня', 'дней'];
const weekNouns = ['неделя', 'недели', 'недель'];
const monthNouns = ['месяц', 'месяца', 'месяцев'];
const yearNouns = ['год', 'года', 'лет'];
const variantNouns = ['варианта', 'вариантов', 'вариантов'];

const facilities = [
  ['спальня', 'спальни', 'спален'],
  ['кровать', 'кровати', 'кроватей'],
  ['ванная комната', 'ванные комнаты', 'ванных комнат']
];

const guests = [
  ['гость', 'гостя', 'гостей'],
  ['младенец', 'младенца', 'младенцев']
];

const roomCards = [];
for (let i = 1; i < 170; i++) {
  roomCards.push(i)
}