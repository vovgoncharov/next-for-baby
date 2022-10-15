import styles from "components/Title.module.css";
const Title = (props) => {
  return <h4 className={styles.title}>{props.children}</h4>;
};
export default Title;
