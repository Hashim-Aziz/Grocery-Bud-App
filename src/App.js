import { React, useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isediting, setIsEditing] = useState(false);
  const [editID, setEditID] = useState("");
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //display alert
      ShowAlert(true, "please enter value", "danger");
    } else if (name && isediting) {
      //deal with edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setIsEditing(false);
      setName("");
      ShowAlert(true, "value changed", "success");
    } else {
      //show alert
      ShowAlert(true, "item added to the list", "success");
      let newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const ShowAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const editItem = (id) => {
    let newItem = list.find((item) => item.id === id);
    setEditID(newItem.id);
    setIsEditing(true);
    setName(newItem.title);
  };

  const removeAlert = () => {
    ShowAlert();
  };

  return (
    <section className="section-center">
      <form className="grocey-form" onSubmit={handleSubmit}>
        {alert.show && (
          <Alert {...alert} list={list} removeAlert={removeAlert} />
        )}
        <h3>grocery buds</h3>
        <div className="form-control">
          <input
            type="text"
            name="name"
            id="name"
            className="grocery"
            placeholder="e.g eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isediting ? "edit" : "submit"}
          </button>
        </div>
      </form>
      <div className="grocery-container">
        <List items={list} editItem={editItem} />
        <button className="clear-btn" onClick={() => setList([])}>
          clear item
        </button>
      </div>
    </section>
  );
}

export default App;
