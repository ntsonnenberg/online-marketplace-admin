import { User } from "@/models/User";
import { mongooseConnect } from "./mongoose";

const serializeUser = (user: User): User => ({
  ...user,
  _id: user._id.toString(),
});

interface NewUser {
  email: string;
  password: string;
}

export const createUser = async ({ email, password }: NewUser) => {
  try {
    await mongooseConnect();
    if (!email || !password) {
      throw new Error("Email or password not provided.");
    }

    if (await User.findOne({ email })) {
      throw new Error(`User with email ${email} already exists.`);
    }

    const user = await User.create({ email, password, source: "credentials" });

    if (user) {
      return user;
    }

    throw new Error("User was not created.");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

interface UpdateUser {
  name?: string;
  phoneNumber?: string;
}

export const updateUserById = async (
  id: string,
  { name, phoneNumber }: UpdateUser
) => {
  try {
    await mongooseConnect();

    const user = await User.findOneAndUpdate(
      { _id: id },
      { name, phoneNumber },
      { new: true }
    );

    if (!user) {
      throw new Error(`Could not update user with id ${id}.`);
    }

    return user;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(`Could not update user with id ${id}.`);
  }
};

export const getUsers = async (query: User) => {
  try {
    await mongooseConnect();
    if (Object.keys(query).length) {
      const users = await User.find(query);
      if (!users.length) {
        throw new Error(`Users with query ${Object.keys(query)} not found.`);
      }

      return users;
    }

    const users = await User.find({});
    if (!users.length) {
      throw new Error("Users not found.");
    }

    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    await mongooseConnect();
    const user = await User.findById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found.`);
    }

    const serializedUser = serializeUser(user);

    return serializedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserByEmail = async (email: string): User => {
  try {
    await mongooseConnect();
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      throw new Error(`User with email ${email} not found.`);
    }

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
