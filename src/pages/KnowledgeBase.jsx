import React from "react";
import { useTheme } from "../ThemeContext";
import Header from "../components/Header";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";

export default function KnowledgeBase() {
  const { theme } = useTheme();
  const [knowledgeBase, setKnowledgeBase] = React.useState([]);

  const fetchKnowledgeBase = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/knowledge-base"
      );
      const data = await response.json();
      console.log(data);
      console.log(knowledgeBase);
      setKnowledgeBase(data);
    } catch (error) {
      console.error("Error fetching knowledge base:", error);
    }
  };

  React.useEffect(() => {
    fetchKnowledgeBase();
  }, []);

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
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/knowledge-base",
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
        const updatedKnowledgeBase = knowledgeBase.filter(
          (data) => data.id !== id
        );
        setKnowledgeBase(updatedKnowledgeBase);
      } else {
        console.error("Failed to delete word:", data.message);
      }
    } catch (error) {
      console.log(error);
    }
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
        <div className="flex justify-content-center">
          <h1
            className={`text-4xl font-bold text-center ${
              theme === "light" ? "text-gray-800" : "text-200"
            } `}
          >
            Knowledge Base
          </h1>
        </div>
        <div className="px-6 mt-4">
          <DataTable
            value={knowledgeBase}
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
              field="text"
              headerClassName={` ${
                theme === "light"
                  ? "text-gray-700 bg-gray-300"
                  : "text-300 bg-gray-800"
              }`}
              header="Knowledge Base"
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
      </div>
    </div>
  );
}
