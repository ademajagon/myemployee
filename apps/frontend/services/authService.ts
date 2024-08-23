import axios from 'axios';

export const login = async (username: string, password: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    {
      username,
      password,
    }
  );
  return response.data;
};

export const register = async (username: string, password: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
    {
      username,
      password,
    }
  );
  return response.data;
};

export const getEmployees = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/employees`
  );
  return response.data;
};
