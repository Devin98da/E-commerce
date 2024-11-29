import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import Announcement from '../components/Announcement'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { mobile } from '../responsive'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { publicRequest } from '../requestMethod'
import { useDispatch } from 'react-redux'
import { addProduct } from '../redux/cartRedux'

const Contaienr = styled.div`
`
const Wrapper = styled.div`
    padding:50px;
    display:flex;
    ${mobile({ flexDirection: "column", padding: "10px" })}
`
const ImageContainer = styled.div`
    flex:1;
    position:relative;
`
const Image = styled.img`
    width:100%;
    height:90vh;
    object-fit:cover;
    ${mobile({ height: "40vh" })}

`
const InfoContainer = styled.div`
    flex:1;
    padding:0px 50px;
      ${mobile({ padding: "10px" })}
`
const Title = styled.h1`
    font-weigth:200;
`
const Desc = styled.p`
    maargin:20px 0;
`
const Price = styled.span`
    font-weight:100;
    font-size:35px;
`
const FilterContainer = styled.div`
    display:flex;
    justify-content:space-between;
    width:50%;
    margin:30px 0;
    ${mobile({ width: "100%" })}
`
const Filter = styled.div`
    display:flex;
    align-items:center;
`
const FilterTitle = styled.span`
    font-size:20px;
    font-weight:200;
`
const FilterColor = styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    background-color:${props => props.color};
    margin:0 5px;
    cursor:pointer;
    border:2px solid black;
`
const FilterSize = styled.select`
    margin-left:10px;
    padding:5px;
`
const FilterSizeOption = styled.option`
`
const AddContainer = styled.div`
    display:flex;
    align-items:center;
    width:50%;
    justify-content:space-between;
    ${mobile({ width: "100%" })}
`
const AmountContainer = styled.div`
    display:flex;
    align-items:center;
    font-weight:700;
`
const Amount = styled.span`
    width:30px;
    height:30px;
    border-radius:10px;
    border: 1px solid teal;
    display:flex;
    align-items:center;
    justify-content:center;
    margin:0 5px;
`
const Button = styled.button`
    padding:15px;
    border:2px solid teal;
    background-color:white;
    cursor:pointer;
    font-weight:500;

    &:hover{
        background-color: #f8f4f4;
    }
`
const PriceCotainer = styled.div`
    display:flex;
    flex-direction:column;
`
const DiscountPrice = styled.span`
    font-weight:500;
    font-size:40px;
    color: teal;
`;

const PromoBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff5252;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  z-index: 4;
`
const Product = () => {

    const location = useLocation();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState(null);
    const [size, setSize] = useState(null);
    const dispatch = useDispatch();

    const id = location.pathname.split("/")[3];

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/find/" + id);
                setProduct(res.data);
            } catch { }
        };
        getProduct();
    }, [id]);

    const handleQuntityChange = (type) => {
        if (type === 'dec') {
            quantity > 1 && setQuantity(quantity - 1);
        } else if (type === 'add') {
            setQuantity(quantity + 1);
        }
    }

    const handleAddToCart = () => {
        dispatch(
            addProduct({ ...product, quantity, color, size })
        )
    }

    console.log(product)

    return (
        <Contaienr>
            <NavBar />
            <Announcement />
            <Wrapper>
                <ImageContainer>
                    {product.promotion > 0 &&
                        <PromoBadge>{product.promotion}%OFF</PromoBadge>}
                    <Image src={product.image} />
                </ImageContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>
                        {product.description}
                    </Desc>
                    {product.promotion > 0 ? (
                        <PriceCotainer>
                            <Price style={{ textDecoration: "line-through", color: "grey" }}>
                                ${product.price}
                            </Price>
                            <DiscountPrice>${product?.discountPrice}</DiscountPrice>
                            <span style={{ color: "red", marginLeft: "10px" }}>
                                ({product.promotion}% OFF)
                            </span>
                        </PriceCotainer>
                    ) : (
                        <Price>${product.price}</Price>
                    )}

                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map((c) => (
                                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                            ))}

                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize>
                                {product.size?.map(s => {
                                    <FilterSizeOption key={s} onClick={(e) => setSize(e.target.value)}>{s}</FilterSizeOption>

                                })}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <RemoveIcon onClick={() => handleQuntityChange('dec')} />
                            <Amount>{quantity}</Amount>
                            <AddIcon onClick={() => handleQuntityChange('add')} />
                        </AmountContainer>
                        <Button onClick={handleAddToCart}>Add To Cart</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <NewsLetter />
            <Footer />
        </Contaienr>
    )
}

export default Product