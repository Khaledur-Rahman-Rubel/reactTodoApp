import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

import Tablebody from "./component/Tbody";
/* import { UsersContext } from "./UsersContex"; */

const FetchData = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addData, setAddData] = useState();

  //data fetch start
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setData(res.data))
      .catch((er) => console.log(er));
  }, []);
  //data fetch end

  //start add data
  const handleSubmit = (event) => {
    event.preventDefault();
    if (addData === 1) {
      const id = data.length + 1;
      axios
        .post("http://localhost:3000/users", {
          id: id,
          name: name,
          email: email,
        })
        .then(() => {
          location.reload();
        })
        .catch((er) => console.log(er));
    }
    if (addData === 0) {
      const id = data.length + 1;
      axios
        .post("http://localhost:3000/users", {
          id: id,
          name: name,
          email: email,
          prio: "prio",
        })
        .then(() => {
          location.reload();
        })
        .catch((er) => console.log(er));
    }
  };
  //end add data
  const add = () => {
    setAddData(1);
  };
  const prio = () => {
    setAddData(0);
  };

  return (
    /*  <UsersContext.Provider
      value={{ data, setData, email, setEmail, name, setName }}
    > */
    <div className="container">
      <h1>Todo List App</h1>
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <input
            type="name"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="fromInput">
            <button className="formAddButton" type="submit" onClick={add}>
              Add
            </button>
            <button type="submit" onClick={prio}>
              Priority
            </button>
          </span>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <Tablebody key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
    /* </UsersContext.Provider> */
  );
};

export default FetchData;
