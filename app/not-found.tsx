import Link from "next/link";

const NotFoundPage = () => {
  return (
    <>
      <h1 className="error-status">Not found</h1>
      <p className="error-text">Unfortunately, we could not find the requested page or resource.</p>
      <Link href="/" className="button yellow">Home page</Link>
    </>
  )
}

export default NotFoundPage;