import Title from "components/Title";
import Text from "components/Text";
import Input from "components/Input";
import { useRouter } from "next/router";
import { useState } from "react";
const PasswordRestoration = () => {
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState("");
  const router = useRouter();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (email.length < 1) {
      return setValid("Введите почту");
    }
    fetch("http://localhost:5000/password-recovery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && !data.error) {
          setEmail(data);
          setEmail("");
          router.push("/login/recoveryCode");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setValid("");
  };
  return (
    <form onSubmit={handleFormSubmit} className="form">
      <Title>Восстановление пароля</Title>
      <Text>
        Укажите электронную почту, чтобы<br></br> мы могли отправить Вам код для
        <br></br>
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
        />
        <p className="valid">{valid}</p>
        <Input
          type="submit"
          value="Отправить"
          className="button regist-button"
        />
      </fieldset>
    </form>
  );
};
export default PasswordRestoration;
