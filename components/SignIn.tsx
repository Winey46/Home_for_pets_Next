import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="w-[960px] flex flex-col my-6 items-center max-lg:w-[610px] max-sm:w-[360px]">
      <h2 className="w-80% text-center">Sign In</h2>
      <Input
        className="input"
        placeholder="Enter your login"
        label="Login"
        type="email"
      />
      <Input
        className="input"
        placeholder="Enter your password"
        label="Password"
        type="password"
      />
      <div className="w-[80%]">
        <Button className="self-start button yellow">Sign in</Button>
      </div>
      <p className="w-[80%] text-end">Not a member yet? <Link
        href="/app/signUp/page"
        className="text-[#833de7] underline hover:text-[#fbc43c]"
      >
        Sign Up here
      </Link>
      </p>
    </div>
  )
}