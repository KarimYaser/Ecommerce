import LoginHero from "../components/login/loginHero";
import LoginForm from "../components/login/loginForm";

export default function LoginScreen() {
  return (
    <>
      <div className="login-screen bg-white">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-1">
          <LoginHero />
          <LoginForm />
        </div>
      </div>
    </>
  );
}
