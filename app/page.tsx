import Chat from "./components/Chat"
import Navbar from "./components/Navbar";
import Recorder from "./components/Recorder"
import styles from './page.module.css';

export default function Homepage() {
  return (
    <div className={styles.mainDiv}>
        <Chat />
        <Recorder />
    </div>
  )
}