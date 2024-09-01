import React from 'react'
import styled from 'styled-components';
import { popularProducts } from '../data';
import ProductItem from './ProductItem';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
`

const Products = () => {
    return (
        <Container>
            {popularProducts.map(product => (
                <ProductItem key={product.id} product={product} />
            ))}
        </Container>
    )
}

export default Products