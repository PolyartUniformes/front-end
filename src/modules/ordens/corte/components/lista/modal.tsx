import { Modal } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

// Types
import { DataJSON } from "../../../../../utils/types";

// Styles
import styles from "../../styles/modal.module.css";

// Schemas
import tissuesSchema from "../../utils/tissues.json";
import sizesSchema from "../../utils/sizes.json";
import statusSchema from "../../utils/status.json";

// Components
import EditItem from "./editionMode";
import MyDocument from "./PDF";

// Functions
import { setStatus, changeStatus } from "./functions/handleStatus";
import { isLate } from "./functions/isLate";
import { block, unBlock } from "./functions/handleDelete";

type Element = {
  element: DataJSON;
};

export default function ModalItem({ element }: Element) {
  const [open, setOpen] = useState(false);

  const [isActive, setIsActive] = useState(false);

  function handleOpen(value: boolean) {
    setOpen(value);
    setIsActive(value);
  }

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

    if (element.image_path) {
      if (element.image_path.includes("cloudinary")) {
        setLayoutUrl(element.image_path);
      } else {
        setLayoutUrl(
          `https://ngaolrcpscllqpabwqkx.supabase.co/storage/v1/object/public/polyart/${element.image_path}`
        );
      }
    }
  }, [element.size_type]);

  const [editMode, setEditMode] = useState(false);
  const [editSector, setEditSector] = useState(false);
  const [editOrder, setEditOrder] = useState(false);
  const [saveEdition, setSaveEdition] = useState(false);

  function handleEditMode() {
    setEditMode((c) => !c);
    setSaveEdition(false);
    setEditOrder(false);
    setEditSector(false);
  }

  const [statusType, setStatusType] = useState(5);

  async function handleChangeStatus() {
    const response = await changeStatus(element.uuid, statusType);
    alert(response);
    handleEditMode();
  }

  const [layoutUrl, setLayoutUrl] = useState("");

  return (
    <Modal
      className={styles.modal}
      onClose={() => handleOpen(false)}
      onOpen={() => handleOpen(true)}
      open={open}
      trigger={
        <div className={styles.modalListItem}>
          <input
            className={isActive ? styles.activeItem : styles.item}
            value={element.sub_code || ""}
            readOnly
          />
          <input
            className={isActive ? styles.activeItem : styles.item}
            type="text"
            value={element.client}
            readOnly
          />
          <input
            type="text"
            className={
              element.status === 16
                ? styles.delivered
                : isLate(element.deliver_in)
                ? styles.isLate
                : ""
            }
            value={dateChange(element.deliver_in)}
            readOnly
          />
        </div>
      }
    >
      {editSector ? (
        <div className={styles.editOptions}>
          <p>SELECIONE UM SETOR ABAIXO:</p>
          <select onChange={(e) => setStatusType(parseInt(e.target.value))}>
            {statusSchema.map((e, i) => {
              return (
                <option key={i} value={e.code}>
                  {e.name}
                </option>
              );
            })}
          </select>
          <div>
            <button
              className={styles.modalActionsCancelButton}
              onClick={() => setEditSector(false)}
            >
              VOLTAR
            </button>

            <button
              className={styles.modalActionsSaveButton}
              onClick={() => handleChangeStatus()}
            >
              SALVAR
            </button>
          </div>
        </div>
      ) : editOrder ? (
        <div className={styles.modalActions}>
          <button
            className={styles.modalActionsCancelButton}
            onClick={() => setEditOrder(false)}
          >
            VOLTAR
          </button>

          <button
            className={styles.modalActionsSaveButton}
            onClick={() => setSaveEdition(true)}
          >
            SALVAR
          </button>
        </div>
      ) : editMode ? (
        <div className={styles.editOptions}>
          <p>O QUE VOCÊ DESEJA EDITAR?</p>
          <div>
            <button
              className={styles.modalActionsOptionButton}
              onClick={() => setEditOrder(true)}
            >
              TUDO
            </button>
            <button
              className={styles.modalActionsOptionButton}
              onClick={() => setEditSector(true)}
            >
              SETOR
            </button>
          </div>
          <button
            className={styles.modalActionsQuitButton}
            onClick={handleEditMode}
          >
            SAIR
          </button>
        </div>
      ) : (
        <div className={styles.modalActions}>
          <button
            className={styles.modalActionsButton}
            onClick={() => handleOpen(false)}
          >
            FECHAR
          </button>

          {element.deleted ? null : (
            <button
              className={styles.modalActionsButton}
              onClick={handleEditMode}
            >
              EDITAR
            </button>
          )}

          <button className={styles.modalActionsButton}>
            <PDFDownloadLink
              document={<MyDocument element={element} />}
              fileName={`${element.client}.pdf`}
            >
              BAIXAR
            </PDFDownloadLink>
          </button>

          {element.deleted ? (
            <button
              className={styles.restore}
              onClick={() => unBlock(element.uuid)}
            >
              RESTAURAR
            </button>
          ) : (
            <button
              className={styles.delete}
              onClick={() => block(element.uuid)}
            >
              DELETAR
            </button>
          )}
        </div>
      )}

      {editOrder ? (
        <EditItem element={element} save={saveEdition} />
      ) : (
        <div className={styles.modalContent}>
          <div className={styles.modalLines}>
            <div className={styles.modalLineOfInputs}>
              <div>
                <label>Nº do Pedido</label>
                <input type="text" readOnly value={element.sub_code || ""} />
              </div>
              <div>
                <label>Quantidade</label>
                <input type="text" readOnly value={element.quantity || ""} />
              </div>
              <div>
                <label>Data de Entrega</label>
                <input
                  type="text"
                  readOnly
                  value={dateChange(element.deliver_in)}
                />
              </div>
            </div>

            <div className={styles.modalLineOfInputs}>
              <div>
                <label>Cliente</label>
                <input type="text" readOnly value={element.client || ""} />
              </div>
              <div>
                <label>Vendedor</label>
                <input type="text" readOnly value={element.seller || ""} />
              </div>
              <div>
                <label>Linha</label>
                <input type="text" readOnly value={element.line_type || ""} />
              </div>
            </div>

            <div className={styles.modalLineOfInputs}>
              <div>
                <label>Piloto</label>
                <input
                  type="text"
                  readOnly
                  value={element.pilot ? "SIM" : "NÃO"}
                />
              </div>
              <div>
                <label>Embalagem</label>
                <input
                  type="text"
                  readOnly
                  value={element.package_type || ""}
                />
              </div>
              <div>
                <label>Aplicação</label>
                <input
                  type="text"
                  readOnly
                  value={element.aplication_type || ""}
                />
              </div>
            </div>

            <div className={styles.modalLineOfTissues}>
              {tissuesSchema.map((element, index) => {
                return (
                  <div key={element.id}>
                    <label>{element.name}</label>
                    <input type="text" readOnly value={tissues[index]} />
                  </div>
                );
              })}
            </div>

            <div>
              <label>Descrição</label>
              <textarea
                cols={30}
                rows={2}
                readOnly
                value={element.description || ""}
              />
            </div>

            <div>
              <label>Observação</label>
              <textarea
                cols={30}
                rows={2}
                readOnly
                value={element.observation || ""}
              />
            </div>

            <div className={styles.sizesGrid}>
              {sizeType.map((e, i) => {
                return (
                  <div key={i}>
                    <label>{e}</label>
                    {e === "-" ? (
                      <input type="text" readOnly value="" />
                    ) : (
                      <input type="text" readOnly value={sizes[i]} />
                    )}
                  </div>
                );
              })}
            </div>

            <div className={styles.modalLastRow}>
              {/* <div>
                <label>Tamanho especial</label>
                <input type="text" readOnly value={element.special_size || 0} />
              </div> */}
              <div>
                <label>Peças totais</label>
                <input type="text" readOnly value={element.total || 0} />
              </div>
              <div>
                <label>Setor</label>
                <input type="text" readOnly value={setStatus(element.status)} />
              </div>
            </div>
          </div>
          <img src={layoutUrl} alt="" className={styles.modalImage} />
        </div>
      )}
    </Modal>
  );
}
