import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    position: relative;
`;

const Input = styled.input`
    border: none;
`;

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
`;

const Suggestion = styled.div`
    padding: 10px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const SearchInput = () => {
    const [searchText, setSearchText] = useState("");
    const [suggesions, setSuggesions] = useState([]);
    const { products } = useSelector((state) => state.products);
    const searchRef = useRef();
    const navigate = useNavigate();


    useEffect(() => {
        const handler = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSuggesions([]);
            }
        }

        document.addEventListener("mousedown", handler);
        return (() => {
            document.removeEventListener("mousedown", handler);
        })
    })

    const categories = useMemo(() => {
        const uniqueCategories = new Set();
        products.forEach(product => {
            product.categories?.forEach(cat => uniqueCategories.add(cat));
        });
        return [...uniqueCategories];
    }, [products]);


    const onChangeSearchInput = (e) => {
        const value = e.target.value;
        setSearchText(value);

        const filtered = categories.filter(cat =>
            cat.toLowerCase().includes(value.toLowerCase())
        );

        setSuggesions(filtered);
    };

    const onSuggesionClick = (suggestion) => {
        setSearchText(suggestion);
        setSuggesions([]);
        // Optionally navigate to search page here with the suggestion
        navigate(`/products/search?product=${encodeURIComponent(suggestion)}`);
    };

    const handleSearch = () => {
        if (searchText) {
            navigate(`/products/search?product=${encodeURIComponent(searchText)}`);

        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchText) {
            navigate(`/products/search?product=${encodeURIComponent(searchText)}`);
            setSuggesions([]);
        }
    }

    return (
        <SearchContainer ref={searchRef} onKeyDown={handleKeyDown}>
            <Input
                placeholder="Search"
                value={searchText}
                onChange={onChangeSearchInput}
            />
            <SearchIcon style={{ color: 'gray', fontSize: 24, cursor: 'pointer' }} onClick={handleSearch} />
            {suggesions.length > 0 && (
                <SuggestionsContainer>
                    {suggesions.map((suggestion, index) => (
                        <Suggestion key={index} onClick={() => onSuggesionClick(suggestion)}>
                            {suggestion}
                        </Suggestion>
                    ))}
                </SuggestionsContainer>
            )}
        </SearchContainer>
    );
};

export default SearchInput;
