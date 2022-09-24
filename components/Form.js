import styles from "./Form.module.css";
import Input from "./Input";
import { useState } from "react";
const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <h4 className={styles.title}>Вход</h4>
      <p className={styles.text}>
        Добро пожаловать!<br></br> Ввойдите в Ваш аккаунт.
      </p>
      <fieldset className={styles.inputs}>
        <Input
          value={email}
          onChange={handleEmailChange}
          name="email"
          type="email"
          placeholder="Почта"
          className={styles.email}
        />
        <Input
          value={password}
          onChange={handlePasswordChange}
          name="password"
          type="password"
          placeholder="Пароль"
          className={styles.password}
        />
        <div className={styles.block__lebel}>
          <label htmlFor="checkbox" className={styles.label}>
            <input
              name="checkbox"
              id="checkbox"
              type="checkbox"
              className={styles.checkbox}
            />
            <span className={styles.fake__check}></span>
            <span className={styles.check}>Запомнить меня</span>{" "}
          </label>
          <a href="#" className={styles.forget__pass}>
            Забыли пароль?
          </a>
        </div>
        <Input type="submit" value="Войти" className={styles.button} />
        <span className={styles.span}>Новый пользователь?</span>
        <a href="#" className={styles.register}>
          Зарегистрироваться
        </a>
      </fieldset>
    </form>
  );
};
export default Form;
