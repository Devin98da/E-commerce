import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ProductItem from '../components/ProductItem';

const Container = styled.div`
  padding: 20px;
  
`;

const ProductsContainer = styled.div`
  display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
`

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);

  return (
    <Container>
      <NavBar />
      <h1>Your Wishlist</h1>
      <ProductsContainer>
        {wishlist.products.length > 0 ? (
          wishlist.products.map((product) => (
            <ProductItem product={product} key={product._id}>
            </ProductItem>
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </ProductsContainer>

      <Footer />
    </Container>
  );
};

export default Wishlist;
