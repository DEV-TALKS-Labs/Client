import CardList from "@/components/CardList";
import Footer from "@/components/Footer.jsx";
import MultiSelect from "@/components/MultiSelect";
import Navbar from "@/components/NavBar";
import PageContainer from "@/components/PageContainer";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

export default async function Home() {
  const rooms = await axios.get("http://localhost:8080/api/rooms");
  const options = await axios.get("http://localhost:8080/api/filters");
  const session = await getServerSession();
  let token = null;
  if (session) {
    token = cookies().get("next-auth.session-token").value;
  }

  return (
    <>
      <main className="flex-grow">
        <Navbar />
        <PageContainer options={options.data} rooms={rooms.data} token={token} />
      </main>
      <Footer />
    </>
  );
}
