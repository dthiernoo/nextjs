import Link from "next/link";

export default function Home() {
  return (
    <>
    <h1 className="m-[50px]">Intercepting Routes</h1>
    <Link className="text-blue-700" href="/login">Login</Link> <br />
    <Link  className="text-blue-700" href="/register">Register</Link> <br />
    <Link  className="text-blue-700" href="/blog">Blog</Link>
    </>
  );
}
