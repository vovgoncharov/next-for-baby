import NewUser from "components/Register/NewUser";
import Regist from "components/Register/Regist";
import styles from "components/Register/Register.module.css";

const Register = (props) => {
  return (
    <div className={styles.block__register}>
      <NewUser className={styles.span}>{props.children}</NewUser>
      <Regist path={props.path} className={styles.register}>{props.text}</Regist>
    </div>
  );
};
export default Register;
