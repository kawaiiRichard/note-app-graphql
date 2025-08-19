import styles from "./Footer.module.css";

function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.copyright}>
          <a
            className={styles.link}
            href="https://github.com/kawaiiRichard"
            target="_blank"
            rel="noopener noreferrer"
          >
            my github
          </a>
        </div>
      </div>
    </>
  );
}

export default Footer;
