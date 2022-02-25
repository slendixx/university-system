import styles from "./banner.module.css";

const Banner = (props) => {
  return (
    <div className={styles.container}>
      <img src={props.imgSrc} className={styles.image} />
      <h1 className={styles.title}>{props.title}</h1>
    </div>
  );
};
export default Banner;
