import PasswordRestoration from "components/PasswordRestoration/PasswordRestoration";
import Head from "next/head";
const Password = () => {
  return (
    <>
      <Head>
        <title>Blog for parents</title>
        <meta name="title" content="Blog for parents" />
      </Head>
      <section className="section">
        <PasswordRestoration />
      </section>
    </>
  );
};
export default Password;
