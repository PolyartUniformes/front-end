type Buttons = {
  pathname: string;
  name: string;
  icon: JSX.Element;
};

type Data = {
  uuid: string;
  main_code: number;
  sub_code: number;
  created_at: string;
  quantity: number;
  deliver_in: string;
  client: string;
  seller: string;
  line_type: string;
  pilot: boolean;
  package_type: string;
  aplication_type: string;
  description: string;
  observation: string;
  tissues: string;
  image_path: string;
  special_size: number;
  sizes: string;
  size_type: string;
  total: number;
  deleted: boolean;
  delivered: boolean;
  status: number;
}[];

type DataJSON = {
  uuid: string;
  main_code: number;
  sub_code: number;
  created_at: string;
  quantity: number;
  deliver_in: string;
  client: string;
  seller: string;
  line_type: string;
  pilot: boolean;
  package_type: string;
  aplication_type: string;
  description: string;
  observation: string;
  tissues: string;
  image_path: string;
  special_size: number;
  sizes: string;
  size_type: string;
  total: number;
  deleted: boolean;
  delivered: boolean;
  status: number;
};

type Faction = {
  uuid: string;
  parent_uuid: string;
  faccionista: string;
  deliver_at: string;
  price: string;
  quantity: string;
  insumos: string;
  observation: string;
  finished: boolean | null;
  parent_image: string | null;
  parent_code: number | null;
};

type User = [
  {
    created_at: string;
    email: string;
    name: string;
    password: string;
    roles: string;
    uuid: string;
  }
];

export type { Buttons, Data, DataJSON, Faction, User };
