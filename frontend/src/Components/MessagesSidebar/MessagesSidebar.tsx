import styles from "./MessagesSidebar.module.css";
import type { Receiver } from "../../Pages/ChatPage/ChatPage";
import SearchUsersBar from "../SearchUsersBar/SearchUsersBar";

interface MessagesSidebarProps {
  receivers: Receiver[];
  //setReceiver: Dispatch<SetStateAction<Receiver | null>>;
  getAllReceiverMessages: (receiver: Receiver) => {};
  selectedOption: string;
  allUsers: Receiver[]; //prop drilling para SearchUsersBar
}

function MessagesSidebar({
  receivers,
  //setReceiver,
  getAllReceiverMessages,
  selectedOption,
  allUsers,
}: MessagesSidebarProps) {
  return (
    <section className={styles.sidebar}>
      {selectedOption === "messages" ? (
        <div className={styles.users}>
          {receivers.length > 0 ? (
            receivers.map((receiver) => (
              <div
                onClick={() => {
                  //setReceiver(receiver);
                  getAllReceiverMessages(receiver);
                }}
                className={styles.username}
              >
                @{receiver.username}
              </div>
            ))
          ) : (
            <div>No users</div>
          )}
        </div>
      ) : (
        <SearchUsersBar
          allUsers={allUsers}
          getAllReceiverMessages={getAllReceiverMessages}
        ></SearchUsersBar>
      )}
    </section>
  );
}

export default MessagesSidebar;
