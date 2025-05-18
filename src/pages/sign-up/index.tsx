import type { FC } from "react";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { SignUpForm } from "../../components/auth/SignUpForm";
import signUpScreen from "../../assets/signup-screen.jpg";

const SignUp: FC = () => {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Enter your details to create your account"
      backgroundImage={signUpScreen}
    >
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUp;
