import { Formik, Form, Field } from "formik";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signInSchema } from "../../lib/utils";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
import { EyeIcon, EyeSlashIcon } from "../ui/icons";
import type { SignInValues } from "../../lib/types";
import GoogleLogo from "../../assets/_Google Logo Icon.svg";
import Checkbox from "../ui/checkbox";

export const SignInForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, error: authError } = useAuth();
  const navigate = useNavigate();

  const initialValues: SignInValues = {
    identifier: "",
    password: "",
    rememberMe: false,
  };

  const handleSubmit = async (values: SignInValues) => {
    setIsLoading(true);
    try {
      await signIn(values);
      navigate("/");
    } catch (err) {
      console.error("Sign in failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="w-full">
          {authError && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
              {authError}
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="identifier"
              className="block font-medium text-[16px] leading-[32px] text-[#222B33] font-sans"
            >
              Email or username
            </label>
            <Field
              as={Input}
              id="identifier"
              name="identifier"
              type="text"
              placeholder="Enter your username or email"
              className={`w-full ${
                touched.identifier && errors.identifier ? "border-red-500" : ""
              }`}
            />
            {touched.identifier && errors.identifier && (
              <p className="mt-1 text-sm text-red-500">{errors.identifier}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-medium text-[16px] leading-[32px] text-[#222B33] font-sans"
            >
              Password
            </label>
            <div className="relative">
              <Field
                as={Input}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`w-full ${
                  touched.password && errors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between mb-6">
            <Checkbox />

            <Link
              to="/"
              className="text-[16px] font-medium text-black underline font-sans "
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            size={"lg"}
            variant="green"
            className="w-full mb-4"
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : "Sign In"}
          </Button>

          <Button
            type="button"
            variant="google"
            className="w-full"
            disabled={true}
            size={"lg"}
            onClick={() => {
              /* Handle Google sign in */
            }}
          >
            <img
              src={GoogleLogo}
              alt="Google"
              className="w-5 h-5 mr-2 font-sans"
            />
            Continue with Google
          </Button>

          {/* for the now will not navigate to sign-up page  */}
          <div className="flex flex-row items-center justify-center mt-8 gap-1">
            <p className="text-sm text-gray-600 text-center font-sans">
              Haven't joined yet?
            </p>
            <Link to="/" className="text-black underline text-sm">
              Sign up
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};
