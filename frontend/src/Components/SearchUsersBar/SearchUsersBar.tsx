import { useState } from "react";
import type { Receiver } from "../../Pages/ChatPage/ChatPage";
import styles from "./SearchUsersBar.module.css";
const fakeallusers = ["Mariana", "Joana", "Marco", "Rui", "Juliana"];

interface SearchUsersBarProps {
  allUsers: Receiver[]; //prop drilling de MessagesSidebar
  getAllReceiverMessages: (receiver: Receiver) => {}; //prop drilling de MessagesSidebar
}

function SearchUsersBar({
  allUsers,
  getAllReceiverMessages,
}: SearchUsersBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filterusers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
      />
      {filterusers.length > 0 ? (
        <div>
          {filterusers.map((user) => (
            <div
              onClick={() => getAllReceiverMessages(user)}
              className={styles.user}
            >
              @{user.username}
            </div>
          ))}
        </div>
      ) : (
        <div>No users found.</div>
      )}
    </div>
  );
}

export default SearchUsersBar;
