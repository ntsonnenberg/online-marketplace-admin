"use client";

import { Product } from "@/models/Product";
import Link from "next/link";
import Table from "./Table";
import { useState } from "react";
import ProductImages from "./ProductImages";

interface Props {
  products: Product[];
}

export default function ProductView({ products }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const data = products?.map((product) => ({
    _id: product._id,
    title: product.title,
    price: product.price,
    category: product.category,
  }));

  type Data = {
    _id: string;
    title: string;
    price: number;
    category: string | null;
  };

  const showProduct = (id: string) => {
    const product = products.find((prod) => prod._id === id);

    if (product?._id === selectedProduct?._id) {
      setSelectedProduct(null);
      return;
    }

    if (product) {
      setSelectedProduct(product);
    } else {
      setSelectedProduct(null);
    }
  };

  const config = [
    {
      label: "Title",
      render: (data: Data) => (
        <div
          className={`${
            selectedProduct?._id === data._id && "bg-[#a57a5a] rounded-sm"
          } p-1`}
        >
          <button
            className="btn-primary-text font-bold text-start"
            onClick={() => showProduct(data._id)}
          >
            {data.title}
          </button>
        </div>
      ),
    },
    {
      label: "Price",
      render: (data: Data) => `$${data?.price && data.price.toFixed(2)}`,
    },
    {
      label: "Category",
      render: (data: Data) => data.category || "Uncategorized",
    },
    {
      label: "",
      render: (data: Data) => (
        <div className="flex gap-4 justify-end">
          <Link
            href={`/products/${data._id}/update`}
            className="btn-primary-filled px-1 flex gap-2 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            Edit
          </Link>
          <Link
            href={`/products/${data._id}/delete`}
            className="btn-delete-filled px-1 flex gap-2 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
            Delete
          </Link>
        </div>
      ),
    },
  ];

  return products?.length ? (
    <div className="my-10 flex gap-10">
      <Table
        data={data}
        config={config}
        className={selectedProduct && "basis-1/2 self-start"}
      />
      {selectedProduct && (
        <div className="mx-10">
          <ProductImages images={selectedProduct.images} />
          <h1 className="font-bold mt-6">
            {selectedProduct.title} - ${selectedProduct.price}
          </h1>
          <div className="ml-2 my-4">
            <div className="flex gap-4">
              <div>
                <p className="font-bold text-lg">Category</p>
                <p className="ml-2">
                  {selectedProduct.category || "Uncategorized"}
                </p>
              </div>
              {selectedProduct.properties && (
                <div>
                  <p className="font-bold text-lg">Properties</p>
                  {Object.keys(selectedProduct.properties).map((propName) => (
                    <p className="ml-2" key={propName}>
                      {propName}:{" "}
                      <span className="opacity-70">
                        {selectedProduct.properties[propName]}
                      </span>
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-8">
              <p className="font-bold text-lg">Description</p>
              <p className="ml-2">{selectedProduct.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <p className="mt-10 text-lg flex justify-center">No products</p>
  );
}
