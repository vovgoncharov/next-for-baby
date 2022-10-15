import RestorationCode from "components/RestorationCode/RestorationCode";
import Head from "next/head";
const Restoration = () => {
  return (
    <>
      <Head>
        <title>Blog for parents</title>
        <meta name="title" content="Blog for parents" />
      </Head>
      <section className="section">
        <RestorationCode />
      </section>
    </>
  );
};
export default Restoration;
