import React, { useEffect, useState } from 'react'
import { SnakeBorder, SnakeBody, FeedOne, Score, MainContainer, ScoreSection, AllScore, PlyersScore, ToStartText } from './Snake.styled'
import { getPlyer, updatePlyer } from '../API_Snake/API_Snake';
import Authorization from '../Authorization/Authorization';
import { useSelector } from 'react-redux';

const Snake = () => {
  const [left, setLeft] = useState(20);
  const [top, setTop] = useState(20);
  const [leftFeed, setLeftFeed] = useState(200);
  const [topFeed, setTopFeed] = useState(200);
  const [timerId, setTimerId] = useState(null);
  const [currentFeed, setCurrentFeed] = useState(1);
  const [score, setScore] = useState(0);
  const [snakeSpeed, setSnakeSpeed] = useState(350);
  const [plyerArray, setPlyerArray] = useState([]);
  const [leftBody, setLeftBody] = useState(0);
  const [topBody, setTopBody] = useState(0);
  
const plyer = useSelector(state => (state.myPlyer))
  
const {name, password, id} = plyer
  function randomFeed() {
    let feed = Math.floor(Math.random() * 10) + 1;
    let coordinateLeft = Math.floor(Math.random() * 25) * 20;
    let coordinateTop = Math.floor(Math.random() * 25) * 20;
    setLeftFeed(coordinateLeft)
    setTopFeed(coordinateTop)

    if (feed <= 4) {
      setCurrentFeed(1)
    } else if (feed <= 8 && feed > 4) {
      setCurrentFeed(5)
    } else if ((feed <= 10 && feed > 8)) { setCurrentFeed(10) }
  }

  async function getAllPlyer() {
    const resp = await getPlyer();
    return setPlyerArray(resp);
  };

    useEffect(() => {
    if (top === 500 || left === 500 || top === -20 || left === -20) {
      clearInterval(timerId);
      updatePlyer({ score, id })

      getAllPlyer()
      setLeft(20)
      setTop(20)
      setScore(0)

    };
  }, [id, left, name, password, score, timerId, top]);
  
  useEffect(() => {
    if (plyerArray.length === 0 && name) { getAllPlyer() }
  }, [plyerArray.length, name])
  
  
  useEffect(() => {
    function elementAdd() {
      if (left === leftFeed && top === topFeed) {
        randomFeed()
        setScore(prevScore => prevScore + currentFeed)
        if (score % 50 === 0) {
          setSnakeSpeed(prevSpeed => prevSpeed - 10)
        }
      }
    }
    elementAdd()
    const snakeMove = (e) => {
      if (!name || !password) {
      return
    }
      if (timerId) {
        clearInterval(timerId)
      }
      switch (e.code) {
        case 'ArrowUp':
          if (top > 0) {
            setLeftBody(left)
            setTopBody(top + 20)
            setTimerId(setInterval(() => {
              setTop(prevTop => prevTop - 20)
              setTopBody(prevLeft => prevLeft - 20)
            }, snakeSpeed))
          }
          break;
        case 'ArrowDown':
          if (top < 880) {
            setLeftBody(left)
            setTopBody(top - 20)
            setTimerId(setInterval(() => {
              setTop((prevTop) => prevTop + 20)
              setTopBody(prevLeft => prevLeft + 20)
            }, snakeSpeed))
          }
          break;
        case 'ArrowRight':
          if (left < 1120) {
            setLeftBody(left - 20)
            setTopBody(top)
            setTimerId(setInterval(() => {
              setLeft(prevLeft => prevLeft + 20)
              setLeftBody(prevLeft => prevLeft + 20)
            }, snakeSpeed))
          }
          break;
        case 'ArrowLeft':
          if (left > 0) {
            setLeftBody(left + 20)
            setTopBody(top)
            setTimerId(setInterval(() => {
              setLeft(prevLeft => prevLeft - 20)
              setLeftBody(prevLeft => prevLeft - 20)
            }, snakeSpeed))
          }
          break;
        default:
          break;
      }

    };
    window.addEventListener("keydown", snakeMove)
    return () => window.removeEventListener('keydown', snakeMove)
  }, [currentFeed, left, leftFeed, name, password, score, snakeSpeed, timerId, top, topFeed]);

  return (
    <MainContainer>
      <SnakeBorder>
        {(!name || !password) ? <ToStartText>Enter your name and password to play game</ToStartText>
        : <div>
        <SnakeBody
          style={{
            top: `${topBody}px`,
            left: `${leftBody}px`,
          }}></SnakeBody>
        <SnakeBody
          style={{
            top: `${top}px`,
            left: `${left}px`,
            backgroundColor: 'black'
          }}></SnakeBody>
        <FeedOne
          style={{
            top: `${topFeed}px`,
            left: `${leftFeed}px`,
          }}></FeedOne></div>}
      </SnakeBorder>
      {(!name || !password)
        ? <Authorization />
        : <ScoreSection>
        <Score>{score}</Score>
          <AllScore>
           {plyerArray.map((data) =><PlyersScore key={data.id}>
            <p>{data.name} </p>
            <p>{data.score}</p>
          </PlyersScore>)}
          </AllScore>
      </ScoreSection>}
      
    </MainContainer>
  )
};

export default Snake