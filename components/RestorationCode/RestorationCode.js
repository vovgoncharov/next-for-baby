import Title from "../Title";
import Text from "../Text";
import Input from "../Input";
import { useState } from "react";
import { useRouter } from "next/router";
const RestorationCode = () => {
  const [code, setCode] = useState("");
  const [valid, setValid] = useState("");
  const router = useRouter();
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (code.length < 5) {
      return setValid("Код должен иметь более 5 символов");
    }
    fetch("http://localhost:5000/passwordRecoveryCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCode(data);
        setCode("");
        router.push("/login/recoveryPassword");
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
        Для восстановления пароля введите<br></br> код который был отправлен на
        <br></br> электронную почту
      </Text>
      <fieldset className="inputs">
        <Input
          value={code}
          onChange={handleCodeChange}
          name="email"
          type="text"
          placeholder="Код"
          className="email regist-email"
        />
        <p className="valid">{valid}</p>
        <Input
          type="submit"
          value="Отправить"
          className="button regist-button button-margin"
        />
        <p className="restoration-text">Отправить код повторно</p>
      </fieldset>
    </form>
  );
};
export default RestorationCode;
