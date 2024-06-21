"use client";

import Image from "next/image";
import { SyntheticEvent, useState } from "react";
import axios from "axios";

interface Props {
  images?: string[];
}

// TODO: /product-images path hardcoded out on API request to delete image
export default function ImageUpload({ images: currentImages }: Props) {
  const [images, setImages] = useState<string[]>(currentImages || []);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const files = Array.from(event.target?.files || []);
    if (!files?.length) {
      return;
    }
    setIsUploading(true);

    const data = new FormData();

    files.forEach((file) => {
      data.append("file", file);
    });

    const response = await axios.post("/api/upload/product", data);

    setImages([...response.data.links, ...images]);
    setIsUploading(false);
  };

  const removeImage = async (event: SyntheticEvent, linkToRemove: string) => {
    event.preventDefault();

    setIsUploading(true);

    try {
      const key = linkToRemove.split("product-images/").pop();
      const response = await axios.delete(`/api/upload/product/${key}`);

      if (response.status === 200) {
        const newImageList = images.filter((link) => link !== linkToRemove);
        setImages(newImageList);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="images">Photos</label>
      <div className="mb-2 flex flex-wrap gap-4">
        <label className="w-28 h-28 cursor-pointer flex flex-col justify-center items-center text-center border border-on-background rounded-md shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8"
          >
            <path
              fillRule="evenodd"
              d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          <div className="mt-2">
            <p className="text-sm">Upload image</p>
            <p className="text-[10px]">JPG, JPEG, PNG</p>
          </div>
          <input
            type="file"
            multiple
            onChange={async (event) => await uploadImage(event)}
            className="hidden"
            accept=".jpg,.jpeg,.png"
          />
          {images.map((link) => (
            <input
              key={link}
              id="images"
              name="images"
              defaultValue={link}
              hidden
            />
          ))}
        </label>
        {isUploading && <span className="uploadLoader"></span>}
        {!!images?.length &&
          images.map(
            (link) =>
              link && (
                <div key={link} className="relative p-1.5">
                  <Image
                    src={link || ""}
                    alt=""
                    className="rounded-lg"
                    width={100}
                    height={100}
                  />
                  <button
                    onClick={async (event) => removeImage(event, link)}
                    className="bg-red-500 text-on-primary p-1 rounded-full absolute top-0 right-0"
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
              )
          )}
      </div>
    </div>
  );
}
