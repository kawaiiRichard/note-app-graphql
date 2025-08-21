import styles from "./NoteApp.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LeftPanel from "../LeftPanel/LeftPanel";
import RightPanel from "../RightPanel/RightPanel";
import { NoteProvider } from "../../contexts/NoteContext";
import { UserProvider } from "../../contexts/UserContext";

function NoteApp() {
  return (
    <UserProvider>
      <NoteProvider>
        <>
          <Header />
          <div className={styles.main}>
            <LeftPanel />
            <RightPanel />
          </div>
          <Footer />
        </>
      </NoteProvider>
    </UserProvider>
  );
}

export default NoteApp;
