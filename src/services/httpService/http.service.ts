import axios from "axios";

const httpService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export { httpService };
