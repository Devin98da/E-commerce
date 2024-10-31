import React from 'react'
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/userRedux';
import SearchInput from './SearchInput';

const Container = styled.div`
    height:60px;
    margin-bottom:10px;
    ${mobile({ height: "60px" })}
`
const Wrapper = styled.div`
    padding:10px 20px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    ${mobile({ padding: "10px 0px" })}
`
const Left = styled.div`
    flex:1;
    display:flex;
    align-items:center;
`
const Language = styled.span`
    font-size:16px;
    cursor:pointer;
     ${mobile({ display: "none" })}
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
     ${mobile({ width: "50px" })}
`
const Logo = styled.h1`
    font-weight:bold;
     ${mobile({ fontSize: "24px" })};
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
      ${mobile({ flex: 2, justifyContent: "center" })}
`
const MenuItem = styled.div`
    font-size:14px;
    cursor:pointer;
    margin-left:25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })};
    
`

const NavBar = () => {

    const quantity = useSelector(state => state.cart.quantity);
    const currentUser = useSelector(state => state.user.currentUser);
    const userToken = currentUser?.token;
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("persist:root");
        navigate('/login');

    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchInput/>
                </Left>
                <Center>
                    <Logo>Keema</Logo>
                </Center>
                <Right>
                    {
                        userToken ?
                            (
                                <>
                                    <Link to='/cart'>
                                        <MenuItem>
                                            <Badge color="secondary" badgeContent={quantity}>
                                                <ShoppingCartIcon />
                                            </Badge>
                                        </MenuItem>
                                    </Link>
                                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                                </>
                            ) :
                            (
                                <>
                                    <Link to='/register'>
                                        <MenuItem>Register</MenuItem>
                                    </Link>
                                    <Link to='/login'>
                                        <MenuItem>Sign In</MenuItem>
                                    </Link>

                                </>
                            )
                    }


                </Right>
            </Wrapper>
        </Container>
    )
}

export default NavBar