import styles from "./CurrentUser.module.css";
import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { ALL_USERS } from "../../apollo/graphql/queries";
import { UserContext } from "../../contexts/UserContext";

function CurrentUser() {
  const { loading, error, data } = useQuery(ALL_USERS);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleChange = (e) => {
    const selectedUserId = e.target.value;

    if (selectedUserId === "") {
      setCurrentUser(null);
      return;
    }

    const selectedUser = data.users.find((user) => user.id === selectedUserId);

    setCurrentUser(selectedUser || null);
  };

  if (loading) return "Загрузка пользователей";

  if (error) return `Ошибка: ${error}`;

  return (
    <>
      <div className={styles.ddl}>
        <div className={styles.title}>Пользователь:</div>
        <select
          className={styles.select}
          value={currentUser?.id || ""}
          onChange={handleChange}
        >
          <option className={styles.option} value="">
            Не выбрано
          </option>
          {data?.users?.map((user) => (
            <option key={user.id} className={styles.option} value={user.id}>
              {user.name}-{user.id}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default CurrentUser;
