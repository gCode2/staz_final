import React, {useState, useEffect} from 'react'
import {useLocation, useSearchParams } from "react-router-dom";

const Products = ({setNextDisabledCallback}) => {
    let [products, setProducts] = useState({});
    const [perPage, setPerPage] = useState();
    const [total, setTotal] = useState();
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    const disableNextButton = (isNextDisabled) => {
        setNextDisabledCallback(isNextDisabled);
    }
    useEffect(()=>{
        parseInt(searchParams.get("page")) >= total/perPage ? disableNextButton(true) : disableNextButton(false);
    },[])

    useEffect(()=>{
        setIsLoading(true);
        fetch("https://reqres.in/api/products?"+searchParams, searchParams).then((response)=>response.json()).then((json)=>{
            setIsLoading(false);
            setProducts(json.data);
            setPerPage(json.per_page);
            setTotal(json.total);
            
        });
        parseInt(searchParams.get("page")) >= total/perPage ? disableNextButton(true) : disableNextButton(false);
    },[location])


  if(!products || products.length === 0) return (<tr><td colSpan="3" style={{color:"#fff"}}>No results!</td></tr>);
 
  if(!Array.isArray(products)){
    products = [products];
  }
    return(
        isLoading ? <tr className="loadingMsg"><td colSpan="3">Loading...</td></tr> :
        products.map((product)=>{
                return(
                    <tr key={product.id} style={{background: product.color}}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.year}</td>
                    </tr>
                );
            }
            )
    );
}

export default Products
