import { getUser } from "@/actions/users";
import Image from "next/image";
import Link from "next/link";

export default async function AccountPage() {
  const user = await getUser();

  return (
    <div>
      <div className="flex justify-between">
        <h1>Account</h1>
        {user && (
          <Link
            className="btn-primary-outline p-2"
            href={`/account/${user._id}/update`}
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
      <div className="flex flex-col gap-8 mt-10">
        <div className="flex gap-8 items-center">
          <Image
            src={
              user?.image ||
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
            }
            alt="vendor-image"
            width={100}
            height={100}
            className="shadow-lg border border-on-background/50 rounded-md"
          />
          <div>
            <p className="opacity-50">Vendor Name</p>
            <h2 className="font-bold">{user?.name || "No Name"}</h2>
          </div>
        </div>
        <div>
          <p className="opacity-50">Email</p>
          <h2 className="font-bold">{user?.email}</h2>
        </div>
        <div>
          <p className="opacity-50">Phone Number</p>
          <h2 className="font-bold">{user?.phoneNumber || "No Number"}</h2>
        </div>
      </div>
    </div>
  );
}
