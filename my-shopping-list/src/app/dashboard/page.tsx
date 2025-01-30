import Greetings from "@/components/Greetings";
import Layout from "@/components/Layout";
import ListPageContent from "@/components/ListPageContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import AddListsButton from "@/components/AddListsButton";
import SearchBar from "@/components/SearchBar";

export default async function Page() {
  const session = await getServerSession(authOptions); // tive problemas para usar useSession em outros lugares....
  // por isso passei o token via props provisoriamente

  if (!session) {
    redirect("/");
  }

  const token = session.user?.token;

  return (
    <Layout>
      <div className="flex w-full items-center mb-5">
        <Greetings name={session.user?.name} />
        <div className="flex-grow flex justify-center items-center">
          <SearchBar /*searchTerm={undefined} onUpdate={filterLists}*/ />
        </div>
        <AddListsButton user_id={session.user?.id} token={token} />
      </div>
      <ListPageContent user_id={session.user?.id} token={token} />
    </Layout>
  );
}
