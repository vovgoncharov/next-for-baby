import Link from "next/link";
const Regist = (props) => {
  return (
    <Link href={`${props.path}`}>
      <a className={props.className}>{props.children}</a>
    </Link>
  );
};
export default Regist;
