import { getHomePage } from "@/actions/home-page";
import { getProducts } from "@/actions/products";
import HomePageForm from "@/components/HomePageForm";
import ProductCard from "@/components/ProductCard";
import VideoPlayer from "@/components/VideoPlayer";
import Link from "next/link";
import { Suspense } from "react";

export default async function HomePagePage() {
  const products = await getProducts();
  const homePage = await getHomePage();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between">
        <h1>Home Page</h1>
        {homePage && (
          <Link
            href={`/home-page/${homePage._id}/update`}
            className="btn-primary-outline p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </Link>
        )}
      </div>
      {homePage ? (
        <div>
          <div className="mx-12">
            {homePage.video ? (
              homePage.video.includes("youtube") ? (
                <iframe
                  width="560"
                  height="315"
                  src={homePage.video}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              ) : (
                <Suspense fallback={<p>Loading video...</p>}>
                  <VideoPlayer
                    src={homePage.video}
                    className="rounded-xl object-cover mx-auto h-auto"
                  />
                </Suspense>
              )
            ) : (
              <p>No Company Video</p>
            )}
          </div>
          <div className="mt-10">
            <h2 className="font-semibold">About Vendor</h2>
            <p className="m-2">{homePage.about}</p>
          </div>
          <div className="mt-10">
            <h2 className="font-semibold">Featured Products</h2>
            <div className="m-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {homePage.featured.length > 0 ? (
                homePage.featured.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    hideProperties
                  />
                ))
              ) : (
                <p>No Featured Products</p>
              )}
            </div>
          </div>
          <div className="mt-14">
            <h2 className="font-semibold">Vendor Mission Statement</h2>
            <p className="m-2">{homePage.mission}</p>
          </div>
        </div>
      ) : (
        <HomePageForm productOptions={products} />
      )}
    </div>
  );
}
