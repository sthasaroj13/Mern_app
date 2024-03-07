import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'

function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const submithandler = async (e) => {
    e.preventDefault();
    // console.log(name,email,age);
    const addUser = { name, email, age };

    const response = await fetch("http://localhost:5000", {
      method: "POST",
      body: JSON.stringify(addUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
   
    const result = await response.json();
    // console.log(result);
    if (!response.ok) {
      setError(result.error);
    } else {
      setError("");
      setName("");
      setEmail("");
      setAge(0);
        navigate('/all')

    }
  };
  
  return (
    <>
      {error && (
        <div>
          <p>alert {error}</p>
        </div>
      )}

      <h2>Entry form</h2>
      <div className=" flex  justify-center">
        <form
          className="flex flex-col justify-center space-y-4"
          onClick={submithandler}
        >
          <div className="flex flex-col">
            <label  className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="rounded-md border border-gray-300 p-1 focus:outline-none focus:ring-1 focus:ring-blue-500 max-w-96"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label 
           className="text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="rounded-md border border-gray-300 p-1 focus:outline-none focus:ring-1 focus:ring-blue-500 max-w-96"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Age</label>
            <input
              type="Number"
             
              className="rounded-md border border-gray-300 p-1 focus:outline-none focus:ring-1 focus:ring-blue-500 max-w-96"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              className="w-4 h-4 mr-2 rounded focus:ring-1 focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700">
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 max-w-32"
          >
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}

export default Create;
