import styles from "./NoteCard.module.css";

function NoteCard({ isSelected, note, onClick, isDisabled }) {
  const maxDescSize = 25;

  const handleClick = () => {
    if (!isDisabled) {
      onClick(isSelected && isSelected.id === note.id ? null : note);
    }
  };

  return (
    <div
      className={`${styles.main} ${
        isSelected && isSelected.id === note.id ? styles.selected : ""
      } ${isDisabled ? styles.disabled : ""}`}
      onClick={handleClick}
    >
      <div className={styles.title}>{note.title}</div>
      <div className={styles.description}>
        {note.description.length > maxDescSize
          ? `${note.description.slice(0, maxDescSize)}...`
          : note.description}
      </div>
    </div>
  );
}

export default NoteCard;
