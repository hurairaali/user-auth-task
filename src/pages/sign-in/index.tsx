import { AuthLayout } from "../../components/auth/AuthLayout";
import { SignInForm } from "../../components/auth/SignInForm";
import SignInBg from "../../assets/signIn-screen.jpg";

const SignIn: React.FC = () => {
  return (
    <>
      <AuthLayout
        title="Welcome back"
        subtitle="You need to be signed in to access the project dashboard."
        backgroundImage={SignInBg}
      >
        <SignInForm />
      </AuthLayout>
    </>
  );
};
export default SignIn;
