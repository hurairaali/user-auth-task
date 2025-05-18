import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { SignInValues, AuthResponse } from "../lib/types";
import axios from "axios";

interface AuthContextType {
  user: AuthResponse | null;
  isAuthenticated: boolean;
  signIn: (values: SignInValues) => Promise<void>;
  signOut: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthResponse | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [error, setError] = useState<string | null>(null);

  const signIn = async (values: SignInValues) => {
    try {
      // Convert the identifier to either username or email based on format
      const isEmail = values.identifier.includes("@");
      const loginPayload = {
        [isEmail ? "email" : "username"]: values.identifier,
        password: values.password,
      };

      const response = await axios.post<AuthResponse>(
        "https://dummyjson.com/auth/login",
        loginPayload
      );

      setUser(response.data);
      setError(null);
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "An error occurred during sign in";
      setError(message);
      throw new Error(message);
    }
  };

  const signOut = () => {
    setUser(null);
    setError(null);
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    } else {
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [user]);

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      signIn,
      signOut,
      error,
    }),
    [user, error]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
