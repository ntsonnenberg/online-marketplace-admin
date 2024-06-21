"use client";

import { Category, Parent } from "@/models/Category";
import Link from "next/link";
import Table from "./Table";
import { useState } from "react";

interface Props {
  categories: Category[];
}

export default function CategoryView({ categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const data = categories.map(({ _id, name, parent }) => ({
    _id,
    name,
    parent,
  }));

  type Data = {
    _id: string;
    name: string;
    parent: Parent | null;
  };

  const showCategory = (id: string) => {
    const category = categories.find((cat) => cat._id === id);

    if (category?._id === selectedCategory?._id) {
      setSelectedCategory(null);
      return;
    }

    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
  };

  const config = [
    {
      label: "Name",
      render: (data: Data) => (
        <div
          className={`${
            selectedCategory?._id === data._id && "bg-[#a57a5a] rounded-sm"
          } p-1`}
        >
          <button
            className="btn-primary-text font-bold text-start"
            onClick={() => showCategory(data._id)}
          >
            {data.name}
          </button>
        </div>
      ),
    },
    {
      label: "Parent",
      render: (data: Data) => data?.parent?.name && data.parent.name,
    },
    {
      label: "",
      render: (data: Data) => (
        <div className="flex gap-4 justify-end">
          <Link
            href={`/categories/${data._id}/update`}
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
            href={`/categories/${data._id}/delete`}
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

  return categories.length ? (
    <div className="my-10 flex gap-10">
      <Table
        data={data}
        config={config}
        className={selectedCategory && "basis-1/2 self-start"}
      />
      {selectedCategory && (
        <div className="mx-10">
          <h1 className="font-bold">{selectedCategory.name}</h1>
          {selectedCategory.properties.length > 0 && (
            <div className="mt-4">
              <p className="font-bold text-lg mb-2">Properties</p>
              <div className="flex gap-4 flex-wrap ml-4 mb-4">
                {selectedCategory.properties.map((property) => (
                  <div
                    key={property._id}
                    className="bg-[#e2d0b5] p-2 rounded-md shadow-md"
                  >
                    <p className="font-bold">{property.name}</p>
                    {property.values.map((value) => (
                      <p className="mt-2 ml-2 text-xs" key={value}>
                        {value}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
          {selectedCategory.parent && (
            <div>
              <p className="font-bold text-lg">Parent Category</p>
              <p className="ml-4">{selectedCategory.parent.name}</p>
              {selectedCategory.parent?.properties &&
                selectedCategory.parent.properties.length > 0 && (
                  <div className="my-4">
                    <p className="font-bold text-lg mb-2">Parent Properties</p>
                    <div className="flex gap-4 flex-wrap ml-4">
                      {selectedCategory.parent.properties?.map((property) => (
                        <div
                          key={property._id}
                          className="bg-[#e2d0b5] p-2 rounded-md shadow-md"
                        >
                          <p className="font-bold">{property.name}</p>
                          {property.values.map((value) => (
                            <p className="mt-2 ml-2 text-xs" key={value}>
                              {value}
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  ) : (
    <p className="mt-10 text-lg flex justify-center">No Categories</p>
  );
}
