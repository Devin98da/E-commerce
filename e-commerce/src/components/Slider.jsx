import React from 'react'
import styled from 'styled-components';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';

const Container = styled.div`
    width:100%;
    height:100vh;
    background-color:coral;
    position:relative;
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
`

const Wrapper = styled.div`
    height:100%;
`

const Slide = styled.div`
    display:flex;
    align-items:center;
`
const ImageContainer = styled.div`
    flex:1;
`
const InfoContainer = styled.div`
    flex:1;
`

const Image = styled.img`

`

const Slider = () => {
    return (
        <Container>
            <Arrow direction="left">
                <ArrowLeftIcon />
            </Arrow>
            <Wrapper>
                <ImageContainer>
                    <Image/>
                </ImageContainer>
                <InfoContainer></InfoContainer>
            </Wrapper>
            <Arrow direction="right">
                <ArrowRight />
            </Arrow>
        </Container>
    )
}

export default Slider