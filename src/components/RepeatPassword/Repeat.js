import Title from "components/Title";
import Text from "components/Text";
import Input from "components/Input";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "components/RepeatPassword/Repeat.module.css";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
const Repeat = () => {
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
    fetch("http://localhost:5000/password-set", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPassword(data);
        setPassword("");
        router.push("/login");
      })
      .catch((error) => {
        console.error(error);
      });
    setPasswordrepeat("");
    setValid("");
  };
  return (
    <form onSubmit={handleFormSubmit} className="form">
      <Title>Восстановление пароля</Title>
      <Text>Код подтвержден</Text>
      <fieldset className="inputs">
        <p className={styles.text}>*Минимум 8 символов</p>
        <div className={styles.block__password}>
          {eye ? (
            <Input
              value={password}
              onChange={handlePasswordChange}
              name="password"
              type="text"
              placeholder="Новый пароль"
              className="password"
            />
          ) : (
            <Input
              value={password}
              onChange={handlePasswordChange}
              name="password"
              type="password"
              placeholder="Новый пароль"
              className="password"
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
              placeholder="Повторите новый пароль"
              className="password"
            />
          ) : (
            <Input
              value={passwordrepeat}
              onChange={handlePasswordRepeatChange}
              name="password"
              type="password"
              placeholder="Повторите новый пароль"
              className="password"
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
          value="Сохранить"
          className="button regist-button"
        />
      </fieldset>
    </form>
  );
};
export default Repeat;
