import styles from "./NoNotes.module.css";

function NoNotes({ children }) {
  return (
    <>
      <div className={styles.main}>{children}</div>
    </>
  );
}

export default NoNotes;
