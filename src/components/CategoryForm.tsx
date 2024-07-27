"use client";

import { createCategory, updateCategory } from "@/actions/categories";
import { useState } from "react";
import { useFormState } from "react-dom";
import FormButtons from "./FormButtons";

interface Props {
  _id?: string;
  name?: string;
  parent?: { _id: string; name: string } | null;
  properties?: { name: string; values: string[] }[];
  categoryOptions: { _id: string; name: string }[];
}

export default function CategoryForm({
  _id,
  name,
  parent,
  properties: currentProperties,
  categoryOptions,
}: Props) {
  const [state, action] = useFormState(
    _id ? updateCategory : createCategory,
    undefined
  );
  const [properties, setProperties] = useState(currentProperties || []);

  const addProperty = (event: React.SyntheticEvent) => {
    event.preventDefault();

    setProperties([...properties, { name: "", values: [""] }]);
  };

  const removeProperty = (event: React.SyntheticEvent, index: number) => {
    event.preventDefault();

    setProperties(properties.filter((p, pIndex) => pIndex !== index));
  };

  const addValue = (event: React.SyntheticEvent, index: number) => {
    event.preventDefault();

    setProperties((prev) => {
      return prev.map((p, pIndex) => {
        if (pIndex === index) {
          return { ...p, values: [...p.values, ""] };
        }
        return p;
      });
    });
  };

  const removeValue = (
    event: React.SyntheticEvent,
    pIndexToRemove: number,
    vIndexToRemove: number
  ) => {
    event.preventDefault();

    setProperties((prev) => {
      return prev.map((p, pIndex) => {
        if (pIndex === pIndexToRemove) {
          const newValues = p.values.filter(
            (v, vIndex) => vIndex !== vIndexToRemove
          );

          return { ...p, values: newValues };
        }
        return p;
      });
    });
  };

  return (
    <form action={action} className="mb-20">
      {_id && <input id="_id" name="_id" defaultValue={_id} hidden />}
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex flex-col grow">
          <label htmlFor="name">Category Name</label>
          <input
            id="name"
            name="name"
            defaultValue={name}
            placeholder="Enter category name..."
          />
          {state?.errors?.name && (
            <p className="text-red-700">{state.errors.name}</p>
          )}
        </div>
        <div className="flex flex-col grow">
          <label htmlFor="parent">Parent Category</label>
          <select
            id="parent"
            name="parent"
            className="py-2.5"
            defaultValue={parent?._id}
          >
            <option value="">No parent category</option>
            {categoryOptions.length &&
              categoryOptions.map((categoryOption) => (
                <option value={categoryOption._id} key={categoryOption._id}>
                  {categoryOption.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="my-4">
        <label className="block mb-2" htmlFor="properties">
          Properties
        </label>
        <button className="btn-primary-outline p-2 mb-8" onClick={addProperty}>
          Add new property
        </button>
        <div className="flex flex-col gap-4">
          {properties?.length > 0 &&
            properties.map((property, index) => (
              <div
                key={index}
                className="p-2 rounded-lg shadow-md bg-[#e9d9c2]"
              >
                <div className="flex gap-2 my-2 items-start relative">
                  <input
                    id="property-name"
                    name="property-name"
                    type="text"
                    defaultValue={property.name}
                    placeholder="Property name..."
                    className="grow"
                  />
                  <div className="flex flex-col grow">
                    {property.values.length > 0 ? (
                      property.values.map((value, vIndex) => (
                        <div key={vIndex} className="flex gap-2 items-center">
                          <input
                            id={`property-${index}-value`}
                            name={`property-${index}-value`}
                            defaultValue={value}
                            placeholder="Property value..."
                            className="mb-2 grow"
                          />
                          {vIndex !== 0 && (
                            <button
                              className="btn-delete-text absolute right-14 mb-2"
                              onClick={(event) =>
                                removeValue(event, index, vIndex)
                              }
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
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <input
                        id="property-value"
                        name="property-value"
                        defaultValue=""
                        placeholder="Enter property value..."
                        className="grow"
                      />
                    )}
                  </div>
                  <button
                    className="btn-delete-filled p-1 md:p-2"
                    onClick={(event) => removeProperty(event, index)}
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
                  </button>
                </div>
                <div className="flex justify-end mr-[86px]">
                  <button
                    className="btn-secondary-filled text-xs p-0.5 flex items-center"
                    onClick={(event) => addValue(event, index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    property value
                  </button>
                </div>
              </div>
            ))}
        </div>
        {state?.errors?.properties &&
          state.errors.properties.map((property, index) => (
            <p key={index} className="text-red-700">
              {property}
            </p>
          ))}
      </div>
      <FormButtons backTo="/categories" />
    </form>
  );
}
