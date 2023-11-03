import React, { useEffect, useState } from 'react'
import { SnakeBorder, SnakeBody, FeedOne, Score, MainContainer, ScoreSection, AllScore, PlyersScore } from './Snake.styled'
import { createPlyer, getPlyer } from '../API_Snake/API_Snake';
import Authorization from '../Authorization/Authorization';
import { useSelector } from 'react-redux';

const Snake = () => {
  const [left, setLeft] = useState(20);
  const [top, setTop] = useState(20);
  const [leftFeed, setLeftFeed] = useState(400);
  const [topFeed, setTopFeed] = useState(400);
  const [timerId, setTimerId] = useState(null);
  const [currentFeed, setCurrentFeed] = useState(1);
  const [score, setScore] = useState(0);
  const [snakeSpeed, setSnakeSpeed] = useState(350);
  const [plyerArray, setPlyerArray] = useState([]);

  const [leftBody, setLeftBody] = useState(0);
  const [topBody, setTopBody] = useState(0);
  
const name = useSelector(state => (state.myPlyer.name))
  const password = useSelector(state => (state.myPlyer.password))
  
  function randomFeed() {
    let feed = Math.floor(Math.random() * 10) + 1;
    let coordinateLeft = Math.floor(Math.random() * 50) * 20;
    let coordinateTop = Math.floor(Math.random() * 50) * 20;
    setLeftFeed(coordinateLeft)
    setTopFeed(coordinateTop)

    if (feed <= 4) {
      setCurrentFeed(1)
    } else if (feed <= 8 && feed > 4) {
      setCurrentFeed(5)
    } else if ((feed <= 10 && feed > 8)) { setCurrentFeed(10) }
  }
  
  useEffect(() => {
    if (top === 1000 || left === 1000 || top === -20 || left === -20) {
      clearInterval(timerId);
      createPlyer({ name, password, score })
      getAllPlyer()
    };
  }, [left, name, password, score, timerId, top]);

  function getAllPlyer() {
    return getPlyer().then((resp) => setPlyerArray(resp))
  }
  
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
  }, [currentFeed, left, leftFeed, score, snakeSpeed, timerId, top, topFeed]);

  return (
    <MainContainer>
      <SnakeBorder>
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
          }}></FeedOne>
      </SnakeBorder>
      {(!name)
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