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
    <div className="bg-primary-variant p-10 rounded-xl text-on-primary">
      {images.length ? (
        <div>
          <Image
            src={activeImage}
            width={400}
            height={400}
            alt="active image"
          />
          <div className="flex gap-2 mt-4">
            {images.map((image) => (
              <div
                key={image}
                className={`${
                  image === activeImage &&
                  "border-2 border-secondary rounded-md"
                } cursor-pointer`}
                onClick={() => setActiveImage(image)}
              >
                <Image src={image} alt="image" width={50} height={50} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-80 w-80 flex justify-center items-center text-lg font-bold">
          No Images
        </div>
      )}
    </div>
  );
}
