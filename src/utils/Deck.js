import Card from './Card'

const SUITS = ['♣️', '♦️', '♥️', '♠️']
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

function generateDeck() {
  return SUITS.flatMap((suit) => {
    return VALUES.map((value) => {
      return new Card(suit, value)
    })
  })
}

export default class Deck {
  constructor(cards = generateDeck()) {
    this.cards = cards
  }
  shuffle() {
    return this.cards.sort((a, b) => {
      const rand = Math.random() - 0.5
      return rand < 0 ? Math.floor(rand) : Math.ceil(rand)
    })
  }
}
