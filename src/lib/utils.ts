import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as yup from "yup";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const signInSchema = yup.object().shape({
  identifier: yup
    .string()
    .required("Username or email is required")
    .test("isValidIdentifier", "Enter a valid username or email", (value) => {
      if (!value) return false;
      // Check if it's a valid email
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      // Check if it's a valid username (alphanumeric with underscores, 3-20 chars)
      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

      return emailRegex.test(value) || usernameRegex.test(value);
    }),
  password: yup.string().required("Password is required"),
  rememberMe: yup.boolean(),
});
