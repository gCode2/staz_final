import React, {useState} from 'react'
import {useSearchParams} from 'react-router-dom';

const Search = () => {
    const [searchValue, setSearchValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const handleChange = (e) => {

     const regex = /^[0-9\b]+$/;

    if (e.target.value === ''){
        setSearchValue(e.target.value);
        searchParams.delete("id");
        setSearchParams(searchParams);
    }
    if(regex.test(e.target.value)) {
       setSearchValue(e.target.value);
       searchParams.set("id", e.target.value);
       setSearchParams(searchParams);
    }
  }

    
  return (
    <input type="text" className='searchValue' onInput={handleChange} value={searchValue}/>
  )
}

export default Search
