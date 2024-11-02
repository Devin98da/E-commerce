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

const NoProductsMessage = styled.p`
  font-size: 1.8rem;
  color: #888;
  text-align: center;
  width: 100%;
  margin: 40px 0;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-weight: 500;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;


const Products = ({ cat, filters, sort, search }) => {
    // const [products, setProducts] = useState([]);
    const [filterProdcuts, setFilterProdcuts] = useState([]);
    const dispatch = useDispatch();
    const { products, isFetching, error } = useSelector((state) => state.products);

    console.log(filters)
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

        let tempProducts = products;

        if (cat && cat !== 'search') {
            tempProducts = tempProducts.filter(item =>
                item.categories.some(catItem => (
                    catItem.toLowerCase() === cat.toLowerCase()
                ))
            )

        }

        if(filters){
            tempProducts = tempProducts.filter(item =>
                Object.entries(filters).every(([key, value]) => {

                    if(key === 'color' && value === 'Color') return true;

                    if(key === 'size' && value === 'Size') return true;

                    return item[key].includes(value);
                })
            )
        }
        // cat && setFilterProdcuts(
        //     products.filter(item =>
        //         Object.entries(filters).every(([key, value]) => {
        //             return item[key].includes(value);
        //         })
        //     )
        // )


        if (search) {
            const lowerSearch = search.toLowerCase();
            tempProducts = tempProducts.filter(item =>
                item.title.toLowerCase().includes(lowerSearch) ||
                item.categories.some(categoryItem =>
                    categoryItem.toLowerCase().includes(lowerSearch)
                )
            );
        }
        console.log(tempProducts)

        setFilterProdcuts(tempProducts);

    }, [cat, filters, products, search])


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
            {cat && cat !== 'search' ?
                (
                    filterProdcuts.map(product => (
                        <ProductItem key={product._id} product={product} />
                    ))

                )
                : (
                    filterProdcuts.length > 0 ?

                        filterProdcuts.slice(0, 8).map(product => (
                            <ProductItem key={product._id} product={product} />
                        )) :
                        (
                            <NoProductsMessage>No products found for this search.</NoProductsMessage>
                        )
                )
            }
        </Container>
    )
}

export default Products