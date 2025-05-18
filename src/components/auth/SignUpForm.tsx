import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "../ui/icons";
import GoogleLogo from "../../assets/_Google Logo Icon.svg";
import Checkbox from "../ui/checkbox";

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
        <Checkbox />
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
