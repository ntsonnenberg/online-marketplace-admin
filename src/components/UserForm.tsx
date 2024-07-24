"use client";

import { useFormState } from "react-dom";
import { User } from "../models/User";
import FormButtons from "./FormButttons";
import { updateUser } from "@/actions/users";

interface Props {
  user: User;
}

export default function UserForm({ user }: Props) {
  const [state, action] = useFormState(updateUser, undefined);

  return (
    <form action={action} className="my-10">
      {user?._id && (
        <input id="_id" name="_id" defaultValue={user._id} hidden />
      )}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col">
          <label htmlFor="name">Vendor Name</label>
          <input
            id="name"
            name="name"
            defaultValue={user?.name}
            placeholder="Vendor name..."
          />
          {state?.errors?.name && (
            <p className="text-red-700">{state.errors.name}</p>
          )}
        </div>
        <div className="flex flex-col opacity-50">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" defaultValue={user?.email} disabled />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone-number">Phone Number</label>
          <input
            id="phone-number"
            name="phone-number"
            defaultValue={user?.phoneNumber}
            placeholder="(XXX) XXX - XXXX"
          />
          {state?.errors?.phoneNumber && (
            <p className="text-red-700">{state.errors.phoneNumber}</p>
          )}
        </div>
      </div>
      <FormButtons backTo="/account" />
    </form>
  );
}
