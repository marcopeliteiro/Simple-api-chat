import { useAuth } from "../../Contexts/AuthContext";
import styles from "./FirstBar.module.css";

interface FirstBarProps {
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  getAllUsers(): Promise<void>;
  getAllReceivers(): Promise<void>;
}

function FirstBar({ getAllReceivers, getAllUsers }: FirstBarProps) {
  //const [selectedOption, setSelectedOption] = useState<string>("messages");
  const { Logout } = useAuth();
  return (
    <div>
      <div onClick={() => getAllReceivers()}>💬</div>
      <div onClick={() => getAllUsers()}>🔎</div>
      <div onClick={() => Logout()} className={styles.logout}>
        Logout
      </div>
    </div>
  );
}

export default FirstBar;
