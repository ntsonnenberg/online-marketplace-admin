import { getUser } from "@/actions/users";
import UserForm from "@/components/UserForm";

export default async function UpdateAccountPage() {
  const user = await getUser();

  return (
    <div>
      <h1>Edit Account</h1>
      {user && <UserForm user={user} />}
    </div>
  );
}
