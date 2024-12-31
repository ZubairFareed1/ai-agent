import { useTheme } from "../ThemeContext";
import Header from "../components/Header";
import { Chip } from "primereact/chip";
import { FiSearch } from "react-icons/fi";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import Scrollbars from "rc-scrollbars";
import { GoPlus } from "react-icons/go";
import { useEffect, useState } from "react";

// data shape
// [
//   {id:1, word:"hello"},
//   {id:2, word:"hi"},
//   {id:3, word:"how are you"}
// ]

export default function PreventWords() {
  const [wordsData, setWordsData] = useState([]);
  const [word, setWord] = useState("");
  const fetchWords = async () => {
    const response = await fetch(
      "http://localhost:3000/api/admin/prevent-words"
    );
    const data = await response.json();
    console.log(data);
    setWordsData(data);
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const { theme } = useTheme();

  const wordBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <Chip label={rowData.word} />
      </div>
    );
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <Button
          onClick={() => {
            handleDeleteWord(rowData.id);
          }}
          severity="danger"
        >
          Delete
        </Button>
      </div>
    );
  };
  const handleDeleteWord = async (id) => {
    try{

      const response = await fetch(
        "http://localhost:3000/api/admin/prevent-words",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );
    const data = await response.json();
    if (data.status === "success") {
      // Update the local state without refetching
      const updatedWords = wordsData.filter((word) => word.id !== id);
      setWordsData(updatedWords);
  } else {
      console.error("Failed to delete word:", data.message);
  }
  }catch(error){
    console.log(error)
  }
  };

  const handleWordSubmit = async () => {
    if (word.trim() === "") return;
    const response = await fetch(
      "http://localhost:3000/api/admin/prevent-words",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word }),
      }
    );
    const data = await response.json();
    if (data.status === "success") {
      setWord("");
    }
    setWord("");
    fetchWords();
  };

  return (
    <div className="h-screen lg:px-3 lg:py-5 ">
      <div
        className={`h-full overflow-hidden flex flex-column border-1 border-round-lg ${
          theme === "light" ? "bg-white  border-400 " : "surface-800 border-700"
        }`}
      >
        <div className="">
          <Header />
        </div>
        <div className="h-full">
          <div className=" h-full">
            <h1
              className={`text-center ${
                theme === "light" ? "text-gray-700" : "text-300"
              }`}
            >
              Prevented Words
            </h1>
            <p
              className={`text-center ${
                theme === "light" ? "text-gray-700" : "text-300"
              }`}
            >
              Insert the words which you want to prevent from search...
            </p>
            {/* Search bar */}
            <div className="flex flex-wrap gap-2 justify-content-center">
              <div
                className={`flex align-items-center border-1 ${
                  theme === "light"
                    ? "border-gray-600 bg-white"
                    : "surface-700 border-600"
                } pl-2 `}
                style={{ borderRadius: "50px 0 0 50px" }}
              >
                <FiSearch className="text-3xl m-2 text-gray-600" />
                <input
                  type="text"
                  className={`p-3 border-none w-full bg-transparent text-xl focus:border-none ${
                    theme === "light" ? "text-gray-600" : "text-200"
                  } `}
                  placeholder="Enter word..."
                  style={{ outline: "none", border: "none" }}
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                />
              </div>
              <button
                className="w-4rem h-4rem border-circle-right border-1 text-200 border-gray-500 bg-blue-500"
                onClick={handleWordSubmit}
              >
                <GoPlus className="text-3xl" />
              </button>
            </div>

            {/* Table */}

            <Scrollbars
              className=" mt-5 border-top-1 "
              style={{ height: "400px" }} // Set the desired height
            >
              <div className="flex justify-content-center px-4">
                <DataTable
                  value={wordsData}
                  className="w-full"
                  // tableStyle={{ minWidth: '50rem' }}
                  showGridlines
                >
                  <Column
                    field="id"
                    header="ID"
                    className={` ${
                      theme === "light"
                        ? "text-gray-700 bg-surface-200"
                        : "text-300 bg-gray-700"
                    }`}
                    headerClassName={` ${
                      theme === "light"
                        ? "text-gray-700 bg-gray-300"
                        : "text-300 bg-gray-800"
                    }`}
                  ></Column>
                  <Column
                    field="word"
                    headerClassName={` ${
                      theme === "light"
                        ? "text-gray-700 bg-gray-300"
                        : "text-300 bg-gray-800"
                    }`}
                    header="Word"
                    body={wordBodyTemplate}
                    className={` ${
                      theme === "light"
                        ? "text-gray-700 bg-surface-200"
                        : "text-300 bg-gray-700"
                    }`}
                  ></Column>
                  <Column
                    header="Action"
                    body={actionBodyTemplate}
                    headerClassName={` ${
                      theme === "light"
                        ? "text-gray-700 bg-gray-300"
                        : "text-300 bg-gray-800"
                    }`}
                    className={` ${
                      theme === "light"
                        ? "text-gray-700 bg-surface-200"
                        : "text-300 bg-gray-700"
                    }`}
                  ></Column>
                </DataTable>
              </div>
            </Scrollbars>
          </div>
        </div>
      </div>
    </div>
  );
}
