import { Sign } from "crypto";
import SignupHero from "../components/signup/signupHero";
import SignupForm from "../components/signup/signupForm";

export default function signupScreen() {
  return (
    <>
      <div className="signup-screen bg-gray-100/50 ">
        <div className="container  grid grid-cols-1 md:grid-cols-2 gap-2">
          <SignupHero />
          <SignupForm />
        </div>
      </div>
    </>
  );
}
