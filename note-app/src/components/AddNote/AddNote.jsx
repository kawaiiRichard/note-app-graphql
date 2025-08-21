import styles from "./AddNote.module.css";
import { useMutation } from "@apollo/client";
import { CREATE_NOTE, UPDATE_NOTE } from "../../apollo/graphql/mutations";
import { ALL_NOTES } from "../../apollo/graphql/queries";
import { useState, useContext, useEffect } from "react";
import { NoteContext } from "../../contexts/NoteContext";
import { UserContext } from "../../contexts/UserContext";

function AddNote({ children, editData, onCancel }) {
  const { setIsAddingNote } = useContext(NoteContext);
  const { currentUser } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [createNote, { error: createError }] = useMutation(CREATE_NOTE, {
    update(cache, { data: { createNote } }) {
      const { notes } = cache.readQuery({ query: ALL_NOTES });
      cache.writeQuery({
        query: ALL_NOTES,
        data: { notes: [createNote, ...notes] },
      });
    },
  });

  const [updateNote, { error: updateError }] = useMutation(UPDATE_NOTE, {
    update(cache, { data: { updateNote } }) {
      const existingNotes = cache.readQuery({ query: ALL_NOTES });
      if (existingNotes && existingNotes.notes) {
        const newNotes = existingNotes.notes.map((note) =>
          note.id === updateNote.id ? updateNote : note
        );
        cache.writeQuery({
          query: ALL_NOTES,
          data: { notes: newNotes },
        });
      }
    },
  });

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setDescription(editData.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editData]);

  const handleSaveNote = () => {
    if (title.trim().length && description.trim().length) {
      if (editData) {
        updateNote({
          variables: {
            id: editData.id,
            title: title,
            description: description,
          },
        });
      } else if (currentUser) {
        createNote({
          variables: {
            title: title,
            description: description,
            created_at: new Date().toISOString(),
            user_id: currentUser.id,
          },
        });
      } else {
        createNote({
          variables: {
            title: title,
            description: description,
            created_at: new Date().toISOString(),
            user_id: "Общий пользователь",
          },
        });
      }
      setTitle("");
      setDescription("");
      setIsAddingNote(false);
      if (onCancel) onCancel();
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setIsAddingNote(false);
    if (onCancel) onCancel();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveNote();
    }
    if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (createError || updateError) {
    return <div className={styles.main}>Ошибка</div>;
  }

  return (
    <div className={styles.main}>
      <input
        className={styles.input}
        placeholder="Введите название..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        type="text"
      />
      <textarea
        className={styles.textarea}
        placeholder="Введите описание..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={handleKeyDown}
      ></textarea>

      <div className={styles.buttons}>
        <button onClick={handleSaveNote} className={styles.btn}>
          {editData ? "Сохранить изменения" : children}
        </button>
        <button onClick={handleCancel} className={styles["cancel-btn"]}>
          Отмена
        </button>
      </div>
    </div>
  );
}

export default AddNote;
