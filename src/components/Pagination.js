import React, {useState,useEffect} from 'react'
import {useLocation, useSearchParams} from 'react-router-dom';
const Pagination = ({nextDisabled}) => {
   const [searchParams, setSearchParams] = useSearchParams([]);
   const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
   const [isPrevDisabled, setIsPrevDisabled] = useState(true);
   const [isNextDisabled, setIsNextDisabled] = useState(false);
   const location = useLocation();

  useEffect(()=>{
    if(searchParams.get("id")){
      setIsNextDisabled(true);
    }else{
      nextDisabled ? setIsNextDisabled(true) : setIsNextDisabled(false);
    }
  })

  useEffect(()=>{
    searchParams.get("page") ? setCurrentPage(parseInt(searchParams.get("page"))) : setCurrentPage(1);
    searchParams.get("id") ? setIsNextDisabled(true) : setIsNextDisabled(false);
  },[location])
  
  useEffect(()=>{

    currentPage===1 ? setIsPrevDisabled(true) : setIsPrevDisabled(false);
    if(!searchParams.get("id")){
      searchParams.set("page",currentPage);
      setSearchParams(searchParams);
    }
  },[currentPage]);


  return (
    <div className="btnHolder">
        <button 
            className="btn btn-dark" 
            onClick={()=>{
                setCurrentPage(parseInt(currentPage-1));
            }}
            disabled={isPrevDisabled}>{'<'} Previous</button>
        <button 
            className="btn btn-dark" 
            onClick={()=>{
                setCurrentPage(parseInt(currentPage+1));
            }}
            disabled={isNextDisabled}>Next {'>'}</button>
    </div>
  )
}

export default Pagination

