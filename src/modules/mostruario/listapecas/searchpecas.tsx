import { useState, useRef } from "react";
import styles from "../styles/list.module.css";
import { BsCloudDownload, BsSearch } from "react-icons/bs";
import { Middleware } from "./middlewarepecas";

const Search = () => {
  const [update, setUpdate] = useState(false);
  const [value, setValue] = useState<string>("");

  const searchValue = useRef<HTMLInputElement>(null);

  function updateList() {
    setUpdate((c) => !c);
    setValue("");
  }

  function handleSearch() {
    setValue(searchValue.current?.value.toUpperCase() || "");
  }

  return (
    <div className={styles.listBox}>
      <div className={styles.listButtons}>
        <button onClick={updateList} title="ATUALIZAR">
          <BsCloudDownload />
        </button>
        <div className={styles.searchField}>
          <input type="text" placeholder="Pesquise..." ref={searchValue} />
          <button onClick={handleSearch}>
            <BsSearch />
          </button>
        </div>
      </div>
      <Middleware update={update} value={value} />
    </div>
  );
};

export { Search };
