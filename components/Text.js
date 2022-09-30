import styles from './Text.module.css'
const Text = (props) => {
  return <p className={styles.text}>{props.children}</p>;
};
export default Text;
