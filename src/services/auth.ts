import { post, get } from "./api";

const login = async (name: string, password: string) => {
  return await post("auth/", { name, password });
};

const me = async () => {
  return await get("auth/me");
};

export { login, me };
