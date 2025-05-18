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
            <label className="flex items-center">
              <Field
                type="checkbox"
                name="rememberMe"
                className="sr-only peer"
              />
              <div className="w-6 h-6 rounded-sm border border-gray-400 bg-white flex items-center justify-center transition-colors peer-checked:bg-green-400 peer-checked:border-transparent">
                <svg
                  className="w-4 h-4 text-white hidden peer-checked:block"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="ml-2 text-sm text-gray-600">
                Keep me signed in
              </span>
            </label>
            <Link to="/" className="text-sm text-black underline">
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
            <img src={GoogleLogo} alt="Google" className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>

          {/* for the now will not navigate to sign-up page  */}

          <p className="text-sm text-gray-600 mt-8 text-center">
            Haven't joined yet?
            <Link to="/" className="text-black underline">
              Sign up
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};
