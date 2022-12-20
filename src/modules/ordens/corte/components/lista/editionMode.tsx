import { useState, useEffect, ChangeEvent } from "react";

import styles from "../../styles/modal.module.css";

import tissuesSchema from "../../utils/tissues.json";
import sizesSchema from "../../utils/sizes.json";

import { handleEdition } from "./functions/handleEdition";
import { uploadFile } from "./functions/handleUpload";
import { setStatus } from "./functions/handleStatus";

import { DataJSON } from "../../../../../utils/types";

type Element = {
  element: DataJSON;
  save: boolean;
};

export default function CuttingEdit({ element, save }: Element) {
  function dateChange(value: string) {
    return new Date(value).toLocaleString().split(" ")[0];
  }

  const tissues = element.tissues.split(",");

  const [sizeType, setSizeType] = useState<string[]>([]);

  const sizes = element.sizes.split(",");

  useEffect(() => {
    switch (element.size_type) {
      case "UNISEX":
        setSizeType(sizesSchema.unisex.split(","));
        break;
      case "FEMININA":
        setSizeType(sizesSchema.feminina.split(","));
        break;
      case "INFANTIL":
        setSizeType(sizesSchema.infantil.split(","));
        break;
      case "CALCA":
        setSizeType(sizesSchema.calca.split(","));
        break;
      case "UNICO":
        setSizeType(sizesSchema.unico.split(","));
        break;

      default:
        setSizeType(sizesSchema.masculina.split(","));
        break;
    }

    async function saveEdition() {
      const response = await handleEdition(newItem);
      alert(response);
    }

    if (save) {
      saveEdition();
    }
  }, [element.size_type, save]);

  const [newTissues, setNewTissues] = useState(element.tissues.split(","));

  const [newItem, setNewItem] = useState({
    uuid: element.uuid,
    sub_code: element.sub_code ? element.sub_code : 0,
    main_code: element.main_code,
    created_at: element.created_at,
    deleted: element.deleted,
    delivered: element.delivered,
    quantity: element.quantity ? element.quantity : 0,
    deliver_in: element.deliver_in ? element.deliver_in.toString() : "",
    client: element.client ? element.client : "",
    seller: element.seller ? element.seller : "",
    line_type: element.line_type ? element.line_type : "",
    pilot: element.pilot ? element.pilot : false,
    package_type: element.package_type ? element.package_type : "",
    aplication_type: element.aplication_type ? element.aplication_type : "",
    description: element.description ? element.description : "",
    observation: element.observation ? element.observation : "",
    tissues: element.tissues ? element.tissues : "",
    image_path: element.image_path ? element.image_path : "",
    special_size: element.special_size ? element.special_size : 0,
    sizes: element.sizes ? element.sizes : newTissues.toString(),
    size_type: element.size_type ? element.size_type : "",
    total: element.total ? element.total : 0,
    status: element.status ? element.status : 5,
  });

  const [newSizes, setNewSizes] = useState(element.sizes.split(","));

  async function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index: number | null
  ) {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "tissues" && index !== null) {
      let tissue = [...newTissues];
      tissue[index] = value === "" ? "NONE" : value.toUpperCase();
      setNewTissues(tissue);
      setNewItem({
        ...newItem,
        ["tissues"]: tissue.toString(),
      });
    } else if (name === "sizes" && index !== null) {
      let size = [...newSizes];
      size[index] = value;
      setNewSizes(size);
      setNewItem({ ...newItem, ["sizes"]: size.toString() });
    } else if (name === "image") {
      let response = await uploadFile(
        (event.target as HTMLInputElement).files?.[0]
      );
      if (response.path) {
        setNewItem({ ...newItem, ["image_path"]: response.path });
      } else {
        setNewItem({ ...newItem, ["image_path"]: element.image_path });
      }
    } else {
      setNewItem({ ...newItem, [name]: value.toUpperCase() });
    }
  }

  return (
    <div className={styles.modalContent}>
      <div className={styles.modalLines}>
        <div className={styles.modalLineOfInputs}>
          <div>
            <label>Nº do Pedido</label>
            <input
              type="number"
              name="sub_code"
              onChange={(e) => handleChange(e, null)}
              defaultValue={element.sub_code || ""}
            />
          </div>
          <div>
            <label>Quantidade</label>
            <input
              type="number"
              name="quantity"
              onChange={(e) => handleChange(e, null)}
              defaultValue={element.quantity || ""}
            />
          </div>
          <div>
            <label>Data de Entrega</label>
            <input
              type="date"
              name="deliver_in"
              onChange={(e) => handleChange(e, null)}
              defaultValue={dateChange(element.deliver_in)}
            />
          </div>
        </div>

        <div className={styles.modalLineOfInputs}>
          <div>
            <label>Cliente</label>
            <input
              type="text"
              name="client"
              onChange={(e) => handleChange(e, null)}
              defaultValue={element.client || ""}
            />
          </div>
          <div>
            <label>Vendedor</label>
            <input
              type="text"
              name="seller"
              onChange={(e) => handleChange(e, null)}
              defaultValue={element.seller || ""}
            />
          </div>
          <div>
            <label>Linha</label>
            <select name="line_type" onChange={(e) => handleChange(e, null)}>
              <option value={element.line_type}>{element.line_type}</option>
              <option value="SOCIAL">Social</option>
              <option value="MALHA">Malha</option>
              <option value="JAQUETA">Jaqueta</option>
              <option value="OPERACIONAL">Operacional</option>
              <option value="BONE">Boné</option>
            </select>
          </div>
        </div>

        <div className={styles.modalLineOfInputs}>
          <div>
            <label>Piloto</label>
            <select name="pilot" onChange={(e) => handleChange(e, null)}>
              <option value={element.pilot ? "SIM" : "NÃO"}>
                {element.pilot ? "SIM" : "NÃO"}
              </option>
              <option value="SIM">Sim</option>
              <option value="NAO">Não</option>
            </select>
          </div>
          <div>
            <label>Embalagem</label>
            <select name="package_type" onChange={(e) => handleChange(e, null)}>
              <option value={element.package_type}>
                {element.package_type}
              </option>
              <option value="CAIXA">Caixa</option>
              <option value="SACOLA">Sacola</option>
            </select>
          </div>
          <div>
            <label>Aplicação</label>
            <select
              name="aplication_type"
              onChange={(e) => handleChange(e, null)}
            >
              <option value={element.aplication_type}>
                {element.aplication_type}
              </option>
              <option value="SILK">Silk</option>
              <option value="BORDADO">Bordado</option>
              <option value="SUBLIMACAO">Sublimação</option>
            </select>
          </div>
        </div>

        <div className={styles.modalLineOfTissues}>
          {tissuesSchema.map((element, index) => {
            return (
              <div key={index}>
                <label>{element.name}</label>
                <input
                  type="text"
                  name="tissues"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={tissues[index]}
                />
              </div>
            );
          })}
        </div>

        <div>
          <label>Descrição</label>
          <textarea
            cols={30}
            rows={2}
            name="description"
            onChange={(e) => handleChange(e, null)}
            defaultValue={element.description || ""}
          />
        </div>

        <div>
          <label>Observação</label>
          <textarea
            cols={30}
            rows={2}
            name="observation"
            onChange={(e) => handleChange(e, null)}
            defaultValue={element.observation || ""}
          />
        </div>

        <div className={styles.sizesGrid}>
          {sizeType.map((e, i) => {
            return (
              <div key={i}>
                <label>{e}</label>
                {e === "-" ? (
                  <input type="text" value="" readOnly />
                ) : (
                  <input
                    type="number"
                    name="sizes"
                    onChange={(e) => handleChange(e, i)}
                    defaultValue={sizes[i]}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.modalLastRow}>
          <div>
            <label>Tamanho especial</label>
            <input
              type="number"
              name="special_size"
              onChange={(e) => handleChange(e, null)}
              defaultValue={element.special_size || 0}
            />
          </div>
          <div>
            <label>Peças totais</label>
            <input type="text" value={element.total || 0} readOnly />
          </div>
          <div>
            <label>Status</label>
            <input type="text" readOnly value={setStatus(element.status)} />
          </div>
        </div>
      </div>
      <div>
        <p>Selecione um novo layout:</p>
        <input
          type="file"
          name="image"
          onChange={(e) => handleChange(e, null)}
        />
      </div>
    </div>
  );
}
