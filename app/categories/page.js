"use client";
import { SideNav } from "@components";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [catEdit, setCatEdit] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  };

  const handelSave = async (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      console.error("Name is empty. Please enter a name.");
      return;
    }
    try {
      if (catEdit) {
        await axios.put("/api/categories", {
          name,
          parentCategory,
          id: catEdit._id,
        });
      } else {
        await axios.post("/api/categories", { name, parentCategory });
      }
      setName("");
      setParentCategory("");
      setCatEdit(null);
      fetchData();
    } catch (error) {
      console.error("Error while sending the POST request:", error);
    }
  };

  function handelEdit(category) {
    setCatEdit(category);
    setName(category.name);
    setParentCategory(category?.parent?._id || "");
  }

  function deleteCategory(category) {
    const alertSound = new Audio("/alert.mp3");
    alertSound.play();
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete '${category.name}'`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`/api/categories/${category._id}`);
          fetchData();
        }
      });
  }

  return (
    <SideNav>
      <h1>Categories</h1>
      <label>
        {catEdit ? `Edit Category '${catEdit.name}'` : "Create New Category "}
      </label>
      <form onSubmit={handelSave} className="flex gap-1  mb-4">
        <input
          type="text"
          className="mb-0"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="mb-0"
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
        >
          <option value="">No parant category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
      <table className="table-basic">
        <thead>
          <tr>
            <td>Category name</td>
            <td>Parent catagory</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                  <button
                    onClick={() => handelEdit(category)}
                    className="btn-primary mr-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(category)}
                    className="btn-primary"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </SideNav>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
