import styled from 'styled-components';

const MainContainer = styled.div`
padding: 20px;
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
width: 500px;
height: 500px;
min-width: 500px;
min-height: 500px;
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
const ToStartText = styled.p`
margin-top: revert;
font-size: 30px;
font-style: normal;
font-weight: 500;
line-height: normal;
color: #fff;
text-align: center;
`

export {MainContainer, ScoreSection, ToStartText, SnakeBorder, SnakeBody, FeedOne, Score, AllScore, PlyersScore }