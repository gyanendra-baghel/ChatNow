import { createContext, useState } from "react";
import { Message } from "../@types/Message";

export const UserContext = createContext<any|null>(null);

const UserContextProvider: React.FC<{children:React.ReactNode}> = ({ children }) => {
  const [username,setUsername]=useState<string>("");
  const [socket,setSocket]=useState(null);
  const [messages,setMessages]=useState<Message[]>([]);

  return (
    <UserContext.Provider value={{ username, setUsername, socket, setSocket,messages,setMessages }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
