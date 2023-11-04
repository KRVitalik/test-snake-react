import styled from 'styled-components';

const MainAuthContainer = styled.div`
padding: 20px;
`

const RegisterInput = styled.input`
max-width: 351px;
height: 27px;
flex-shrink: 0;
border-radius: 9px;
border: 1px solid #ADADAD;
background: #FFF;
color: #808080;
font-family: Poppins;
font-size: 18px;
font-style: normal;
font-weight: 300;
line-height: normal;
padding: 19px 25px;
&:focus{
border: 1px solid #4285F4;
background: #FFF;
}`

const RegisterFormButton = styled.button`
width: 236px;
height: 54px;
border-radius: 10px;
background: #779341;
box-shadow: 0px 4px 19px 0px rgba(119, 147, 65, 0.30);
border: 0;
align-self: flex-end;
cursor: pointer;
color: #FFF;
font-family: Poppins;
font-size: 24px;
font-style: normal;
font-weight: 500;
line-height: normal;
margin: 0 auto;
`

const RegisterForm = styled.form`
display: flex;
flex-direction: column;
gap: 35px;
`

const RegisterLabel = styled.label`
display: flex;
flex-direction: column;
color: #000;
font-family: Poppins;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
`

export {MainAuthContainer, RegisterInput, RegisterFormButton, RegisterForm, RegisterLabel}