import styles from "./LeftPanel.module.css";
import NoteCard from "../NoteCard/NoteCard";

import { useQuery } from "@apollo/client";
import { ALL_NOTES } from "../../apollo/graphql/queries";

import { useEffect, useContext } from "react";
import { NoteContext } from "../../contexts/NoteContext";

function LeftPanel() {
  const { loading, error, data } = useQuery(ALL_NOTES);
  const { selectedNote, setSelectedNote, setIsAddingNote } =
    useContext(NoteContext);
  const { setTotalNotes } = useContext(NoteContext);

  useEffect(() => {
    if (data && data.notes) {
      setTotalNotes(data.notes.length);
    }
  }, [data, setTotalNotes]);

  const handleNoteClick = (note) => {
    setIsAddingNote(false);
    if (selectedNote && selectedNote.id === note.id) {
      setSelectedNote(null);
    } else {
      setSelectedNote(note);
    }
  };

  if (loading) {
    return "Загрузка";
  }

  if (error) {
    return `Ошибка: ${error}`;
  }

  return (
    <>
      <div className={styles.main}>
        <button className={styles.btn} onClick={() => setIsAddingNote(true)}>
          Создать заметку
        </button>

        <div className={styles["cards-list"]}>
          {data.notes.map((item) => (
            <NoteCard
              key={item.id}
              note={item}
              isSelected={selectedNote}
              onClick={() => handleNoteClick(item)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default LeftPanel;
