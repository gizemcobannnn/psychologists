import { LuSearchX } from "react-icons/lu";

export default function NotFoundPage() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>Please check the URL or return to the home page.</p>
      <LuSearchX className="text-4xl mt-5"></LuSearchX>
    </div>
  )
}
