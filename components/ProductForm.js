"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductForm = ({_id,title,description,price}) => {
    const [productDetails, setProductDetails] = useState([]);
    const router = useRouter();

    useEffect(()=>{
        if(_id){
            setProductDetails({
                title:title,
                description:description,
                price:price
            })
        }
    },[_id])

    const handelInput =(e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const handelSave = async (e) =>{
        e.preventDefault();
        if(_id){
            //update the selected product
            await axios.put("/api/products",{...productDetails,_id})
        }else{
            //save new product
            await axios.post("/api/products",productDetails)
        }
        router.push("/products")
    }

  return (
    <form onSubmit={handelSave}> 
        <label>Product Name</label>
        <input type="text" placeholder="product name" name="title" value={productDetails.title} onChange={handelInput} />
        <label>Product Description</label>
        <textarea placeholder="description" name="description" value={productDetails.description} onChange={handelInput}></textarea>
        <label>Product Price (in Rupees)</label>
        <input type="number" placeholder="product price" name="price" value={productDetails.price} onChange={handelInput}/>
        <button className="btn-primary" type="submit">Save</button>
    </form>
  );
};

export default ProductForm;
