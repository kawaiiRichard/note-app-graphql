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
  const [isValidated, setIsValidated] = useState(false);

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
    setIsValidated(true);
    const isTitleValid = title.trim().length > 0;
    const isDescriptionValid = description.trim().length > 0;

    if (isTitleValid && isDescriptionValid) {
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
      setIsValidated(false);
      setIsAddingNote(false);
      if (onCancel) onCancel();
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setIsValidated(false);
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

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (isValidated) setIsValidated(false);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (isValidated) setIsValidated(false);
  };

  if (createError || updateError) {
    return <div className={styles.main}>Ошибка</div>;
  }

  return (
    <div className={styles.main}>
      <input
        className={`${styles.input} ${
          isValidated && title.trim() === "" ? styles.empty : ""
        }`}
        placeholder="Введите название..."
        value={title}
        onChange={handleTitleChange}
        onKeyDown={handleKeyDown}
        type="text"
      />
      <textarea
        className={`${styles.textarea} ${
          isValidated && description.trim() === "" ? styles.empty : ""
        }`}
        placeholder="Введите описание..."
        value={description}
        onChange={handleDescriptionChange}
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
