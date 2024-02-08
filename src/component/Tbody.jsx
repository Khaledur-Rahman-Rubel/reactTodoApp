import { useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa6";

const Tablebody = ({ user }) => {
  const { id, name, email, prio } = user;

  const [uname, setUName] = useState("");
  const [uemail, setUEmail] = useState("");
  const [editId, setEditId] = useState(-1);

  //start data edit handleEdit
  const handleEdit = (id) => {
    axios
      .get("http://localhost:3000/users/" + id)
      .then((res) => {
        console.log(res.data);
        setUName(res.data.name);
        setUEmail(res.data.email);
      })
      .catch((er) => console.log(er));
    setEditId(id);
  };

  //End data edit handleEdit

  //start handle update function
  const handleUpdate = () => {
    axios
      .put("http://localhost:3000/users/" + editId, {
        id: editId,
        name: uname,
        email: uemail,
      })
      .then((res) => {
        console.log(res);
        location.reload();
        setEditId(-1);
      })
      .catch((err) => console.log(err));
  };

  //End handle update function

  //Start delete button
  const handleDelete = () => {
    axios
      .delete("http://localhost:3000/users/" + id)
      .then(() => {
        location.reload();
      })
      .catch((er) => console.log(er));
  };

  //End delete button

  return (
    <>
      {id === editId ? (
        <tr>
          <td>{id}</td>
          <td>
            <input
              type="name"
              value={uname}
              onChange={(e) => setUName(e.target.value)}
            />
          </td>
          <td>
            <input
              type="email"
              value={uemail}
              onChange={(e) => setUEmail(e.target.value)}
            />
          </td>
          <td>
            <button onClick={handleUpdate}>Update</button>
          </td>
        </tr>
      ) : prio === "prio" ? (
        <tr className="prioTrue">
          <td>{id}</td>
          <td>
            {name}
            <span>
              <FaHeart className="icon" />
            </span>
          </td>
          <td>{email}</td>
          <td className="deletEditButton">
            <button onClick={() => handleEdit(id)}>Edit</button>
            <button onClick={() => handleDelete(id)}>Delete</button>
          </td>
        </tr>
      ) : (
        <tr className="prioFalse">
          <td>{id}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td className="deletEditButton">
            <button onClick={() => handleEdit(id)}>Edit</button>
            <button onClick={() => handleDelete(id)}>Delete</button>
          </td>
        </tr>
      )}
    </>
  );
};

export default Tablebody;
