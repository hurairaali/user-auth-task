import { createContext, useContext, useState, type ReactNode } from "react";
import type { AuthCredentials, AuthResponse } from "../lib/types";
import axios, { AxiosError } from "axios";

const authURL =
  (import.meta.env.VITE_API_URL || "https://dummyjson.com") + "/auth/login";

const authService = {
  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(authURL, {
      username: username,
      password: password,
    });
    return response.data;
  },
};

interface AuthContextType {
  user: AuthResponse | null;
  isAuthenticated: boolean;
  signIn: (values: AuthCredentials) => Promise<void>;
  signOut: () => void;
  error: string | null;
}

interface AuthState {
  user: AuthResponse | null;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<AuthState>(() => {
    const savedUser = localStorage.getItem("user");
    return {
      user: savedUser ? JSON.parse(savedUser) : null,
      error: null,
    };
  });

  const signIn = async (values: AuthCredentials) => {
    try {
      const userData = await authService.login(
        values.identifier,
        values.password
      );
      localStorage.setItem("user", JSON.stringify(userData));
      setState({ user: userData, error: null });
    } catch (err) {
      const errorMessage =
        err instanceof AxiosError
          ? err.response?.data?.message || err.message
          : "An error occurred during sign in";
      setState((prev) => ({ ...prev, error: errorMessage }));
      throw new Error(errorMessage);
    }
  };

  const signOut = () => {
    localStorage.removeItem("user");
    setState({ user: null, error: null });
  };

  const contextValue = {
    user: state.user,
    isAuthenticated: !!state.user,
    signIn,
    signOut,
    error: state.error,
  };

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
