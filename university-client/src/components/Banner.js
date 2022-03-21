import styles from "./banner.module.css";

const Banner = (props) => {
  return (
    <div className={styles.container}>
      <img src={props.imgSrc} className={styles.image} />
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{props.title}</h1>
      </div>
    </div>
  );
};
export default Banner;
