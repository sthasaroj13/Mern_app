import React, { useEffect, useState } from "react";

function Read() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  async function getData() {
    const res = await fetch("http://localhost:5000");
    const result = await res.json();
    if (!res.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (res.ok) {
    }
    setData(result);
  }
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const result = await response.json();
        console.log(result.error);
        setError(result.error);
      } else {
        confirm("are you sure want to delete??");
        setError("delete successful");
        setTimeout(() => {
          setError("");
          getData();
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  return (
    <>
      {error && (
        <div>
          <p className=" flex justify-center text-red-600">{error}</p>
        </div>
      )}
      <h2>Show all data</h2>

      <div className="flex flex-wrap justify-center">
        {data?.map((element) => (
          <div
            key={element._idf}
            className="outline outline-offset-2 outline-blue-500 max-w-60 ml-9 mt-4 mr-4"
          >
            <div className="flex flex-col justify-center align-middle">
              <h1>{element.name}</h1>
              <p>{element.email}</p>
              <p>{element.age}</p>
              <div className="flex justify-center gap-3">
                <a
                  href="#"
                  className="bg-red-500 p-1 text-emerald-50 rounded-lg"
                  onClick={() => handleDelete(element._id)}
                >
                  Delete
                </a>
                <a
                  href="#"
                  className="bg-blue-500 p-1 text-emerald-50 rounded-lg"
                >
                  Edit
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Read;
