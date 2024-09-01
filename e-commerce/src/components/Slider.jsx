import React, { useState } from 'react'
import styled from 'styled-components';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';
import { sliderItems } from '../data';
import { mobile } from '../responsive';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    margin-top:20px;
    ${mobile({ display: "none" })};
`
  
const Arrow = styled.div`
    width:50px;
    height:50px;
    background-color:#fff7f7;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    position:absolute;
     top: 50%; /* Position in the middle vertically */
    transform: translateY(-50%); /* Center vertically */
    ${props => props.direction === 'left' ? 'left: 10px;' : 'right: 10px;'};
    cursor:pointer;
    opacity:0.5;
    z-index:2;
`

const Wrapper = styled.div`
    height:100%;
    display:flex;
    transition:all 1.5s ease;
      transform: translateX(${(props) => props.slideIndex * -100}vw);
`

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color:#${props => props.bg}
`
const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
    font-size:70px;
`
const Description = styled.p`
    margin:50px 0;
    font-size:20px;
    font-weight:500;
    letter-spacing:3px;
`
const Button = styled.button`
    padding:10px;
    font-size:20px;
    background-color:transparent;
    cursor:pointer;
`

const Slider = () => {

    const [sliderIndex, setSliderIndex] = useState(0);

    const handleClick = (direction) => {
        if (direction === 'left') {
            setSliderIndex(sliderIndex > 0 ? setSliderIndex - 1 : 2);
        } else if (direction === 'right') {
            setSliderIndex(sliderIndex < 2 ? sliderIndex + 1 : 0);
        }
    }

    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftIcon />
            </Arrow>
            <Wrapper slideIndex={sliderIndex}>
                {sliderItems.map(item => (
                    <Slide key={item.id} bg={item.bg}>
                        <ImgContainer>
                            <Image src={item.img} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Description>{item.desc}</Description>
                            <Button>SHOW NOW</Button>
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRight />
            </Arrow>
        </Container>
    )
}

export default Slider