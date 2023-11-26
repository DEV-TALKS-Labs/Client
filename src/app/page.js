import Card from "@/components/Card";
import Footer from "@/components/Footer.jsx";
import MultiSelect from "@/components/MultiSelect";
import Navbar from "@/components/NavBar";
import AddNewRoom from "@/components/NewRoom";
import PopupModal from "@/components/Popup";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const options = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
    "Option 6",
    "Option 7",
    "Option 8",
    "Option 9",
    "Option 10",
    "Option 11",
    "Option 12",
    "Option 13",
    "Option 14",
    "Option 15",
    "Option 16",
  ];

  return (
    <>
      <main className="flex-grow">
        <Navbar />
        <div className="h-full m-auto max-w-[80%] mt-4">
          <SearchBar />
          <MultiSelect options={options} />
          <PopupModal visible={false} />
          <div className="flex flex-wrap">
            <AddNewRoom />
            <Card title="room for c#" />
            <Card title="room for c++" />
            <Card title="room for c#" />
            <Card title="room for c#" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
