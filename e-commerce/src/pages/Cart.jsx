import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { mobile } from '../responsive'
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../requestMethod';
import { Link, useNavigate } from 'react-router-dom'
import { decreaseQuantity, increaseQuantity, removeProduct } from '../redux/cartRedux'

const KEY = "pk_test_51KqiRCKhjZiDhPCgP0Y8TdrpD77ox7mScf8KY1NNPJTQfL0jVAYU69Ntqj5RnfgCn7EZPxe9QOBHEsFx50mdWSYW008JFT1Ssi";

const Container = styled.div`
`
const Wrapper = styled.div`
    padding:20px;
    ${mobile({ padding: "10px" })}
`
const Title = styled.h1`
    font-weight:300;
    text-align:center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopTexts = styled.div`
    ${mobile({ display: "none" })}
`

const TopText = styled.span`
    text-decoration:underline;
    cursor:pointer;
    margin:0 10px;
`

const TopButton = styled.button`
    padding:10px;
    font-weight:600;
    cursor:pointer;
    border:${props => props.type === 'filled' && 'none'};
    background-color:${props => props.type === 'filled' ? 'black' : 'transparent'};
    color:${props => props.type === 'filled' && 'white'}
`
const Bottom = styled.div`
    display:flex;
    justify-content:space-between;
    ${mobile({ flexDirection: "column" })}
`
const Info = styled.div`
    flex:3;
`

const Product = styled.div`
    display:flex;
    justify-content:space-between;
    ${mobile({ flexDirection: "column" })}

`
const ProductDetail = styled.div`
    flex:2;
    display:flex;
`
const Image = styled.img`
    width:200px;
`
const Details = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    padding:20px;
`
const ProductName = styled.span`
`
const ProductId = styled.span`
`
const ProductColor = styled.div`
    width:20px;
    height:20px;
    border-radius:50%;
    background-color:${props => props.color}
`
const ProductSize = styled.span`
`

const PriceDetail = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
`
const ProductAmountContainer = styled.div`
    display:flex;
    align-items:center;
    margin-bottom:20px;

`

const ProductAmount = styled.div`
    font-size:24px;
    margin:5px;
  ${mobile({ margin: "5px 15px" })}
  
`
const ProductPrice = styled.div`
    font-size:30px;
    font-weight:200;
      ${mobile({ marginBottom: "20px" })}
`
const Hr = styled.hr`
    background-color:#eee;
    border:none;
    height:1px;
`

const Summary = styled.div`
    flex:1;
    border:0.5px solid lightgray;
    border-radius:10px;
    padding:20px;
    height:50vh;
`
const SummaryTitle = styled.h1`
    font-weight:200;
`
const SummaryItem = styled.div`
    margin:30px 0;
    display:flex;
    justify-content:space-between;
    font-weight: ${(props) => props.type === "total" && "500"};
    font-size: ${(props) => props.type === "total" && "24px"};
`
const SummaryItemText = styled.span`
`
const SummaryItemPrice = styled.span`
`
const SummaryButton = styled.button`
    width:100%;
    padding:10px;
    background-color:black;
    color:white;
    font-weight:600;
`
const RemoveButton = styled.button`
    background-color: #ff6b6b;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: all 0.3s ease;
    margin-top:10px;

    &:hover {
        background-color: #ff4c4c;
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }
`;


const Cart = () => {
    const cart = useSelector(state => state.cart);
    const wishlist = useSelector(state => state.wishlist);
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onToken = (token) => {
        setStripeToken(token);
    }


    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post('/checkout/payment', {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100
                });
                console.log(res)
                navigate('/success', { state: { stripeData: res.data, cart: cart } });

            } catch (error) {
                console.log(error)
            }

        }
        stripeToken && cart.total >= 0 && makeRequest();

    }, [stripeToken, cart.total, navigate])

    const handleQuantityChange = (type, productId) => {
        if (type === 'add') {
            dispatch(increaseQuantity(productId));
        } else if (type === 'dec') {
            dispatch(decreaseQuantity(productId));
        }
    }

    const handleRemoveProduct = (productId) => {
        dispatch(removeProduct(productId));
    }

    return (
        <Container>
            <NavBar />
            <Announcement />
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <Link to={'/products'}>
                        <TopButton>CONTINUE SHOPING</TopButton>
                    </Link>
                    <TopTexts>
                        <TopText>Shoping Bag ({cart.products.length})</TopText>
                        <Link style={{color: 'inherit'}} to="/wishlist">
                            <TopText>Your Wishlist ({wishlist.products.length})</TopText>
                        </Link>

                    </TopTexts>
                    <TopButton type='filled' disabled={cart.total === 0}>CHECKOUT NOW</TopButton>

                </Top>
                <Bottom>
                    <Info>
                        {cart.products && cart.products.length > 0 ?
                            cart.products.map(product => (
                                <Product key={product._id}>
                                    <ProductDetail>
                                        <Image src={product.image} />
                                        <Details>
                                            <ProductName>
                                                <b>Product:</b> {product.title}
                                            </ProductName>
                                            <ProductId>
                                                <b>ID:</b> {product._id}
                                            </ProductId>
                                            <ProductColor color={product.color} />
                                            <ProductSize>
                                                <b>Size:</b> {product.size}
                                            </ProductSize>
                                        </Details>
                                    </ProductDetail>

                                    <PriceDetail>
                                        <ProductAmountContainer>
                                            <RemoveIcon onClick={() => handleQuantityChange('dec', product._id)} />
                                            <ProductAmount>{product.quantity}</ProductAmount>
                                            <AddIcon onClick={() => handleQuantityChange('add', product._id)} />
                                        </ProductAmountContainer>
                                        <ProductPrice>${product.promotion > 0 ?
                                            product.discountPrice * product.quantity
                                            : product.price * product.quantity}
                                        </ProductPrice>
                                        <RemoveButton onClick={() => handleRemoveProduct(product._id)}>Remove</RemoveButton>
                                    </PriceDetail>
                                </Product>
                            )) : (
                                <p>Your cart is empty</p>
                            )}


                        <Hr />

                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name="Keema Shop"
                            image="https://avatars.githubusercontent.com/u/1486366?v=4"
                            billingAddress
                            shippingAddress
                            description={`Your total is $${cart.total}`}
                            amount={cart.total * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <SummaryButton>CHECKOUT NOW</SummaryButton>

                        </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart