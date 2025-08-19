import styles from "./RightPanel.module.css";
import { useContext } from "react";
import { NoteContext } from "../../contexts/NoteContext";
import AddNote from "../AddNote/AddNote";

function RightPanel() {
  const { selectedNote, isAddingNote } = useContext(NoteContext);
  if (isAddingNote) {
    return <AddNote />;
  }

  if (!selectedNote) {
    return (
      <div className={styles["no-note"]}>Выберите заметку для просмотра</div>
    );
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.title}>{selectedNote.title}</div>
        <div className={styles.description}>{selectedNote.description}</div>
      </div>
    </>
  );
}

export default RightPanel;
