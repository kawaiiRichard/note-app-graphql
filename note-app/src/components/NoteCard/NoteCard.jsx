import styles from "./NoteCard.module.css";

function NoteCard({ isSelected, note, onClick }) {
  const maxDescSize = 25;

  return (
    <>
      <div
        className={`${styles.main} ${
          isSelected && isSelected.id === note.id ? styles.selected : ""
        }`}
        onClick={onClick}
      >
        <div className={styles.title}>{note.title}</div>
        <div className={styles.description}>
          {note.description.length > maxDescSize
            ? `${note.description.slice(0, maxDescSize)}...`
            : note.description}
        </div>
      </div>
    </>
  );
}

export default NoteCard;
