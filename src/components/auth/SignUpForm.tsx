import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "../ui/icons";
import GoogleLogo from "../../assets/_Google Logo Icon.svg";

export const SignUpForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block font-medium text-[16px] leading-[32px] text-[#222B33] font-sans"
        >
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          className="w-full"
          disabled
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block font-medium text-[16px] leading-[32px] text-[#222B33] font-sans"
        >
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full"
            disabled
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>

      <div className="flex items-start mb-4">
        <label className="relative flex items-start cursor-pointer">
          <input type="checkbox" className="peer sr-only" disabled />
          <div className="relative h-6 w-6 cursor-not-allowed rounded-md border border-gray-400 transition-all peer-checked:border-green-400 peer-checked:bg-green-400 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="ml-3 text-sm text-gray-600">
            I agree to the{" "}
            <a href="#" className="text-black underline">
              terms of use
            </a>
            and
            <a href="#" className="text-black underline">
              privacy statement
            </a>
          </p>
        </label>
      </div>

      <Button
        type="button"
        size={"lg"}
        variant="green"
        className="w-full mb-4"
        disabled
      >
        Sign Up
      </Button>

      <Button
        type="button"
        size={"lg"}
        variant="google"
        className="w-full"
        disabled
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
    </div>
  );
};
