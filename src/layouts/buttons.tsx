import {
  BsHouse,
  BsScissors,
  BsCart3,
  BsJournalText,
  BsGrid3X3Gap,
  BsInboxes,
  BsMap,
  BsGear,
  BsCollection,
} from "react-icons/bs";

const buttons = [
  { pathname: "/", name: "home", icon: <BsHouse size={17} /> },

  {
    pathname: "/ordens-de-corte",
    name: "ordens de corte",
    icon: <BsScissors size={17} />,
  },

  {
    pathname: "/compras",
    name: "ordens de compra",
    icon: <BsCart3 size={17} />,
  },

  { pathname: "/faccao", name: "facção", icon: <BsJournalText size={17} /> },

  { pathname: "/mapa", name: "mapa", icon: <BsMap size={17} /> },

  { pathname: "/catalogo", name: "catálogo", icon: <BsGrid3X3Gap size={17} /> },

  { pathname: "/estoque", name: "estoque", icon: <BsInboxes size={17} /> },

  {
    pathname: "/mostruario",
    name: "mostruario",
    icon: <BsCollection size={17} />,
  },

  { pathname: "/admin", name: "admin", icon: <BsGear size={17} /> },
];

export default buttons;
