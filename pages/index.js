import Head from "next/head";
import Link from "next/link";
const Home = () => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,500;0,600;0,700;1,800&display=swap"
          rel="stylesheet"
        />
        <title>Blog for parents</title>
        <meta name="title" content="Blog for parents" />
      </Head>

      <h2>Title</h2>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </>
  );
};
export default Home;
