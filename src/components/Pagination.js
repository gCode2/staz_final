import React, {useState,useEffect} from 'react'
import {useSearchParams} from 'react-router-dom';
const Pagination = () => {
   const [searchParams, setSearchParams] = useSearchParams([]);
   const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
   const [isPrevDisabled, setIsPrevDisabled] = useState(true);
   const [isNextDisabled, setIsNextDisabled] = useState(false);


  useEffect(()=>{
    if(searchParams.get("page")){
    setCurrentPage(parseInt(searchParams.get("page")));
    }
  },[])
  
  useEffect(()=>{

    currentPage===1 ? setIsPrevDisabled(true) : setIsPrevDisabled(false)
    searchParams.set("page",currentPage);
    setSearchParams(searchParams);

  },[currentPage]);



  return (
    <div className="btnHolder">
        <button 
            className="btn btn-dark" 
            onClick={()=>{
                setCurrentPage(parseInt(currentPage-1));
                searchParams.set("page",currentPage);
            }}
            disabled={isPrevDisabled}>{'<'} Previous</button>
        <button 
            className="btn btn-dark" 
            onClick={()=>{
                setCurrentPage(parseInt(currentPage+1));
                searchParams.set("page",currentPage);
            }}
            disabled={isNextDisabled}>Next {'>'}</button>
    </div>
  )
}

export default Pagination

