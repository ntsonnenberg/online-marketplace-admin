"use client";

import { createProduct, updateProduct } from "@/actions/products";
import Link from "next/link";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";
import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";

interface Props {
  product?: Product;
  categoryOptions: Category[];
}

export default function ProductForm({ product, categoryOptions }: Props) {
  const [state, action] = useFormState(
    product?._id ? updateProduct : createProduct,
    undefined
  );
  const [category, setCategory] = useState(product?.category || "");

  const propertyOptions = [];
  if (categoryOptions.length > 0 && category) {
    let selectedCat = categoryOptions.find(({ _id }) => _id === category);
    console.log(selectedCat);

    if (selectedCat) {
      propertyOptions.push(...selectedCat.properties);
    }

    while (selectedCat?.parent?._id) {
      const parentCat = categoryOptions.find(
        ({ _id }) => _id === selectedCat?.parent?._id
      );

      if (parentCat) {
        propertyOptions.push(...parentCat.properties);
      }
      selectedCat = parentCat;
    }
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      {product?._id && (
        <input id="_id" name="_id" defaultValue={product._id} hidden />
      )}
      <div className="flex flex-col">
        <label htmlFor="title">Product Title</label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={product?.title}
          placeholder="Enter product title..."
        />
        {state?.errors?.title && (
          <p className="text-red-700">{state.errors.title}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          defaultValue={product?.price}
          placeholder="Enter product price..."
        />
        {state?.errors?.price && (
          <p className="text-red-700">{state.errors.price}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          defaultValue={category}
          onChange={(event) => setCategory(event?.target.value)}
        >
          <option value="">Uncategorized</option>
          {categoryOptions.map((categoryOption) => (
            <option key={categoryOption._id} value={categoryOption._id}>
              {categoryOption.name}
            </option>
          ))}
        </select>
      </div>
      {propertyOptions.length > 0 &&
        propertyOptions.map((property) => (
          <div key={property._id} className="flex gap-4 items-center ml-8">
            <label>
              {property.name[0].toUpperCase() + property.name.substring(1)}
            </label>
            <select
              id={`property-${property.name}`}
              name={`property-${property.name}`}
              defaultValue={
                product?.properties ? product.properties[property.name] : ""
              }
            >
              {property.values.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        ))}
      <ImageUpload images={product?.images} />
      <div className="flex flex-col">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter product description..."
          defaultValue={product?.description}
        />
        {state?.errors?.description && (
          <p className="text-red-700">{state.errors.description}</p>
        )}
      </div>
      <div className="flex justify-end gap-4">
        <Link
          href={"/products"}
          className="btn-primary-outline p-2 w-32 flex justify-center"
        >
          Cancel
        </Link>
        <SubmitButton />
      </div>
    </form>
  );
}
