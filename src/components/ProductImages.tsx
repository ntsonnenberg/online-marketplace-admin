"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  images: string[];
}

export default function ProductImages({ images }: Props) {
  const [activeImage, setActiveImage] = useState<string>(images[0]);

  useEffect(() => {
    if (images.length) {
      setActiveImage(images[0]);
    }
  }, [images]);

  return (
    <div
      className={`bg-primary-variant shadow-xl p-10 rounded-xl text-on-primary ${
        !images.length && "pb-32"
      }`}
    >
      {images.length ? (
        <div>
          <Image
            src={activeImage}
            width={300}
            height={300}
            alt="active image"
            className="w-full h-full rounded-md"
          />
          <div className="flex gap-2 mt-4">
            {images.map((image) => (
              <div
                key={image}
                className={`${
                  image === activeImage &&
                  "outline outline-2 outline-secondary rounded-md"
                } cursor-pointer`}
                onClick={() => setActiveImage(image)}
              >
                <Image
                  src={image}
                  alt="image"
                  width={50}
                  height={50}
                  className="w-full h-full rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Image
          src="https://curie.pnnl.gov/sites/default/files/default_images/default-image_0.jpeg"
          width={300}
          height={300}
          className="rounded-md w-full h-full"
          alt="product image"
        />
      )}
    </div>
  );
}
