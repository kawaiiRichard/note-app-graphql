import styles from "./FormattedDate.module.css";

function FormattedDate({ dateString }) {
  if (!dateString) return "Дата не указана";

  const date = new Date(dateString);
  const readableDate = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  if (isNaN(date.getTime())) {
    console.error("Invalid date string:", dateString);
    return "Неверный формат даты";
  }

  return (
    <>
      <div className={styles.date}>{readableDate}</div>
    </>
  );
}

export default FormattedDate;
