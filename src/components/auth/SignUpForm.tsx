import { Formik, Form, Field } from "formik";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "../ui/icons";
import GoogleLogo from "../../assets/_Google Logo Icon.svg";
import Checkbox from "../ui/checkbox";
import { signUpSchema } from "../../lib/utils";
import type { AuthCredentials } from "../../lib/types";

export const SignUpForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: AuthCredentials = {
    identifier: "",
    password: "",
    rememberMe: false,
  };

  const handleSubmit = async (values: AuthCredentials) => {
    setIsLoading(true);
    try {
      // TODO: Implement sign up logic
      console.log("Sign up values:", values);
    } catch (err) {
      console.error("Sign up failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="w-full">
          <div className="mb-4">
            <label
              htmlFor="identifier"
              className="block font-medium text-[16px] leading-[32px] text-[#222B33] font-sans"
            >
              Email
            </label>
            <Field
              as={Input}
              id="identifier"
              name="identifier"
              type="email"
              placeholder="Enter your email"
              className={`w-full ${touched.identifier && errors.identifier ? "border-red-500" : ""}`}
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
                className={`w-full ${touched.password && errors.password ? "border-red-500" : ""}`}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="flex items-start mb-4">
            <Checkbox />
          </div>

          <Button
            type="submit"
            size={"lg"}
            variant="green"
            className="w-full mb-4"
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : "Sign Up"}
          </Button>

          <Button
            type="button"
            size={"lg"}
            variant="google"
            className="w-full"
            disabled={true}
          >
            <img src={GoogleLogo} alt="Google" className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>

          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?
            <Link to="/sign-in" className="text-black underline">
              Log in
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};
