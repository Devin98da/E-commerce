import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { popularProducts } from '../data';
import ProductItem from './ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productsRedux';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
`

const Products = ({ cat, filters, sort }) => {
    // const [products, setProducts] = useState([]);
    const [filterProdcuts, setFilterProdcuts] = useState([]);
    const dispatch = useDispatch();
    const { products, isFetching, error } = useSelector((state) => state.products);

    console.log(products)

    useEffect(() => {

        dispatch(fetchProducts());
        // const getProducts = async () => {
        //     try {
        //         const res = await axios.get(
        //             cat ?
        //                 `http://localhost:5000/api/products/?category=${cat}`
        //                 :
        //                 'http://localhost:5000/api/products');
        //         setProducts(res.data);
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }

        // getProducts();
    }, [dispatch])

    useEffect(() => {

        cat && setFilterProdcuts(
            products.filter(item =>
                Object.entries(filters).every(([key, value]) => {
                    return item[key].includes(value);
                })
            )
        )

    }, [cat, filters, products])


    useEffect(() => {
        if (sort === "Newest") {
            setFilterProdcuts((prev) =>
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
        } else if (sort === "Asc") {
            setFilterProdcuts((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else {
            setFilterProdcuts((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort]);

    return (
        <Container>
            {cat ?
                filterProdcuts.map(product => (
                    <ProductItem key={product._id} product={product} />
                ))
                :
                products.slice(0,8).map(product => (
                    <ProductItem key={product._id} product={product} />
                ))}
        </Container>
    )
}

export default Products