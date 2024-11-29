import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../redux/whishlistRedux';
import { red } from '@material-ui/core/colors';

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
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


const ProductItem = ({ product }) => {

  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.products);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const productInWishlist = wishlist.some(p => p._id === product._id);
    setIsFavorite(productInWishlist);

  }, [wishlist, product._id])

  const onClickHeart = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      dispatch(addToWishlist(product));

    } else {
      dispatch(removeFromWishlist(product));
    }
  }

  return (
    <Container>
      {product.promotion > 0 &&
        <PromoBadge>{product.promotion}%OFF</PromoBadge>}
      <Circle />
      <Image src={product.image} />
      <Info>
        <Icon>
          <ShoppingCartIcon />
        </Icon>
        <Link to={`/products/product/${product._id}`}>
          <Icon>
            <SearchIcon />
          </Icon>
        </Link>
        <Icon onClick={onClickHeart}>
          {
            isFavorite ?
              <FavoriteBorderIcon style={{ color: 'red' }} />
              :
              <FavoriteBorderIcon />

          }
        </Icon>
      </Info>
    </Container>
  )
}

export default ProductItem