type Environment = {
  API_URL: string;
};

export const env: Environment = {
  API_URL: import.meta.env.VITE_API_URL,
};
