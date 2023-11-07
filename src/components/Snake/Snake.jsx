import React, { useEffect, useState } from 'react'
import { SnakeBorder, SnakeBody, FeedOne, Score, MainContainer, ScoreSection, AllScore, PlyersScore, ToStartText } from './Snake.styled'
import { getPlyer, updatePlyer } from '../API_Snake/API_Snake';
import Authorization from '../Authorization/Authorization';
import { useSelector } from 'react-redux';

const Snake = () => {
  const [leftFeed, setLeftFeed] = useState(200);
  const [topFeed, setTopFeed] = useState(200);
  const [timerId, setTimerId] = useState(null);
  const [currentFeed, setCurrentFeed] = useState(1);
  const [score, setScore] = useState(0);
  const [snakeSpeed, setSnakeSpeed] = useState(350);
  const [plyerArray, setPlyerArray] = useState([]);
  const [snakeBodyLength, setSnakeBodyLength] = useState([{ top: 20, left: 20 }]);

const {top, left} = snakeBodyLength[0]

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
  };

  async function getAllPlyer() {
    const resp = await getPlyer();
    return setPlyerArray(resp);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function dropScore() {
      clearInterval(timerId);
      updatePlyer({ score, id })
      getAllPlyer()
      setSnakeBodyLength([{ top: 20, left: 20 }])
      setScore(0)
      setSnakeSpeed(350)
  };

    useEffect(() => {
    if (top === 500 || left === 500 || top === -20 || left === -20) {
      dropScore()
      };
      if (plyerArray.length === 0 && name) { getAllPlyer() }
  }, [dropScore, id, left, name, password, plyerArray.length, score, snakeBodyLength, snakeBodyLength.left, snakeBodyLength.top, timerId, top]);
  
  snakeBodyLength.forEach((body, index) => {
    if (index !== 0 && index !== 1 && top === body.top && left === body.left) {
      dropScore()
    }
  });
  
  useEffect(() => {
    function addSnakeSegment() {
      const lastSegment = snakeBodyLength[snakeBodyLength.length - 1];
      const newSegment = { top: lastSegment.top, left: lastSegment.left };

      setSnakeBodyLength(prevBody => {
        const newBody = [...prevBody];
        newBody.push(newSegment);
        return newBody;
      });
    };

    if (left === leftFeed && top === topFeed) {
      randomFeed()
      setScore(prevScore => prevScore + currentFeed)
      addSnakeSegment()

      if (score % 50 === 0) {
        setSnakeSpeed(prevSpeed => prevSpeed - 10)
      }
    }

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
            setTimerId(setInterval(() => {
      setSnakeBodyLength((prevBody) => {
        const newBody = prevBody.map((segment, index) => {
          if (index === 0) {
            const newTop = segment.top - 20;
            const newLeft = segment.left;
            return { top: newTop, left: newLeft };
          } else {
            const newTop = prevBody[index - 1].top;
            const newLeft = prevBody[index - 1].left;
            return { top: newTop, left: newLeft };
          }
        });
        return newBody;
      });
    }, snakeSpeed));
  }
  break;
        case 'ArrowDown':
          if (top < 500) {
            setTimerId(setInterval(() => {
      setSnakeBodyLength((prevBody) => {
        const newBody = prevBody.map((segment, index) => {
          if (index === 0) {
            const newTop = segment.top + 20;
            const newLeft = segment.left;
            return { top: newTop, left: newLeft };
          } else {
            const newTop = prevBody[index - 1].top;
            const newLeft = prevBody[index - 1].left;
            return { top: newTop, left: newLeft };
          }
        });
        return newBody;
      });
    }, snakeSpeed));
  }
  break;
        case 'ArrowRight':
          if (left < 500) {
            setTimerId(setInterval(() => {
      setSnakeBodyLength((prevBody) => {
        const newBody = prevBody.map((segment, index) => {
          if (index === 0) {
            const newTop = segment.top;
            const newLeft = segment.left + 20;
            return { top: newTop, left: newLeft };
          } else {
            const newTop = prevBody[index - 1].top;
            const newLeft = prevBody[index - 1].left;
            return { top: newTop, left: newLeft };
          }
        });
        return newBody;
      });
    }, snakeSpeed));
  }
  break;
        case 'ArrowLeft':
          if (left > 0) {
setTimerId(setInterval(() => {
      setSnakeBodyLength((prevBody) => {
        const newBody = prevBody.map((segment, index) => {
          if (index === 0) {
            const newTop = segment.top;
            const newLeft = segment.left - 20;
            return { top: newTop, left: newLeft };
          } else {
            const newTop = prevBody[index - 1].top;
            const newLeft = prevBody[index - 1].left;
            return { top: newTop, left: newLeft };
          }
        });
        return newBody;
      });
    }, snakeSpeed));
          }
  break;
        default:
          break;
      }

    };
    window.addEventListener("keydown", snakeMove)
    return () => window.removeEventListener('keydown', snakeMove)
  }, [currentFeed, left, leftFeed, name, password, score, snakeBodyLength, snakeSpeed, timerId, top, topFeed]);

  return (
    <MainContainer>
      <SnakeBorder>
        {(!name || !password) ? <ToStartText>Enter your name and password to play game</ToStartText>
          : <div>
            {snakeBodyLength.map((body) => <SnakeBody key={Math.random()}
              
          style={{
            top: `${body.top}px`,
            left: `${body.left}px`,
            border: '1px solid black',
          }}></SnakeBody>)}
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