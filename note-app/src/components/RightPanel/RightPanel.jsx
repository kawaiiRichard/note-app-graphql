import styles from "./RightPanel.module.css";
import { useContext } from "react";
import { NoteContext } from "../../contexts/NoteContext";
import AddNote from "../AddNote/AddNote";
import close from "../../assets/svg/close-large.svg";
import FormattedDate from "../FormattedDate/FormattedDate";

function RightPanel() {
  const { selectedNote, setSelectedNote, isAddingNote } =
    useContext(NoteContext);
  if (isAddingNote) {
    return <AddNote />;
  }

  if (!selectedNote) {
    return (
      <div className={styles["no-note"]}>Выберите заметку для просмотра</div>
    );
  }

  const closeWindow = () => {
    setSelectedNote(null);
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.title}>{selectedNote.title}</div>
          <img
            onClick={closeWindow}
            className={styles.img}
            src={close}
            alt=""
          />
        </div>
        <FormattedDate dateString={selectedNote.date} />
        <div className={styles.description}>{selectedNote.description}</div>
      </div>
    </>
  );
}

export default RightPanel;
