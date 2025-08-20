import styles from "./LeftPanel.module.css";
import NoteCard from "../NoteCard/NoteCard";
import DropdownList from "../DropdownList/DropdownList";
import { useQuery } from "@apollo/client";
import { ALL_NOTES } from "../../apollo/graphql/queries";
import { useEffect, useContext, useState } from "react";
import { NoteContext } from "../../contexts/NoteContext";

function LeftPanel() {
  const { loading, error, data } = useQuery(ALL_NOTES);
  const {
    selectedNote,
    setSelectedNote,
    setIsAddingNote,
    isAddingNote,
    isEditingNote,
  } = useContext(NoteContext);

  const { setTotalNotes } = useContext(NoteContext);
  const [sortOrder, setSortOrder] = useState("none");

  useEffect(() => {
    if (data && data.notes) {
      setTotalNotes(data.notes.length);
    }
  }, [data, setTotalNotes]);

  const handleNoteClick = (note) => {
    if (!isAddingNote && !isEditingNote) {
      if (selectedNote && selectedNote.id === note.id) {
        setSelectedNote(null);
      } else {
        setSelectedNote(note);
      }
    }
  };

  const sortNotes = (notes) => {
    if (sortOrder === "title") {
      return notes.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "date") {
      return notes.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return notes;
  };

  const sortedNotes = data?.notes ? sortNotes([...data.notes]) : [];

  if (loading) {
    return "Загрузка";
  }

  if (error) {
    return `Ошибка: ${error}`;
  }

  return (
    <div className={styles.main}>
      <button className={styles.btn} onClick={() => setIsAddingNote(true)}>
        Создать заметку
      </button>

      <DropdownList onSortChange={setSortOrder} />

      <div className={styles["cards-list"]}>
        {sortedNotes.map((item) => (
          <NoteCard
            key={item.id}
            note={item}
            isSelected={selectedNote}
            onClick={() => handleNoteClick(item)}
            isDisabled={isAddingNote || isEditingNote}
          />
        ))}
      </div>
    </div>
  );
}

export default LeftPanel;
