import { useEffect, useState } from "react";
import MessageChat from "../../Components/MessageChat/MessageChat";
import MessagesSidebar from "../../Components/MessagesSidebar/MessagesSidebar";
import styles from "./ChatPage.module.css";
import { api } from "../../utils/Api";
import FirstBar from "../../Components/FirstBar/FirstBar";
import { useAuth } from "../../Contexts/AuthContext";

export interface Message {
  sender_id: number;
  receiver_id: number;
  content: string;
  created_at: string;
}

export interface Receiver {
  receiver_id: number;
  username: string;
  name: string;
}

/* export interface User {
  id: number;
  username: string;
  name: string;
} */

function ChatPage() {
  const [receivers, setReceivers] = useState<Receiver[]>([]); //receivers com mensagens com o utilizador logado
  const [receiver, setReceiver] = useState<Receiver | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("messages");
  const [allSearchableUsers, setAllSearchableUsers] = useState<Receiver[]>([]); //todos os utilizadores da app
  const [messageToSend, setMessageToSend] = useState<string>("");

  const { sender } = useAuth();

  useEffect(() => {
    getAllReceivers();
  }, []);

  async function getAllReceivers() {
    const allreceivers = await api.get("/users/receivers", {
      params: { sender_id: sender.id.toString() },
    });
    if (allreceivers.data.status === "nok") {
      setSelectedOption("messages");
      setReceivers([]);
      return;
    }
    setSelectedOption("messages");
    setReceivers(allreceivers.data.receivers);
  }

  async function getAllReceiverMessages(receiver: Receiver | null) {
    if (receiver !== null) {
      setReceiver(receiver);
      const allreceivermessages = await api.get("/messages/all", {
        params: {
          sender_id: sender.id.toString(),
          receiver_id: receiver.receiver_id,
        },
      });
      if (allreceivermessages.data.status === "nok") {
        return setMessages([]);
      }
      return setMessages(allreceivermessages.data.messages);
    }
  }

  async function getAllUsers() {
    const allusers = await api.get("/users/all");
    if (allusers.data.status === "nok") {
      setSelectedOption("search");
      setAllSearchableUsers([]);
      return;
    }
    setSelectedOption("search");
    setAllSearchableUsers(allusers.data.users);
  }

  async function sendMessage() {
    if (messageToSend.length > 0 && receiver?.receiver_id !== null) {
      const createMessage = await api.post("/messages/create", {
        sender_id: sender?.id.toString(),
        receiver_id: receiver.receiver_id.toString(),
        content: messageToSend,
      });
      if (createMessage.data.status === "nok") {
        return console.log("Unable to create message.");
      }
      setMessageToSend("");
      getAllReceivers(); //SIMULA REFRESH para mostrar logo as mensagens depois de enviar
      getAllReceiverMessages(receiver); //SIMULA REFRESH para mostrar logo as mensagens depois de enviar
    }
  }

  return (
    <section className={styles.page}>
      {/*       <div onClick={() => getAllReceivers()}>Clique</div>
       */}{" "}
      <FirstBar
        getAllReceivers={getAllReceivers}
        setSelectedOption={setSelectedOption}
        getAllUsers={getAllUsers}
      ></FirstBar>
      <MessagesSidebar
        selectedOption={selectedOption}
        receivers={receivers}
        //setReceiver={setReceiver}
        getAllReceiverMessages={getAllReceiverMessages}
        allUsers={allSearchableUsers}
      ></MessagesSidebar>
      <MessageChat
        messageToSend={messageToSend}
        setMessageToSend={setMessageToSend}
        messages={messages}
        receiver={receiver}
        sendMessage={sendMessage}
      ></MessageChat>
    </section>
  );
}

export default ChatPage;
