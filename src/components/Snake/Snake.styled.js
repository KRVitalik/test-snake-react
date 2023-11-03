import styled from 'styled-components';

const MainContainer = styled.div`
display: flex;
justify-content: space-around;
`

const ScoreSection = styled.section `
display: flex;
flex-direction: column;
gap: 10px;
padding: 20px;
`

const SnakeBorder = styled.div`
background-color: teal;
width: 1000px;
height: 1000px;
position: relative;
`

const SnakeBody = styled.div`
position: absolute;
background-color: red;
width: 20px;
height: 20px;
`

const FeedOne = styled.div`
position: absolute;
background-color: yellow;
width: 20px;
height: 20px;
`

const Score = styled.h2`
align-self: center;
font-size: 80px
`

const AllScore = styled.ul`
font-size: 30px;
width: 200px;
`

const PlyersScore = styled.li`
display: flex;
justify-content: space-between;
`

export {MainContainer, ScoreSection, SnakeBorder, SnakeBody, FeedOne, Score, AllScore, PlyersScore }