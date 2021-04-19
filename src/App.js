import { React, useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isediting, setIsEditing] = useState(false);
  const [editID, setEditID] = useState("");
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="section-center">
      <form className="grocey-form" onSubmit={handleSubmit}>
        <Alert />
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
        <List />
        <button className="clear-btn" onClick={() => setList([])}>
          clear item
        </button>
      </div>
    </section>
  );
}

export default App;
