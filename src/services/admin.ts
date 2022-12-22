import { get, post } from "./api";

const createUser = async (
  name: string,
  email: string,
  password: string,
  roles: string
) => {
  return await post("createUser/", { name, email, password, roles });
};

const deleteUser = async (uuid: string) => {
  return await post("deleteUser/", uuid);
};

const getUsers = async () => {
  return await get("getUsers/");
};

class Admin {
  async update(user: any) {
    const response = await post("admin/update/", { user });
    const data = await response.json();
    return alert(data);
  }

  async transfer() {
    const response = await get("admin/transfer");
    const data = await response.json();
    return alert(data);
  }

  async me(uuid: string) {
    const response = await post("admin/me/", { uuid });
    return await response.json();
  }
}

const admin = new Admin();

export { createUser, deleteUser, getUsers, admin };
