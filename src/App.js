import { useEffect, useState } from 'react'
import './App.css'
import Deck from './utils/Deck'

function App() {
  const [deck] = useState(new Deck())
  deck.shuffle()

  const [gameStarted, setGameStarted] = useState(false)

  const [computerCards, setComputerCards] = useState(deck.cards.slice(0, 26))
  const [playerCards, setPlayerCards] = useState(deck.cards.slice(26, 52))

  const [currentComputerCard, setCurrentComputerCard] = useState({})
  const [currentPlayerCard, setCurrentPlayerCard] = useState({})

  const [message, setMessage] = useState('')

  // deal two cards
  // check who is highest
  // give winner losers card
  // take losers card from top of deck
  // put winning card at bottom of winners deck

  const dealCards = () => {
    if (!gameStarted) {
      setGameStarted(true)
    }
    setCurrentComputerCard(computerCards[0])
    setCurrentPlayerCard(playerCards[0])
  }

  // make ai play.
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     dealCards()
  //   }, 20)
  //   return () => {
  //     clearInterval(timer)
  //   }
  // })

  const getCardValue = (card) => {
    switch (card) {
      case 'J':
        return 11
      case 'Q':
        return 12
      case 'K':
        return 13
      case 'A':
        return 14
      default:
        return Number(card)
    }
  }

  useEffect(() => {
    const checkWinner = (currentComputerCard, currentPlayerCard) => {
      if (getCardValue(currentComputerCard.value) === getCardValue(currentPlayerCard.value)) {
        // draw
        setPlayerCards((state) => {
          return [...state.slice(1), currentPlayerCard]
        })
        setComputerCards((state) => {
          return [...state.slice(1), currentComputerCard]
        })
        return setMessage('Draw!')
      }
      if (getCardValue(currentComputerCard.value) > getCardValue(currentPlayerCard.value)) {
        // computer wins
        setComputerCards((state) => {
          return [...state.slice(1), currentComputerCard, currentPlayerCard]
        })
        setPlayerCards((state) => {
          return [...state.slice(1)]
        })
        return setMessage('Computer Wins!')
      } else {
        // player wins
        setPlayerCards((state) => {
          return [...state.slice(1), currentPlayerCard, currentComputerCard]
        })
        setComputerCards((state) => {
          return [...state.slice(1)]
        })
        return setMessage('You Win!')
      }
    }
    if (gameStarted) {
      checkWinner(currentComputerCard, currentPlayerCard)
    }
  }, [currentComputerCard, currentPlayerCard, gameStarted])

  return (
    <div className="App">
      <h1>Play War!</h1>
      <div className="board">
        {/* <div>
          {computerCards
            .map((item) => {
              return item.value
            })
            .join()}
        </div> */}
        <div className="computer-area">
          <div className="chips">
            <div className="chip">{computerCards.length}</div>
          </div>

          <div className="deck"></div>
          {currentComputerCard.value ? (
            <div className="card">
              <div className="top">{`${currentComputerCard.value} ${currentComputerCard.suit}`}</div>
              <div className="middle">{currentComputerCard.suit}</div>
              <div className="bottom">{`${currentComputerCard.value} ${currentComputerCard.suit}`}</div>
            </div>
          ) : null}
        </div>
        <div className="text-area">
          <div className="message">{message}</div>
        </div>
        <div className="player-area">
          <div className="chip">{playerCards.length}</div>
          <div className="deck"></div>
          {currentPlayerCard.value ? (
            <div className="card">
              <div className="top">{`${currentPlayerCard.value} ${currentPlayerCard.suit}`}</div>
              <div className="middle">{currentPlayerCard.suit}</div>
              <div className="bottom">{`${currentPlayerCard.value} ${currentPlayerCard.suit}`}</div>
            </div>
          ) : null}
        </div>
        {/* <div>
          {playerCards
            .map((item) => {
              return item.value
            })
            .join()}
        </div> */}
      </div>
      <div className="controls">
        <button className="deal-btn" onClick={dealCards}>
          DEAL
        </button>
        {/* <button className="restart-btn">Restart</button> */}
      </div>
    </div>
  )
}

export default App
