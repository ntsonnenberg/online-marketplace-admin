"use client";

import { Product } from "@/models/Product";
import Image from "next/image";
import { useState } from "react";

interface Props {
  product: Product;
  hideProperties?: boolean;
  checkbox?: boolean;
  disabled?: boolean;
  onCheck?: () => void;
  isChecked?: boolean;
}

export default function ProductCard({
  product,
  hideProperties,
  checkbox,
  disabled,
  onCheck,
  isChecked: currentIsChecked,
}: Props) {
  const [isChecked, setIsChecked] = useState<boolean>(
    currentIsChecked || false
  );

  const check = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (disabled || !checkbox) {
      return;
    }

    setIsChecked(!isChecked);

    if (onCheck) {
      onCheck();
    }
  };

  const propertyNames = product?.properties && Object.keys(product?.properties);

  const renderedProperties =
    propertyNames && propertyNames.length > 0 && !hideProperties ? (
      propertyNames.length <= 2 ? (
        propertyNames.map((name: string) => (
          <div
            key={name}
            className="flex gap-2 items-start self-start ml-2 mt-2"
          >
            <p className="font-bold">{name}</p>
            <p className="text-sm break-all">{product.properties[name]}</p>
          </div>
        ))
      ) : (
        <div className="self-start ml-2">
          <div className="flex gap-2 items-start mt-2">
            <p className="font-bold">{propertyNames[0]}</p>
            <p className="text-sm break-all">
              {product.properties[propertyNames[0]]}
            </p>
          </div>
          <div className="flex gap-2 items-start mt-2">
            <p className="font-bold">{propertyNames[1]}</p>
            <p className="text-sm break-all">
              {product.properties[propertyNames[1]]}
            </p>
          </div>
          <div className="font-bold mt-2">
            {propertyNames.length - 2} more...
          </div>
        </div>
      )
    ) : null;

  const checkedCardClasses = isChecked
    ? "outline outline-3 outline-primary-variant outline-offset-2 shadow-xl bg-[#e4d8c7] -translate-y-2"
    : "";

  const cardClasses = disabled
    ? "shadow-none opacity-50"
    : checkbox
    ? "cursor-pointer shadow-md"
    : "cursor-auto shadow-md";

  return (
    <div
      onClick={check}
      className={`select-none bg-[#dfd3c2] rounded-lg p-2 flex flex-col items-center justify-center transition ease-in-out ${cardClasses} ${checkedCardClasses}`}
    >
      {product?.images && product.images.length > 0 ? (
        <Image
          src={product.images[0] || ""}
          width={110}
          height={110}
          className="rounded-md w-full h-full"
          alt="product image"
        />
      ) : (
        <Image
          src="https://curie.pnnl.gov/sites/default/files/default_images/default-image_0.jpeg"
          width={110}
          height={110}
          className="rounded-md w-full h-full"
          alt="product image"
        />
      )}
      {checkbox && isChecked && (
        <input
          id="featured"
          name="featured"
          value={product._id}
          hidden
          readOnly
          disabled={disabled}
        />
      )}
      <h2 className="font-bold self-start mt-2">{product.title}</h2>
      {renderedProperties}
    </div>
  );
}
