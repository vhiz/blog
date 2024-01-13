import LoginForm from "@/components/LoginForm";
import { handleGithubLogin, handleGoogleLogin } from "@/lib/action";
import { FaGithub, FaGoogle } from "react-icons/fa6";
export default function Login() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full lg:w-[50vw] bg-secondary p-8 lg:p-12 flex flex-col text-center gap-7 rounded">
        <div className="w-full flex flex-col gap-3">
          <form action={handleGithubLogin}>
            <button className="bg-primary w-full p-3 text-[0.9rem] gap-2 rounded flex items-center justify-center">
              <FaGithub /> Login with Github
            </button>
          </form>
          <form action={handleGoogleLogin}>
            <button className="bg-primary w-full p-3 text-[0.9rem] gap-2 rounded flex items-center justify-center">
              <FaGoogle color="lightgreen" /> Login with Google
            </button>
          </form>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
