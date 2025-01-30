import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ClientContent from "@/components/ClientContent";


export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <ClientContent session={session} />
    </div>
  );
}
