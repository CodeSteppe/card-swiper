// DOM
const swiper = document.querySelector('.swiper');

// constants
const urls = [
  'https://source.unsplash.com/random/1000x1000/?sky',
  'https://source.unsplash.com/random/1000x1000/?landscape',
  'https://source.unsplash.com/random/1000x1000/?ocean',
  'https://source.unsplash.com/random/1000x1000/?moutain',
  'https://source.unsplash.com/random/1000x1000/?forest'
];

// variables
let cardCount = 0;

// first 5 cards
for (let i = 0; i < 5; i++) {
  const card = new Card({ imageUrl: urls[cardCount % 5] });
  swiper.append(card.element);
  cardCount++;
}