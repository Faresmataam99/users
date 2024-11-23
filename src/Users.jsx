import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [userList, setUserList] = useState([]); 
  const [filteredUser, setFilteredUser] = useState(null); 
  const [input, setInput] = useState(""); 

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        console.log("Fetched users:", response.data); 
        setUserList(response.data); 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);


  const handleSearch = ()=>{
    const matchingUser =userList.find(
      (user)=> user?.Firstname.toLowerCase() === input.toLowerCase() ||
      `${user?.Firstname || ""} ${user?.Lastname || ""}`.toLowerCase() ===
      input.toLowerCase()
    );
    setFilteredUser(matchingUser)
  }

  return (
    <div className="flex items-center justify-center flex-col max-w-full m-auto">
      <h1 className="text-2xl font-bold">Search Users</h1>
      <div className="flex items-center justify-center flex-col">
        <input
          className="p-2 border rounded mb-4"
          type="text"
          placeholder="Enter user's name"
          value={input}
          onChange={(e) => setInput(e.target.value)} 
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-black text-white rounded hover:bg-gray-500 transition-all duraiton-200"
        >
          Search
        </button>
      </div>
     
      {filteredUser ? ( 
  <div className="mt-4 p-4 border rounded shadow-xl hover:scale-110 transition-all duration-200 w-80 ">
    <h2  className="text-xl font-bold ">User Details</h2>
    <p>
      Name: {filteredUser.Firstname} {filteredUser.Lastname}
    </p>
    <p>Age: {filteredUser.Age}</p>
    <p>Country: {filteredUser.Country}</p>
  </div>
) : (
  <div className="mt-4 text-gray-500">
    No user selected. Please search for a user.
  </div>
)}
    </div>
  );
}