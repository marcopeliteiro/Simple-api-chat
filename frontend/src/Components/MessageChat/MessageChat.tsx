import { useAuth } from "../../Contexts/AuthContext";
import type { Message, Receiver } from "../../Pages/ChatPage/ChatPage";
import styles from "./MessageChat.module.css";

interface MessageChatProps {
  receiver: Receiver | null;
  messages: Message[];
  messageToSend: string;
  setMessageToSend: React.Dispatch<React.SetStateAction<string>>;
  sendMessage(): Promise<void>;
}

function stringToDate(d: string) {
  const nd = new Date(d);
  return nd;
}
function MessageChat({
  receiver,
  messages,
  setMessageToSend,
  messageToSend,
  sendMessage,
}: MessageChatProps) {
  const { sender } = useAuth();

  return (
    <section className={styles.chat}>
      {receiver === null ? (
        <div>Select a user to see your messages with them.</div>
      ) : (
        <div>
          <div className={styles.header}>
            <span>👤</span>
            <p>{receiver.name}</p>
          </div>
          <div className={styles.messages}>
            {messages.length > 0 ? (
              messages.map((message) =>
                message.sender_id === sender?.id ? (
                  <div className={styles.sender}>
                    <p>{message.content}</p>{" "}
                    <p>{stringToDate(message.created_at).toUTCString()}</p>
                  </div>
                ) : (
                  <div className={styles.receiver}>
                    <p>{message.content}</p>
                    <p>{stringToDate(message.created_at).toUTCString()}</p>
                  </div>
                ),
              )
            ) : (
              <div>Send a message to {receiver.name} </div>
            )}
          </div>
          <div className={styles.inputsContainer}>
            <input
              value={messageToSend}
              onChange={(e) => setMessageToSend(e.target.value)}
              className={styles.messageInput}
              type="text"
            />
            <input type="submit" onClick={() => sendMessage()} />
          </div>
        </div>
      )}
    </section>
  );
}

export default MessageChat;
