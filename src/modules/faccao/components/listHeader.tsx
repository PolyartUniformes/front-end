import styles from "../styles/list.module.css";
import optionsSchema from "../utils/options.json";
import { BsCloudDownload, BsSearch } from "react-icons/bs";
import { ListContent } from "./listContent";
import { useState, useRef, ChangeEvent } from "react";

type List = {
  itemsLimit: number;
};

type Filter = {
  code: number;
  name: string;
};

function ListHeader({ itemsLimit }: List) {
  const [update, setUpdate] = useState(false);
  const [filter, setFilter] = useState<Filter>({ code: 0, name: "Todas" });
  const [toSearch, setToSearch] = useState<string>("");

  const searchValue = useRef<HTMLInputElement>(null);

  function updateList() {
    setUpdate((c) => !c);
    setToSearch("");
  }

  function handleFilter(event: ChangeEvent<HTMLSelectElement>) {
    const eventObject = event.target.value.split(",");
    setFilter({ code: parseInt(eventObject[0]), name: eventObject[1] });
  }

  function handleSearch() {
    setToSearch(searchValue.current?.value.toUpperCase() || "");
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
        <select onChange={handleFilter}>
          {optionsSchema.map((element, index) => {
            return (
              <optgroup key={index} label={element.label}>
                {element.categories.map((e) => {
                  return (
                    <option key={e.code} value={`${e.code},${e.name}`}>
                      {e.name}
                    </option>
                  );
                })}
              </optgroup>
            );
          })}
        </select>
      </div>
      <ListContent
        update={update}
        filter={filter}
        value={toSearch}
        itemsLimit={itemsLimit}
      />
    </div>
  );
}

export { ListHeader };
