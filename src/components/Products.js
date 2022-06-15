import React, {useState, useEffect} from 'react'
import {useLocation, useSearchParams } from "react-router-dom";

const Products = () => {
    var [products, setProducts] = useState({});
    const [perPage, setPerPage] = useState();
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(()=>{
        setIsLoading(true);
        searchParams.set("page", searchParams.get("page"));
        fetch("https://reqres.in/api/products?"+searchParams, searchParams).then((response)=>response.json()).then((json)=>{
            setIsLoading(false);
            setProducts(json.data);
            setPerPage(json.per_page);
        });
    },[location])


  if(!products) return (<tr><td colSpan="3" style={{color:"#fff"}}>No results!</td></tr>);
  if(products.length === 0) return (<tr><td colSpan="3" style={{color:"#fff"}}>No results!</td></tr>);
 
  if(!Array.isArray(products)){
    products = [products];
  }
    return(
        isLoading ? <tr className="loadingMsg"><td colSpan="3">Loading...</td></tr> :
        products.map((product, i)=>{
                return(
                    <tr key={i} style={{background: product.color}}>
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
