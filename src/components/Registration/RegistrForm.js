import { useState } from "react";

import { API_HOST } from 'constants/api';
import { axios } from 'services/axios'
import Title from "components/Title";
import Text from "components/Text";
import Input from "components/Input";
import Register from "components/Register/Register";
import styles from "components/Registration/Registration.module.css";

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
    axios.post(`${API_HOST}/create-user`, {
      email,
    })
      .then(({ data }) => {
        setEmail(data);
        setEmail("");

        if (email.length > 5 && arr === "@") {
          setGoemail(true);
        }

        // user will receive email with a link, e.g:
        // http://localhost:3000/login/register?token=LKJSDFskldfoSDLKJOSDfijsdfsdf
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
