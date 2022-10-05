import styles from "./Form.module.css";
import Input from "../Input";
import Register from "../Register/Register";
import { useState } from "react";
import { useRouter } from "next/router";
import Title from "../Title";
import Text from "../Text";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState("");
  const [eye, setEye] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const arr = password
      .split("")
      .filter(
        (pass) => pass === "@" || pass === "$" || pass === "&" || pass === "#"
      )
      .join("");
    console.log(arr.length);

    if (password === password.toLocaleLowerCase()) {
      return setValid("Пароль должен иметь большую букву!");
    } else if (password.length < 8) {
      return setValid("Пароль должен иметь больше 8 символов!");
    } else if (arr.length === 0) {
      return setValid("Пароль должен иметь один из символов @,#,$,&.");
    }
    fetch("http://localhost:5000/admission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // data => { access_token: 'JWT token', refresh_token: 'sting' }
        if (data) {
          setEmail(data);
          setPassword(data);
          setPassword("");
          setEmail("");
          router.push("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setValid("");
  };

  const handleIconClick = () => {
    setEye(!eye);
  };

  return (
    <form onSubmit={handleFormSubmit} className="form">
      <Title>Вход</Title>
      <Text>
        Добро пожаловать!<br></br> Ввойдите в Ваш аккаунт.
      </Text>
      <fieldset className="inputs">
        <Input
          value={email}
          onChange={handleEmailChange}
          name="email"
          type="email"
          placeholder="Почта"
          className="email"
          required="Поле обязательно к заполнению"
        />
        <div className={styles.block__password}>
          {eye ? (
            <Input
              value={password}
              onChange={handlePasswordChange}
              name="password"
              type="text"
              placeholder="Пароль"
              className="password"
              required="Поле обязательно к заполнению"
            />
          ) : (
            <Input
              value={password}
              onChange={handlePasswordChange}
              name="password"
              type="password"
              placeholder="Пароль"
              className="password"
              required="Поле обязательно к заполнению"
            />
          )}
          {eye ? (
            <AiOutlineEye className="fa-eye" onClick={handleIconClick} />
          ) : (
            <AiOutlineEyeInvisible
              className="fa-eye"
              onClick={handleIconClick}
            />
          )}
        </div>

        <div className="valid">{valid}</div>
        <div className={styles.block__label}>
          <label htmlFor="checkbox" className={styles.label}>
            <Input
              name="checkbox"
              id="checkbox"
              type="checkbox"
              className={styles.checkbox}
            />
            <span className={styles.fake__check}></span>
            <span className={styles.check}>Запомнить меня</span>{" "}
          </label>
          <Link href="/login/recoveryPost">
            <a className={styles.forget__pass}>Забыли пароль?</a>
          </Link>
        </div>
        <Input type="submit" value="Войти" className="button" />
        <Register path="/login/registerPost" text="Зарегистрироваться">
          Новый пользователь?
        </Register>
      </fieldset>
    </form>
  );
};
export default Form;
