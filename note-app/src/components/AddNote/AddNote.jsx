import styles from "./AddNote.module.css";
import { useMutation } from "@apollo/client";
import { CREATE_NOTE } from "../../apollo/graphql/mutations";
import { ALL_NOTES } from "../../apollo/graphql/queries";
import { useState, useContext } from "react";
import { NoteContext } from "../../contexts/NoteContext";

function AddNote() {
  const { setIsAddingNote } = useContext(NoteContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createNote, { error }] = useMutation(CREATE_NOTE, {
    update(cache, { data: { createNote } }) {
      const { notes } = cache.readQuery({ query: ALL_NOTES });

      cache.writeQuery({
        query: ALL_NOTES,
        data: {
          notes: [createNote, ...notes],
        },
      });
    },
  });

  const handleAddNote = () => {
    if (title.trim().length && description.trim().length) {
      createNote({
        variables: {
          title: title,
          description: description,
          created_at: new Date().toISOString(),
          user_id: 123,
        },
      });
      setTitle("");
      setDescription("");
    }
    setIsAddingNote(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddNote();
    }
  };

  if (error) {
    return <div className={styles.main}>Ошибка</div>;
  }

  return (
    <>
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
          name=""
          id=""
        ></textarea>

        <button onClick={handleAddNote} className={styles.btn}>
          Добавить заметку
        </button>
      </div>
    </>
  );
}

export default AddNote;
