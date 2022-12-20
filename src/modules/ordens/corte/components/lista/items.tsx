import { Data } from "../../../../../utils/types";
import styles from "../../styles/list.module.css";
import ModalItem from "./modal";

type Item = {
  items: Data;
  value: { code: number; name: string };
  itemsLimit: number;
};

export default function Items({ items, value, itemsLimit }: Item) {
  const handleLayout = (image: string) => {
    if (image) {
      if (image.includes("cloudinary")) {
        return image;
      } else {
        return `https://ngaolrcpscllqpabwqkx.supabase.co/storage/v1/object/public/polyart/${image}`;
      }
    }
  };

  function isLate(deliver_in: string) {
    const date1 = new Date();
    const date2 = new Date(deliver_in);

    const utc1 = Date.UTC(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate()
    );
    const utc2 = Date.UTC(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    );

    const dayMath = 1000 * 60 * 60 * 24;
    const result = Math.floor((utc2 - utc1) / dayMath);

    if (result >= 0) {
      return false;
    }

    return true;
  }

  function UnicItem() {
    return (
      <div className={styles.desktopList}>
        {items &&
          items.map((e, i) => {
            return (
              <div key={e.main_code}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: "max-content max-content max-content",
                  }}
                >
                  <div className={styles.firstRow}>
                    <input
                      className={styles.item}
                      type="text"
                      value={e.main_code || ""}
                      readOnly
                    />

                    <input
                      className={styles.item}
                      type="text"
                      value={e.sub_code || ""}
                      readOnly
                    />

                    <input
                      className={styles.item}
                      type="text"
                      value={e.seller || ""}
                      readOnly
                    />

                    <input
                      className={styles.item}
                      type="text"
                      value={e.line_type || ""}
                      readOnly
                    />

                    <input
                      className={styles.item}
                      type="text"
                      value={e.quantity || ""}
                      readOnly
                    />

                    <input
                      type="text"
                      className={
                        e.status === 16
                          ? styles.delivered
                          : isLate(e.deliver_in)
                          ? styles.isLate
                          : ""
                      }
                      value={dateChange(e.deliver_in) || ""}
                      readOnly
                    />
                  </div>

                  <input
                    type="text"
                    readOnly
                    value={e.client || ""}
                    className={styles.item}
                  />

                  <img
                    style={{ width: "100%" }}
                    src={handleLayout(e.image_path)}
                    alt=""
                  />

                  {e.description ? (
                    <textarea
                      readOnly
                      value={e.description || ""}
                      cols={30}
                      rows={3}
                    />
                  ) : null}

                  {e.observation ? (
                    <textarea
                      readOnly
                      value={e.observation || ""}
                      cols={30}
                      rows={3}
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
      </div>
    );
  }

  function dateChange(value: string) {
    return new Date(value).toLocaleString().split(" ")[0];
  }

  if (items.length > 0) {
    return itemsLimit === 1 ? (
      <UnicItem />
    ) : (
      <div style={{ marginTop: "10px" }}>
        {items &&
          items.map((e, i) => {
            return (
              <div key={e.main_code}>
                <ModalItem element={e} />
              </div>
            );
          })}
      </div>
    );
  }
  return (
    <div>
      <i style={{ color: "red" }}>Não possuímos dados em: {value.name}</i>
    </div>
  );
}
