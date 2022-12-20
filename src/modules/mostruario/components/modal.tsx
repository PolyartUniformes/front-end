import { Modal } from "semantic-ui-react";
import { useState, useEffect } from "react";
import styles from "../styles/modal.module.css";
import { mostruario } from "../functions/mostruario";

const ModalMostruario = ({ element }: any) => {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState<any>([]);

  const handleOpen = (value: boolean) => {
    setOpen(value);
  };

  const handleData = async () => {
    const response = await mostruario.getChild(element.uuid);
    setData(response);
  };

  console.log(data);

  return (
    <Modal
      className={styles.modal}
      onClose={() => handleOpen(false)}
      onOpen={() => {
        handleOpen(true), handleData();
      }}
      open={open}
      trigger={
        <div className={styles.item}>
          <input type="text" value={element.code} readOnly />
          <input
            type="text"
            style={{ textAlign: "center" }}
            value={element.itens}
            readOnly
          />
          <input
            type="text"
            style={{ textAlign: "center" }}
            value={element.alugado ? "SIM" : "NÃO"}
            readOnly
          />
        </div>
      }
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <button onClick={() => setOpen(false)}>FECHAR</button>
          <button>EDITAR</button>
          <button>ALUGAR</button>
          <button>DELETAR</button>
        </div>
        {data.map((element: any, index: number) => {
          return (
            <div className={styles.items} key={index}>
              <input
                type="text"
                style={{ textAlign: "center" }}
                value={element.id}
                readOnly
              />
              <input type="text" value={element.item} readOnly />
              <input
                type="text"
                style={{ textAlign: "center" }}
                value={element.tamanho}
                readOnly
              />
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default ModalMostruario;
