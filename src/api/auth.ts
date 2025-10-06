import axios from "axios";

interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const { data } = await axios.post<LoginResponse>(
    "https://springboot-dklm.onrender.com/api/auth/login",
    payload
  );
  return data;
};
