import styles from "./centerResponsive.module.css";

const CenterResponsive = (props) => {
  return <div className={styles.content}>{props.children}</div>;
};

export default CenterResponsive;
