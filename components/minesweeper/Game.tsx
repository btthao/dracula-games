import Confetti from 'components/Confetti'
import StatusBar from 'components/StatusBar'
import useGameState from 'hooks/useMinesweeperState'
import { useEffect } from 'react'
import styles from 'styles/minesweeper/Game.module.scss'
import Tile from './Tile'

const Game: React.FC = () => {
  const { state, newGame, reveal, flag, setTimer } = useGameState()
  const { tiles, gameOver, minesCount, won, timer } = state

  useEffect(() => {
    const myTimeout = setTimeout(setTimer, 1000)
    return () => {
      clearTimeout(myTimeout)
    }
  }, [setTimer, timer])

  return (
    <div className={styles.container}>
      {won && <Confetti />}
      <StatusBar
        gameOver={gameOver}
        won={won}
        restart={newGame}
        leftComponent={
          <>
            <div>{minesCount}</div>
            <div>Mines</div>
          </>
        }
        rightComponent={
          <>
            <div>{timer}</div>
            <div>Timer</div>
          </>
        }
      />
      <div className={styles.grid}>
        {tiles.map((tile, idx) => (
          <Tile key={idx} index={idx} reveal={reveal} flag={flag} gameOver={gameOver} {...tile} />
        ))}
      </div>
    </div>
  )
}

export default Game
