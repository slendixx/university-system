import styles from "./subtitle.module.css";

const Subtitle = (props) => {
  return (
    <h2
      className={`${styles.subtitle} ${
        props.classes === "sm" ? styles.sm : ""
      }`}
    >
      {props.children}
    </h2>
  );
};

export default Subtitle;
