import Title from "../Title";
import Text from "../Text";
import Input from "../Input";
import Register from "../Register/Register";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./CreateAccount.module.css";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordrepeat, setPasswordrepeat] = useState("");
  const [valid, setValid] = useState("");
  const [eye, setEye] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const router = useRouter();

  const handleIconClick = () => {
    setEye(!eye);
  };
  const handleIconClickRepeat = () => {
    setRepeat(!repeat);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordRepeatChange = (e) => {
    setPasswordrepeat(e.target.value);
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

    if (!name) {
      return setValid("Пожалуйста введите имя!");
    }
    if (!password) {
      return setValid("Пожалуйста введите пароль!");
    } else if (password === password.toLocaleLowerCase()) {
      return setValid("Пароль должен иметь большую букву!");
    } else if (password.length < 8) {
      return setValid("Пароль должен иметь больше 8 символов!");
    } else if (arr.length === 0) {
      return setValid("Пароль должен иметь один из символов @,#,$,&.");
    } else if (password !== passwordrepeat) {
      return setValid("Пароли не совпадают");
    }
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && !data.error) {
          setName(data);
          setPassword(data);
          setPassword("");
          setName("");
          setPasswordrepeat("");
          router.push("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    setValid("");
  };
  return (
    <form onSubmit={handleFormSubmit} className="form">
      <Title>Создать аккаунт</Title>
      <Text>Ваша почта подтвержена</Text>
      <fieldset className="inputs">
        <Input
          value={name}
          onChange={handleNameChange}
          name="name"
          type="name"
          placeholder="Имя и фамилия"
          className="input__name  regist-email"
          required="Поле обязательно к заполнению"
        />
        <p className={styles.text}>*Минимум 8 символов</p>
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
        <div className={styles.block__password}>
          {repeat ? (
            <Input
              value={passwordrepeat}
              onChange={handlePasswordRepeatChange}
              name="password"
              type="text"
              placeholder="Повторите пароль"
              className="password"
              required="Поле обязательно к заполнению"
            />
          ) : (
            <Input
              value={passwordrepeat}
              onChange={handlePasswordRepeatChange}
              name="password"
              type="password"
              placeholder="Повторите пароль"
              className="password"
              required="Поле обязательно к заполнению"
            />
          )}
          {repeat ? (
            <AiOutlineEye className="fa-eye" onClick={handleIconClickRepeat} />
          ) : (
            <AiOutlineEyeInvisible
              className="fa-eye"
              onClick={handleIconClickRepeat}
            />
          )}
        </div>
        <div className="valid">{valid}</div>
        <Input
          type="submit"
          value="Зарегистрироваться"
          className="button regist-button"
        />
        <Register path="/login" text="Войти">
          Есть аккаунт?
        </Register>
      </fieldset>
    </form>
  );
};
export default CreateAccount;
