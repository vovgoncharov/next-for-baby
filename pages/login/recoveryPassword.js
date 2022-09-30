import Repeat from "../../components/RepeatPassword/Repeat";
import Head from "next/head";
const Repeatpassword = () => {
  return (
    <>
       <Head>
        <title>Blog for parents</title>
        <meta name="title" content="Blog for parents" />
      </Head>
      <section className="section">
        <Repeat />
      </section>
    </>
  );
};
export default Repeatpassword;
