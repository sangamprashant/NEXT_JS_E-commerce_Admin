"use client";
import { ProductForm, SideNav } from "@components";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [product, setProduct] = useState(null)
  const id = params.productId;
  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const fetchProduct = (id) => {
    if (!id) {
      return;
    } else {
      axios.get(`/api/products/${id}`).then((response) => {
        setProduct(response.data);
      });
    }
  };

  return (
    <SideNav>
    <h1>Edit Product</h1>
     {product &&  <ProductForm {...product}/>}
    </SideNav>
  );
}
