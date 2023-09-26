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
  const [properties, setProperties] = useState([]);

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
      const data = {
        name,
        parentCategory,
        properties: properties.map((p) => ({
          name: p.name,
          values: p.values.split(","),
        })),
      };
      if (catEdit) {
        data.id = catEdit._id;
        await axios.put("/api/categories", data);
      } else {
        await axios.post("/api/categories", data);
      }
      setName("");
      setParentCategory("");
      setProperties([]);
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
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
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

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handelPropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }
  function handelPropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }
  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  return (
    <SideNav>
      <h1>Categories</h1>
      <label>
        {catEdit ? `Edit Category '${catEdit.name}'` : "Create New Category "}
      </label>
      <form onSubmit={handelSave}>
        <div className="flex gap-1">
          <input
            type="text"
            className=""
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className=""
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
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            type="button"
            className="btn-default text-sm mb-2"
            onClick={addProperty}
          >
            Add New Property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div className="flex gap-1 mb-2">
                <input
                  className="mb-0"
                  type="text"
                  placeholder="property name (example:color)"
                  value={property.name}
                  onChange={(e) =>
                    handelPropertyNameChange(index, property, e.target.value)
                  }
                />
                <input
                  className="mb-0"
                  type="text"
                  placeholder="values,comma,saparated"
                  value={property.values}
                  onChange={(e) =>
                    handelPropertyValuesChange(index, property, e.target.value)
                  }
                />
                <button
                  type="button"
                  className="btn-default"
                  onClick={() => removeProperty(index)}
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-2">
          {catEdit && (
            <button
              type="button"
              className="btn-default py-2"
              onClick={() => {
                setCatEdit(null);
                setName("");
                setParentCategory("");
                setProperties([]);
              }}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn-primary py-2">
            Save
          </button>
        </div>
      </form>
      {!catEdit && (
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
      )}
    </SideNav>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
