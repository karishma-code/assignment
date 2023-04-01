import { useEffect, useCallback, useMemo } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const getUsers = useCallback(async () => {
    await axios
      .get("https://randomuser.me/api")
      .then((response) => {
        localStorage.setItem(
          "result",
          JSON.stringify(response.data.results[0])
        );
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const getName = useMemo(() => {
    const result = JSON.parse(localStorage.getItem("result") || "{}");
    const { title, first, last } = result.name;
    return `${title} ${first} ${last}`;
  }, []);

  const getEmail = useMemo(() => {
    const result = JSON.parse(localStorage.getItem("result") || "{}");
    return result.email;
  }, []);

  const handleRefresh = () => {
    getUsers();
  };

  return (
    <div className="App">
      <div className="container">
        <div className="name">{getName}</div>
        <div className="email">{getEmail}</div>
        <input
          className="button"
          type="button"
          value="Refresh"
          onClick={handleRefresh}
        />
      </div>
    </div>
  );
}

export default App;
