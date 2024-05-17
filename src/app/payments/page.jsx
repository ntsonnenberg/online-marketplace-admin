import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/config";

export default async function PaymentsPage() {
  const session = await getServerSession(authConfig);

  return <div>Payments Page</div>;
}
