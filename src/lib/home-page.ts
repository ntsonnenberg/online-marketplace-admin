import { HomePage } from "@/models/HomePage";
import { mongooseConnect } from "./mongoose";
import { getUserByEmail } from "./user";
import { serializeProduct } from "./product";

const serializeHomePage = (homePage: HomePage): HomePage => ({
  ...homePage,
  _id: homePage._id.toString(),
  vendor: homePage.vendor.toString(),
  featured: homePage.featured.map(serializeProduct),
});

interface NewHomePage {
  about: string;
  mission: string;
  featured?: string[];
  video: string | null;
  vendor: string;
}

export const createNewHomePage = async ({
  about,
  mission,
  featured,
  video,
  vendor,
}: NewHomePage) => {
  try {
    await mongooseConnect();

    const homePage = await HomePage.create({
      about,
      mission,
      featured,
      video,
      vendor,
    });

    if (!homePage) {
      throw new Error("Could not create home page.");
    }

    return homePage;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error("Could not create home page.");
  }
};

interface UpdateHomePage {
  about?: string;
  mission?: string;
  featured?: string[];
  video?: string | null;
}

export const updateHomePageById = async (
  id: string,
  { about, mission, featured, video }: UpdateHomePage
) => {
  try {
    await mongooseConnect();

    const homePage = await HomePage.findOneAndUpdate(
      { _id: id },
      { about, mission, featured, video },
      { new: true }
    );

    if (!homePage) {
      throw new Error(`Could not update home page with id ${id}.`);
    }

    return homePage;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(`Could not update home page with id ${id}.`);
  }
};

export const getHomePageByVendor = async (email: string): Promise<HomePage> => {
  try {
    await mongooseConnect();
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    const homePage: HomePage | null = await HomePage.findOne({
      vendor: user._id,
    })
      .select("-createdAt -updatedAt -__v")
      .populate("featured")
      .lean();

    if (!homePage) {
      throw new Error(`Home Page for vendor with id ${user._id} not found.`);
    }

    const serializedHomePage = serializeHomePage(homePage);

    return serializedHomePage;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error("Could not get home page by vendor.");
  }
};

export const getHomePageById = async (id: string): Promise<HomePage> => {
  try {
    await mongooseConnect();
    const homePage: HomePage | null = await HomePage.findById(id)
      .select("-createdAt -updatedAt -__v")
      .populate("featured")
      .lean();

    if (!homePage) {
      throw new Error(`Home Page with id ${id} not found.`);
    }

    const serializedHomePage = serializeHomePage(homePage);

    return serializedHomePage;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(`Could not get home page with id ${id}.`);
  }
};
