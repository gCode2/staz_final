import React, {useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom';

const Search = () => {
    const [searchValue, setSearchValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(()=>{
      searchParams.get("id") ? setSearchValue(searchParams.get("id")) : setSearchParams("");
    },[])

    const handleChange = (e) => {

     const regex = /^[0-9\b]+$/;

    if (e.target.value === ''){
        setSearchValue(e.target.value);
        searchParams.delete("id");
        searchParams.set("page", 1);
        setSearchParams(searchParams);
    }
    if(regex.test(e.target.value)) {
       setSearchValue(e.target.value);
       searchParams.set("id", e.target.value);
       searchParams.delete("page");
       setSearchParams(searchParams);
    }
  }

    
  return (
    <input type="text" className='searchValue' onInput={handleChange} value={searchValue}/>
  )
}

export default Search
