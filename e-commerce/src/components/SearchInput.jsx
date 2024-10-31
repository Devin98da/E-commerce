import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector } from 'react-redux';

const SearchContainer = styled.div`
    border:0.5px solid lightgray;
    display:flex;
    align-items:center;
    margin-left:25px;
    padding:5px;
    position:relative
`
const Input = styled.input`
    border:none;
`

const SuggestionsContainer = styled.div`
    position: absolute;
    top: 35px;
    left: 0;
    background-color: white;
    width: 100%;
    border: 0.5px solid lightgray;
    max-height: 150px;
    overflow-y: auto;
    z-index: 1;
`

const Suggestion = styled.div`
    padding: 10px;
    height:10px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`

const SearchInput = () => {

    const [searchText, setSearchText] = useState("");
    const [suggesions, setSuggesions] = useState([]);
    const { products, isFetching, error } = useSelector((state) => state.products);

    const suggestions = ["game development", "game design", "gaming", "game engines", "game art"];


    const categories = useMemo(() => {
        const uniqueCategories = new Set();
        products.forEach(product => {
            product.categories?.forEach(cat => uniqueCategories.add(cat));
        });
        return [...uniqueCategories];
    }, [products]);
    

    console.log(categories)

    const debouncedFilter = useCallback(() => {

    })


    const onChangeSearchInput = (e) => {
        const value = e.target.value;
        setSearchText(value);

        const filterd = categories.filter(cat=>
            cat.toLowerCase().includes(value.toLowerCase())
        );

        setSuggesions(filterd);
    }

    const onSuggesionClick = (suggesion) => {
        setSearchText(suggesion);
        setSuggesions([]);
        // navigate to search text
    }

    return (
        <SearchContainer>
            <Input placeholder='Search' onChange={onChangeSearchInput} />
            <SearchIcon style={{ color: 'gray', fontSize: 16 }} />
            {
                categories.length > 0 && (
                    <SuggestionsContainer>
                        {
                            categories.map((suggesion, index) => {
                                <Suggestion key={index} onClick={() => onSuggesionClick(suggesion)}>
                                    {suggesion}
                                </Suggestion>
                            })
                        }
                    </SuggestionsContainer>
                )
            }
        </SearchContainer>
    )
}

export default SearchInput