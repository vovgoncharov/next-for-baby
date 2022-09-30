import CreateAccount from "../../components/CreateAccount/CreateAccount";
import Head from "next/head";
const Account = () => {
  return (
    <>
       <Head>
        <title>Blog for parents</title>
        <meta name="title" content="Blog for parents" />
      </Head>
      <section className="section">
        <CreateAccount />
      </section>
    </>
  );
};
export default Account;
