export {
  dayNouns,
  weekNouns,
  monthNouns,
  yearNouns,
  variantNouns,
  reviewNouns,
  voteNouns,
  facilities,
  guests,
  formElementsPageRoomCards
};

const dayNouns = ['день', 'дня', 'дней'];
const weekNouns = ['неделя', 'недели', 'недель'];
const monthNouns = ['месяц', 'месяца', 'месяцев'];
const yearNouns = ['год', 'года', 'лет'];
const variantNouns = ['варианта', 'вариантов', 'вариантов'];
const reviewNouns = ['отзыв', 'отзыва', 'отзывов'];
const voteNouns = ['голос', 'голоса', 'голосов'];

const facilities = [
  ['спальня', 'спальни', 'спален'],
  ['кровать', 'кровати', 'кроватей'],
  ['ванная комната', 'ванные комнаты', 'ванных комнат']
];

const guests = [
  ['гость', 'гостя', 'гостей'],
  ['младенец', 'младенца', 'младенцев']
];

const formElementsPageRoomCards = [];
for (let i = 1; i < 170; i++) {
  formElementsPageRoomCards.push(i)
}