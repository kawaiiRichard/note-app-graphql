import styles from "./NoteApp.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LeftPanel from "../LeftPanel/LeftPanel";
import RightPanel from "../RightPanel/RightPanel";
import { NoteProvider } from "../../contexts/NoteContext";

function NoteApp() {
  return (
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
  );
}

export default NoteApp;
