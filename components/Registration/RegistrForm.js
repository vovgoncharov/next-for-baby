import Title from "../Title";
import Text from "../Text";
import Input from "../Input";
import { useState } from "react";
import Register from "../Register/Register";
import styles from "./Registration.module.css";

const RegistrForm = () => {
  const [email, setEmail] = useState("");
  const [goemail, setGoemail] = useState(false);
  console.log(email);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const arr = email
      .split("")
      .filter((e) => e === "@")
      .join("");
    fetch("http://localhost:5000/registerPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setEmail(data);
          setEmail("");
          if (email.length > 5 && arr === "@") {
            setGoemail(true);
          }
        }
      })
      .catch((error) => {
        console.error(error);
        setGoemail(false);
      });
  };
  const handleCloseClick = () => {
    setGoemail(!goemail);
  };
  return (
    <>
      <form onSubmit={handleFormSubmit} className="form">
        <Title>Создать аккаунт</Title>
        <Text>
          Укажите электронную почту, чтобы<br></br> мы могли отправить Вам
          ссылку для<br></br>
          подтверждения
        </Text>
        <fieldset className="inputs">
          <Input
            value={email}
            onChange={handleEmailChange}
            name="email"
            type="email"
            placeholder="Почта"
            className="email regist-email"
            required="Поле обязательно к заполнению"
          />
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
      <div className={goemail ? styles.block__gomail : styles.block__hide}>
        <div className={styles.close} onClick={handleCloseClick}></div>
        <p className={styles.text}>
          Для успешной регистрации перейдите по ссылке отправленной на Вашу
          электронную почту.
        </p>
      </div>
    </>
  );
};
export default RegistrForm;
