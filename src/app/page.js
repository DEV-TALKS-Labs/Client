import CardList from "@/components/CardList";
import Footer from "@/components/Footer.jsx";
import MultiSelect from "@/components/MultiSelect";
import Navbar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import { getServerSession } from "next-auth";

import { cookies } from "next/headers";

// import { useSocket } from "@/context/socketContext";
// import { useEffect } from "react";

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
      <main className='flex-grow'>
        <Navbar />
        <div className='h-full m-auto max-w-[80%] mt-4'>
          <SearchBar />
          <MultiSelect options={options.data} />
          <CardList rooms={rooms.data} token={token} />
        </div>
      </main>
      <Footer />
    </>
  );
}
