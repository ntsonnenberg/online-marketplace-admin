import { getHomePage } from "@/actions/home-page";
import { getProducts } from "@/actions/products";
import HomePageForm from "@/components/HomePageForm";

interface Props {
  params: { id: string };
}

export default async function UpdateHomePagePage({ params }: Props) {
  const products = await getProducts();
  const homePage = await getHomePage(params.id);

  return (
    <div>
      <h1>Edit Home Page</h1>
      {homePage && (
        <HomePageForm homePage={homePage} productOptions={products} />
      )}
    </div>
  );
}
