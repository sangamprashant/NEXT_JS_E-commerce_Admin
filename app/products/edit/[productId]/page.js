"use client"
import { SideNav } from "@components";
import axios from "axios";
import { useEffect } from "react";

export default function Page({ params }) {
  const id= params.productId;

useEffect(()=>{
  console.log(id)
  fetchProduct();
},[id])

const fetchProduct = () => {
  if(!id){
    return;
  }
  axios.get('/api/products?id='+id).then(response=>{
    console.log(response.data)
  })

}
 
  
  return <SideNav>My Post: {params.productId}</SideNav>;
}
