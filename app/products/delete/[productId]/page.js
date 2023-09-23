"use client";
import { SideNav } from "@components";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function page({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState();
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

  function goBack() {
    router.push("/products");
  }
  function deleteProduct() {
    axios.delete(`/api/products/${id}`)
    goBack()
  }
  return (
    <SideNav>
      <h1 className="text-center">Do you want to delete "{product?.title}"</h1>
      <div className="flex justify-center gap-2 w-full">
        <button className="btn-red" onClick={deleteProduct}>Yes</button>
        <button className="btn-default" onClick={goBack}>No</button>
      </div>
    </SideNav>
  );
}

export default page;
