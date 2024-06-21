"use client";

import { Product } from "@/models/Product";
import { useSession } from "next-auth/react";
import VideoUpload from "./VideoUpload";
import ProductCard from "./ProductCard";
import { useState } from "react";
import { useFormState } from "react-dom";
import { createHomePage, updateHomePage } from "@/actions/home-page";
import { HomePage } from "@/models/HomePage";
import FormButtons from "./FormButttons";

interface Props {
  homePage?: HomePage;
  productOptions: Product[];
}

export default function HomePageForm({ homePage, productOptions }: Props) {
  const [state, action] = useFormState(
    homePage?._id ? updateHomePage : createHomePage,
    undefined
  );
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>(
    homePage?.featured || []
  );

  const { data: session } = useSession();

  const isInFeatured = (product: Product) => {
    const match = featuredProducts.find(
      (featured) => featured._id === product._id
    );
    if (match) {
      return true;
    }
    return false;
  };

  const addFeaturedProduct = (product: Product) => {
    if (isInFeatured(product)) {
      const newFeatured = featuredProducts.filter(
        (featured: Product) => featured?._id !== product._id
      );

      setFeaturedProducts(newFeatured);
      return;
    }

    if (featuredProducts.length >= 4) {
      return;
    }

    setFeaturedProducts([...featuredProducts, product]);
  };

  return (
    <form action={action} className="flex flex-col gap-4 mb-20">
      {homePage?._id && (
        <input id="_id" name="_id" defaultValue={homePage._id} hidden />
      )}
      <div>
        <h2 className="font-bold">Upload Video</h2>
        <h3 className="text-lg opacity-50">Post a video about your company.</h3>
        <VideoUpload video={homePage?.video} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="featured" className="font-bold">
          Featured Products
        </label>
        <h3 className="text-lg opacity-50">
          Select Products to Showcase (4 max)
        </h3>
        <div>
          {productOptions.length > 0 ? (
            <div className="p-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {productOptions.map((product) =>
                featuredProducts.length < 4 ? (
                  <ProductCard
                    key={product._id}
                    product={product}
                    checkbox
                    isChecked={isInFeatured(product)}
                    onCheck={() => addFeaturedProduct(product)}
                  />
                ) : isInFeatured(product) ? (
                  <ProductCard
                    key={product._id}
                    product={product}
                    checkbox
                    isChecked
                    onCheck={() => addFeaturedProduct(product)}
                  />
                ) : (
                  <ProductCard
                    key={product._id}
                    product={product}
                    checkbox
                    disabled
                    onCheck={() => addFeaturedProduct(product)}
                  />
                )
              )}
            </div>
          ) : (
            <h2 className="font-bold p-10">No Products Available</h2>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="about">About {session?.user?.email}</label>
        <textarea
          id="about"
          name="about"
          defaultValue={homePage?.about}
          placeholder="Tell us about your company..."
        />
        {state?.errors?.about && (
          <p className="text-red-700">{state.errors.about}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="mission">
          {session?.user?.email}&apos;s Mission Statement
        </label>
        <textarea
          id="mission"
          name="mission"
          defaultValue={homePage?.mission}
          placeholder="Tell us your company's Mission Statement..."
        />
        {state?.errors?.mission && (
          <p className="text-red-700">{state.errors.mission}</p>
        )}
      </div>
      <FormButtons backTo="/home-page" />
    </form>
  );
}
