import { ChangeEvent, useState, useRef } from "react";

// Styles
import styles from "../../styles/cadastro.module.css";

// Schemas
import sizes from "../../utils/sizes.json";
import tissuesSchema from "../../utils/tissues.json";

// Functions
import { sumSizes } from "./functions/handleSizes";
import { setTissues } from "./functions/handleTissues";
import { handleCreation } from "./functions/handleCreation";

const Inputs = () => {
  const [loading, setLoading] = useState(false);

  const [element, setElement] = useState({});

  const [tissuesList, setTissuesList] = useState(
    Array(tissuesSchema.length).fill("none")
  );

  function handleTissue(event: ChangeEvent<HTMLInputElement>, index: number) {
    let result = setTissues(tissuesList, event.target.value, index);

    setTissuesList(result);

    const tissues = result.toString();

    const res = { ...element, ["tissues"]: tissues };

    setElement(res);
  }

  const [layout, setLayout] = useState(false);
  const [file, setFile] = useState<File | null>();

  function handleFileDisplay() {
    setFile(null);
    setLayout((current) => !current);
  }

  const [specialDisplay, setSpecialDisplay] = useState(false);

  function handleSpecialDisplay() {
    setElement({ ...element, ["special_size"]: "0" });
    setSpecialDisplay((current) => !current);
  }

  const [sizesValue, setSizesValue] = useState("");

  const [totalArray, setTotalArray] = useState(
    Array(sizesValue.split(",").length).fill(0)
  );

  const [total, setTotal] = useState(0);

  function handleSizeChange(type: string) {
    setSizesValue(type);
    setTotalArray(Array(type.split(",").length).fill(0));

    switch (type) {
      case sizes.feminina:
        setElement({ ...element, ["size_type"]: "FEMININA" });
        break;
      case sizes.infantil:
        setElement({ ...element, ["size_type"]: "INFANTIL" });
        break;
      case sizes.calca:
        setElement({ ...element, ["size_type"]: "CALCA" });
        break;
      case sizes.unico:
        setElement({ ...element, ["size_type"]: "UNICO" });
        break;
      case sizes.unisex:
        setElement({ ...element, ["size_type"]: "UNISEX" });
        break;

      default:
        setElement({ ...element, ["size_type"]: "MASCULINA" });
        break;
    }
  }

  function handleQntChange(
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    let result = sumSizes(totalArray, event.target.valueAsNumber, index);

    const textSizes = result.newArray.toString();

    setTotalArray(result.newArray);

    setElement({ ...element, ["sizes"]: textSizes });

    setTotal(result.total);
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = event.target.value.toUpperCase().trim();

    const result = { ...element, [event.target.name]: value };
    setElement(result);
  };

  async function saveData() {
    setLoading(true);
    await handleCreation(element, file);
    setLoading(false);
  }

  return (
    <div className={styles.managementBox}>
      <div className={styles.ordersFirstGrid}>
        <div>
          <label>
            Nº do Pedido <b style={{ color: "red" }}>*</b>
          </label>
          <input
            type="number"
            name="sub_code"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>
            Quantidade <b style={{ color: "red" }}>*</b>
          </label>
          <input
            type="number"
            name="quantity"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>
            Data de Entrega <b style={{ color: "red" }}>*</b>
          </label>
          <input
            type="date"
            name="deliver_in"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>
            Cliente <b style={{ color: "red" }}>*</b>
          </label>
          <input type="text" name="client" onChange={(e) => handleChange(e)} />
        </div>

        <div>
          <label>
            Vendedor <b style={{ color: "red" }}>*</b>
          </label>
          <input type="text" name="seller" onChange={(e) => handleChange(e)} />
        </div>

        <div>
          <label>Linha</label>
          <select name="line_type" onChange={(e) => handleChange(e)}>
            <option value="">Selecione</option>
            <option value="SOCIAL">Social</option>
            <option value="MALHA">Malha</option>
            <option value="JAQUETA">Jaqueta</option>
            <option value="OPERACIONAL">Operacional</option>
            <option value="BONE">Boné</option>
          </select>
        </div>

        <div>
          <label>Piloto</label>
          <select name="pilot" onChange={(e) => handleChange(e)}>
            <option value="">Selecione</option>
            <option value="FALSE">Não</option>
            <option value="TRUE">Sim</option>
          </select>
        </div>

        <div>
          <label>Embalagem</label>
          <select name="package_type" onChange={(e) => handleChange(e)}>
            <option value="">Selecione</option>
            <option value="CAIXA">Caixa</option>
            <option value="SACOLA">Sacola</option>
          </select>
        </div>

        <div>
          <label>Aplicação</label>
          <select name="aplication_type" onChange={(e) => handleChange(e)}>
            <option value="">Selecione</option>
            <option value="SILK">Silk</option>
            <option value="BORDADO">Bordado</option>
            <option value="SUBLIMAÇÃO">Sublimação</option>
          </select>
        </div>
      </div>

      <div className={styles.ordersSecondGrid}>
        {tissuesSchema.map((element, index) => {
          return (
            <div key={element.id}>
              <label>{element.name}</label>
              <input
                type="text"
                onChange={(event) => handleTissue(event, index)}
              />
            </div>
          );
        })}
      </div>

      <div>
        <div>
          <label>Descrição</label>
          <input
            type="text"
            name="description"
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div>
        <div>
          <label>Observação</label>
          <input
            type="text"
            name="observation"
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div className={styles.selectSize}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "max-content auto",
            columnGap: "10px",
          }}
        >
          <select onChange={(event) => handleSizeChange(event.target.value)}>
            <option value="">Selecione</option>
            <option value={sizes.masculina}>Masculina</option>
            <option value={sizes.feminina}>Feminina</option>
            <option value={sizes.infantil}>Infantil</option>
            <option value={sizes.calca}>Calça</option>
            <option value={sizes.unisex}>Unisex</option>
            <option value={sizes.unico}>Tamanho único</option>
          </select>
          <p>Total de peças: {total}</p>
        </div>

        <div className={styles.sizesGrid}>
          {sizesValue.split(",").map((e, i) => {
            return (
              <div key={i}>
                <label>{e}</label>
                {e === "-" ? (
                  <input type="text" readOnly defaultValue="" />
                ) : (
                  <input
                    type="number"
                    defaultValue={0}
                    onChange={(e) => handleQntChange(e, i)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <p>Selecione as opções:</p>

        <div className={styles.options}>
          <div className={styles.optionGrid}>
            <input
              type="checkbox"
              value="layout"
              onChange={handleFileDisplay}
            />
            <p>Layout</p>
          </div>
          {/* <div className={styles.optionGrid}>
            <input
              type="checkbox"
              value="special"
              onChange={handleSpecialDisplay}
            />
            <p>T. Especial</p>
          </div> */}
        </div>
      </div>

      {specialDisplay && (
        <div className={styles.specialSize}>
          <label>
            <i>Tamanho especial:</i>
          </label>
          <input
            type="number"
            defaultValue={0}
            name="special_size"
            onChange={(e) => handleChange(e)}
          />
        </div>
      )}

      {layout && (
        <div className={styles.files}>
          <label>
            <i>Tamanho máximo: 500 KB</i>
          </label>
          <input
            type="file"
            onChange={(event) => setFile(event.target.files?.[0])}
          />
        </div>
      )}

      <div className={styles.saveButton}>
        <button onClick={saveData} disabled={loading}>
          CADASTRAR
        </button>
      </div>
    </div>
  );
};

export default Inputs;
