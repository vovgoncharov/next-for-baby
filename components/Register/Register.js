import NewUser from "./NewUser";
import Regist from "./Regist";
import styles from "./Register.module.css";

const Register = (props) => {
  return (
    <div className={styles.block__register}>
      <NewUser className={styles.span}>{props.children}</NewUser>
      <Regist path={props.path} className={styles.register}>{props.text}</Regist>
    </div>
  );
};
export default Register;
