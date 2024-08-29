import React from 'react'
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const Container = styled.div`
    height:60px;
    `
const Wrapper = styled.div`
    padding:10px 20px;
    display:flex;
    justify-content:space-between;
    align-items:center;
`
const Left = styled.div`
    flex:1;
    display:flex;
    align-items:center;
`
const Language = styled.span`
    font-size:16px;
    cursor:pointer;
`
const SearchContainer = styled.div`
    border:0.5px solid lightgray;
    display:flex;
    align-items:center;
    margin-left:25px;
    padding:5px;
`

const Input = styled.input`
    border:none;
`
const Logo = styled.h1`
    font-weight:bold;
`

const Center = styled.div`
    flex:1;
    text-align:center;
`
const Right = styled.div`
    flex:1;
    display:flex;
    align-item:center;
    justify-content:flex-end;
`
const MenuItem = styled.div`
    font-size:14px;
    cursor:pointer;
    margin-left:25px;
`

const NavBar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input />
                        <SearchIcon style={{color:'gray',fontSize:16}}/>
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo>Keema</Logo>
                </Center>
                <Right>
                    <MenuItem>Register</MenuItem>
                    <MenuItem>Sign In</MenuItem>
                    <MenuItem>
                        <Badge color="secondary" badgeContent={5}>
                            <ShoppingCartIcon />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default NavBar