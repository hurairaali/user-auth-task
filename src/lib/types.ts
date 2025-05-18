export interface AuthFormProps {
  type: "signin";
  title: string;
  subtitle: string;
}

export interface SignInValues {
  identifier: string; // This will hold either username or email
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}
