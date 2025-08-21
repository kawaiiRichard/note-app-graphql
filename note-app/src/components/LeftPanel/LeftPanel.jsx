import styles from "./LeftPanel.module.css";
import NoteCard from "../NoteCard/NoteCard";
import DropdownList from "../DropdownList/DropdownList";
import CurrentUser from "../CurrentUser/CurrentUser";
import { useQuery } from "@apollo/client";
import { ALL_NOTES, USER_NOTES } from "../../apollo/graphql/queries";
import { useEffect, useContext, useState } from "react";
import { NoteContext } from "../../contexts/NoteContext";
import { UserContext } from "../../contexts/UserContext";

function LeftPanel() {
  const {
    selectedNote,
    setSelectedNote,
    setIsAddingNote,
    isAddingNote,
    isEditingNote,
    totalNotes,
    setTotalNotes,
  } = useContext(NoteContext);
  const { currentUser } = useContext(UserContext);

  const { loading, error, data } = useQuery(
    currentUser ? USER_NOTES : ALL_NOTES,
    {
      variables: currentUser
        ? {
            userId: currentUser.id,
          }
        : undefined,
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {}, [currentUser]);

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

      <div className="">Всего заметок: {totalNotes}</div>

      <CurrentUser />
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
