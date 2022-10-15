import styles from "components/Form/Form.module.css";
import Input from "components/Input";
import Register from "components/Register/Register";
import { API_HOST } from 'constants/api';
import { useState } from "react";
import { useRouter } from "next/router";
import Title from "components/Title";
import Text from "components/Text";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { axios } from 'services/axios';
import { AUTH_TOKEN_KEY, setLocalStorageKey } from 'services/storage';
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
    axios.post(`${API_HOST}/login`, { email, password })
      .then(({ data }) => {
        console.log('data: ', data)
        setLocalStorageKey(AUTH_TOKEN_KEY, data.access_token)
        window.open("/", '_self')
        // router.push("/");
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
