import styles from "./RightPanel.module.css";
import { useContext, useState } from "react";
import { NoteContext } from "../../contexts/NoteContext";
import AddNote from "../AddNote/AddNote";
import close from "../../assets/svg/close-large.svg";
import bin from "../../assets/svg/bin.svg";
import FormattedDate from "../FormattedDate/FormattedDate";
import { useMutation } from "@apollo/client";
import { DELETE_NOTE } from "../../apollo/graphql/mutations";
import { ALL_NOTES } from "../../apollo/graphql/queries";
import NoNotes from "../NoNotes/NoNotes";

function RightPanel() {
  const {
    selectedNote,
    setSelectedNote,
    isAddingNote,
    isEditingNote,
    totalNotes,
    setIsEditingNote,
  } = useContext(NoteContext);

  const [editNoteData, setEditNoteData] = useState(null);

  const [deleteNote, { error: deleteError }] = useMutation(DELETE_NOTE, {
    update(cache, { data: { deleteNote } }) {
      const existingNotes = cache.readQuery({ query: ALL_NOTES });

      if (existingNotes && existingNotes.notes) {
        const newNotes = existingNotes.notes.filter(
          (note) => note.id !== deleteNote.id
        );

        cache.writeQuery({
          query: ALL_NOTES,
          data: { notes: newNotes },
        });
      }

      setSelectedNote(null);
    },
  });

  const handleEditClick = () => {
    setEditNoteData({
      id: selectedNote.id,
      title: selectedNote.title,
      description: selectedNote.description,
      date: selectedNote.date,
    });
    setIsEditingNote(true);
  };

  const handleCloseEdit = () => {
    setIsEditingNote(false);
    setEditNoteData(null);
  };

  const closeWindow = () => {
    setSelectedNote(null);
    setIsEditingNote(false);
    setEditNoteData(null);
  };

  if (isAddingNote) {
    return <AddNote>Добавить заметку</AddNote>;
  }

  if (isEditingNote) {
    return (
      <AddNote editData={editNoteData} onCancel={handleCloseEdit}>
        Редактировать заметку
      </AddNote>
    );
  }

  if (!selectedNote && totalNotes === 0) {
    return <NoNotes>Создайте новую заметку</NoNotes>;
  }

  if (!selectedNote) {
    return <NoNotes>Выберите заметку для просмотра</NoNotes>;
  }

  if (deleteError) {
    return `Ошибка: ${deleteError}`;
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>{selectedNote.title}</div>
        <img
          onClick={closeWindow}
          className={styles.img}
          src={close}
          alt="Закрыть"
        />
      </div>
      <FormattedDate dateString={selectedNote.date} />
      <div className={styles.description}>{selectedNote.description}</div>
      <div className={styles.footer}>
        <div className={styles.change} onClick={handleEditClick}>
          Изменить
        </div>
        <img
          onClick={() =>
            deleteNote({
              variables: { id: selectedNote.id },
            })
          }
          className={styles.bin}
          src={bin}
          alt="Удалить"
        />
      </div>
    </div>
  );
}

export default RightPanel;
