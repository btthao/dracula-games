import Confetti from 'components/Confetti'
import StatusBar from 'components/StatusBar'
import useGameState from 'hooks/useMinesweeperState'
import { useEffect } from 'react'
import styles from 'styles/minesweeper/Grid.module.scss'
import Tile from './Tile'

interface GridProps {}

const Grid: React.FC<GridProps> = ({}) => {
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
        onClick={newGame}
        leftComponent={<div>{minesCount}</div>}
        rightComponent={<div>{timer}</div>}
      />
      <div className={styles.grid}>
        {tiles.map((tile, idx) => (
          <Tile
            key={idx}
            index={idx}
            reveal={reveal}
            flag={flag}
            gameOver={gameOver}
            {...tile}
          />
        ))}
      </div>
    </div>
  )
}

export default Grid
