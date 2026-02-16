
import ForgetPasswordHero from "../components/forget-password/forgetPasswordHero";
import ForgetPasswordForm from "../components/forget-password/forgetPasswordForm";

export default function ForgetPasswordScreen() {
  

  return (
    <div className="forget-password-screen bg-white min-h-[80vh]">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-1 items-center">
        {/* Left Hero Section */}
        <ForgetPasswordHero />
        {/* Right Form Section */}
        <ForgetPasswordForm/>
      </div>
    </div>
  );
}
