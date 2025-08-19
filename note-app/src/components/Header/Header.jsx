import styles from "./Header.module.css";
import noteBook from "../../assets/svg/note-book.svg";

function Header() {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img className={styles.img} src={noteBook} alt="" />
          <div className={styles.title}>NoteApp</div>
        </div>
      </div>
    </>
  );
}

export default Header;
