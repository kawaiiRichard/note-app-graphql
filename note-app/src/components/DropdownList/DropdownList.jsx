import styles from "./DropdownList.module.css";

function DropdownList({ onSortChange }) {
  const handleChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <>
      <div className={styles.ddl}>
        <div className={styles.title}>Сортировка:</div>
        <select className={styles.select} onChange={handleChange} name="" id="">
          <option className={styles.option} value="none">
            Без сортировки
          </option>
          <option className={styles.option} value="title">
            По названию
          </option>
          <option className={styles.option} value="date">
            По дате
          </option>
        </select>
      </div>
    </>
  );
}

export default DropdownList;
