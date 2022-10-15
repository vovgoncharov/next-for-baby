
import RegistrForm from "components/Registration/RegistrForm";
import Head from "next/head";
const Registration = () => {
  return (
    <>
       <Head>
        <title>Blog for parents</title>
        <meta name="title" content="Blog for parents" />
      </Head>
      <section className="section">
        <RegistrForm />
      </section>
    </>
  );
};
export default Registration;
