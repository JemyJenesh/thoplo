import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const { Provider } = UserContext;
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const logout = () => {
    setIsLoading(true);
    axios(process.env.MIX_APP_URL + "/logout")
      .then((res) => {
        window.location.href = "/";
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setIsLoading(true);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    axios("/user")
      .then((res) => setUser(res.data))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, []);

  return <Provider value={{ user, isLoading, logout }}>{children}</Provider>;
}
