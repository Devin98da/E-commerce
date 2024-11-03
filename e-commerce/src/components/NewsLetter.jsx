import React, { useState } from 'react'
import styled from 'styled-components';
import SendIcon from '@material-ui/icons/Send';
import { mobile } from '../responsive';
import { publicRequest } from '../requestMethod';

const Container = styled.div`
  height:60vh;
  background-color:#fcf5f5;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
`
const Title = styled.h1`
  font-size:70px;
  margin:20px;
`
const Description = styled.div`
  font-size:24px;
  font-weight:300;
  margin-bottom:20px;
  ${mobile({ textAlign: "center" })}
`
const InputContainer = styled.div`
  width:50%;
  height:40px;
  background-color:white;
  display:flex;
  justify-content:space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}

`
const Input = styled.input`
  border:none;
  flex:8;
  padding-left:20px;
  
`
const Button = styled.button`
  flex:1;
  border:none;
  background-color: teal;
  color: white;
  cursor: pointer;
`
const Message = styled.p`
  color: ${(props) => props.color};
  margin-top: 10px;
`;

const NewsLetter = () => {

  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('black');

  const IsValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleEmailSubscribe = async () => {
    if (!subscribeEmail) {
      setMessage('Please enter an email address.');
      setMessageColor('red');
      return;
    }

    if (!IsValidEmail(subscribeEmail)) {
      setMessage('Please enter a valid email address.');
      setMessageColor('red');
      return;
    }

    try {
      const res = await publicRequest.post('/email/subscribe', { email: subscribeEmail });
      setMessage(res.data.message || 'Subscription successful!');
      console.log(res.data)
      setMessageColor('green');
    } catch (error) {
      setMessage('Subscription failed. Please try again.');
      setMessageColor('red');
      console.error('Error subscribing:', error);
    }
  }

  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely updates from your favorite products.</Description>
      <InputContainer>
        <Input placeholder='Your email...' onChange={(e) => setSubscribeEmail(e.target.value)} />
        <Button onClick={handleEmailSubscribe}>
          <SendIcon />
        </Button>
      </InputContainer>
      {message && <Message color={messageColor}>{message}</Message>}
    </Container>
  )
}

export default NewsLetter