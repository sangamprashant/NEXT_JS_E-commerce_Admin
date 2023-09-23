"use client"
import { SideNav } from "@components";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
    const [productDetails, setProductDetails] = useState([]);
    const router = useRouter();

    const handelInput =(e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const handelSave = async (e) =>{
        e.preventDefault();
        await axios.post("/api/products",productDetails)
        router.push("/products")
    }

  return (
    <SideNav>
        <form onSubmit={handelSave}>
            <h1>New Products</h1>
            <label>Product Name</label>
            <input type="text" placeholder="product name" name="title" value={productDetails.title} onChange={handelInput} />
            <label>Product Description</label>
            <textarea placeholder="description" name="description" value={productDetails.description} onChange={handelInput}></textarea>
            <label>Product Price (in Rupees)</label>
            <input type="number" placeholder="product price" name="price" value={productDetails.price} onChange={handelInput}/>
            <button className="btn-primary" type="submit">Save</button>
        </form>
      
    </SideNav>
  );
};

export default page;
