import { useEffect, useState } from "react";
import { CounterContext } from "./CounterContext";
import { jwtDecode } from "jwt-decode";

function Store({ children }) {
  let [user, setUser] = useState(null);
  let [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const session= jwtDecode(token)
      setUser(session.user)
    } 
  }, []);

  return (
    <CounterContext.Provider value={{ user, setUser, ready, setReady }}>
      {children}
    </CounterContext.Provider>
  );
}

export default Store;

