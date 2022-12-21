import { Grid, Modal } from "semantic-ui-react";
import { ChangeEvent, useState, useEffect } from "react";
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

  const [editMode, setEditMode] = useState<number | null>(null);

  const handleEdit = (index: number, id: any) => {
    setValues({ id });
    setEditMode(index);
    setSeeClient(null);
  };

  const [values, setValues] = useState({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value.toUpperCase();

    setValues({ ...values, [name]: value });
  };

  const [items, setItems] = useState<any>([]);

  const handleItemsCheck = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    let item = [...items, value];

    setItems(item);

    setValues({ ...values, ["items"]: item.toString() });
  };

  const handleSubmit = async () => {
    const response = await mostruario.update(values);
    alert(response);
    setEditMode(null);
  };

  const [rentMode, setRentMode] = useState(false);

  const handleRent = () => {
    setValues({
      uuid: element.uuid,
      qnt: element.itens,
      alugado: element.alugado,
    });
    setRentMode((c) => !c);
  };

  const handleRented = async () => {
    const response = await mostruario.rent(values);
    alert(response);
  };

  const [returnMode, setReturnMode] = useState(false);
  const [cliente, setCliente] = useState<any>([]);
  const handleReturnMode = async (ok: boolean) => {
    setReturnMode((c) => !c);

    setValues({
      uuid: element.uuid,
      qnt: element.itens,
      alugado: element.alugado,
      cliente,
    });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await mostruario.getCliente(element.uuid);
      setCliente(response);
    };
    getData();
  }, []);

  const [rented, setRented] = useState<any>([]);
  const handleUnRentItems = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    let item = [...rented, value];

    setRented(item);

    setValues({ ...values, ["items"]: item.toString() });
  };

  const handleUnRent = async () => {
    const response = await mostruario.unrent(values);
    alert(response);
  };

  const handleDelete = async () => {
    const response = await mostruario.deleteItem(element.uuid);
    alert(response);
  };

  function dateChange(value: string) {
    return new Date(value).toLocaleString().split(" ")[0];
  }

  const [seeClient, setSeeClient] = useState<number | null>(null);
  const [clientData, setClientData] = useState<any>({});
  const handleSeeClient = (i: number, e: any) => {
    setSeeClient(i);
    setClientData(e);
    setEditMode(null);
  };

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
            value={`${element.itens} de ${element.alugado}`}
            readOnly
          />
        </div>
      }
    >
      {returnMode ? (
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <button onClick={() => setOpen(false)}>FECHAR</button>
            <button onClick={() => handleReturnMode(false)}>VOLTAR</button>
          </div>
          <p style={{ textAlign: "center", color: "white" }}>
            <i>Marque os itens que deseja devolver ao mostruário.</i>
          </p>
          <div className={styles.rentGrid}>
            <div className={styles.rentItems}>
              {data.map((element: any, index: number) => {
                return !element.alugado ? null : (
                  <div key={index} className={styles.rentCheckbox}>
                    <input
                      type="checkbox"
                      name="item"
                      value={element.id}
                      onChange={(e) => handleUnRentItems(e)}
                    />
                    <label>
                      {element.item} - {element.tamanho}
                    </label>
                  </div>
                );
              })}
            </div>
            <button onClick={handleUnRent}>DEVOLVER</button>
          </div>
        </div>
      ) : !rentMode ? (
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <button onClick={() => setOpen(false)}>FECHAR</button>
            <button onClick={handleRent}>ALUGAR</button>
            <button onClick={() => handleReturnMode(true)}>DEOVLVER</button>
            <button onClick={handleDelete}>DELETAR</button>
          </div>
          <p style={{ textAlign: "center", color: "white" }}>
            <i>
              Clique no lápis para editar a peça e no visto verde para salvar.
            </i>
          </p>
          {data.map((element: any, index: number) => {
            return (
              <div className={styles.itemsGrid} key={index}>
                <div className={styles.items}>
                  <input
                    type="text"
                    name="id"
                    className={
                      element.alugado ? styles.alugado : styles.nalugado
                    }
                    value={element.id}
                    readOnly
                  />
                  <input
                    type="text"
                    name="item"
                    style={{ textAlign: "left" }}
                    value={element.item}
                    readOnly
                  />
                  <input
                    type="text"
                    name="tamanho"
                    style={{ textAlign: "center" }}
                    value={element.tamanho}
                    readOnly
                  />
                  <div>
                    {cliente.length > 0 ? (
                      <div>
                        <button
                          onClick={() => handleEdit(index, element.id)}
                          style={{
                            backgroundColor: "white",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          ✏️
                        </button>
                        {cliente.map((e: any, i: number) => {
                          return e.pecas.includes(element.id) ? (
                            <button
                              key={i}
                              onClick={() => handleSeeClient(index, e)}
                              style={{
                                backgroundColor: "white",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              🪪
                            </button>
                          ) : null;
                        })}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(index, element.id)}
                        style={{
                          backgroundColor: "white",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        ✏️
                      </button>
                    )}
                  </div>
                </div>
                {seeClient === index ? (
                  <div className={styles.rentInputs2}>
                    <div className={styles.rentInputBox}>
                      <label>NOME DO CLIENTE</label>
                      <input
                        type="text"
                        value={clientData.cliente || ""}
                        name="cliente"
                        readOnly
                      />
                    </div>
                    <div className={styles.rentInputBox}>
                      <label>CPF/CNPJ</label>
                      <input
                        type="text"
                        value={clientData.documento || ""}
                        name="documento"
                        readOnly
                      />
                    </div>
                    <div className={styles.rentInputBox}>
                      <label>CEP</label>
                      <input
                        type="text"
                        value={clientData.cep || ""}
                        name="cep"
                        readOnly
                      />
                    </div>
                    <div className={styles.rentInputBox}>
                      <label>TELEFONE</label>
                      <input
                        type="text"
                        value={clientData.telefone || ""}
                        name="telefone"
                        readOnly
                      />
                    </div>
                    <div className={styles.rentInputBox}>
                      <label>CIDADE</label>
                      <input
                        type="text"
                        value={clientData.cidade || ""}
                        name="cidade"
                        readOnly
                      />
                    </div>
                    <div className={styles.rentInputBox}>
                      <label>RUA</label>
                      <input
                        type="text"
                        value={clientData.rua || ""}
                        name="rua"
                        readOnly
                      />
                    </div>
                    <div className={styles.rentInputBox}>
                      <label>NÚMERO</label>
                      <input
                        type="text"
                        value={clientData.numero || ""}
                        name="numero"
                        readOnly
                      />
                    </div>
                    <div className={styles.rentInputBox}>
                      <label>COMPLEMENTO</label>
                      <input
                        type="text"
                        value={clientData.complemento || ""}
                        name="complemento"
                        readOnly
                      />
                    </div>
                    <div className={styles.rentInputBox}>
                      <label>DATA ALUGUEL</label>
                      <input
                        type="text"
                        value={dateChange(clientData.aluguel)}
                        name="aluguel"
                        readOnly
                      />
                    </div>
                    <div className={styles.rentInputBox}>
                      <label>DATA ENTREGA</label>
                      <input
                        type="text"
                        value={dateChange(clientData.entrega)}
                        name="entrega"
                        readOnly
                      />
                    </div>
                  </div>
                ) : editMode === index ? (
                  <div className={styles.editItems}>
                    <input
                      type="text"
                      name="id"
                      style={{
                        textAlign: "center",
                        backgroundColor: "limegreen",
                      }}
                      value={element.id}
                      readOnly
                    />
                    <input
                      type="text"
                      name="item"
                      style={{ textAlign: "left", backgroundColor: "yellow" }}
                      onChange={(e) => handleChange(e)}
                    />
                    <input
                      type="text"
                      name="tamanho"
                      style={{ textAlign: "center", backgroundColor: "yellow" }}
                      onChange={(e) => handleChange(e)}
                    />
                    <button
                      onClick={handleSubmit}
                      style={{
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      ✅
                    </button>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <button onClick={() => setOpen(false)}>FECHAR</button>
            <button onClick={handleRent}>VOLTAR</button>
          </div>
          <p style={{ textAlign: "center", color: "white" }}>
            <i>Campos com * são obrigatórios!</i>
          </p>
          <div className={styles.rentGrid}>
            <div className={styles.rentInputs}>
              <div className={styles.rentInputBox}>
                <label>NOME DO CLIENTE *</label>
                <input
                  type="text"
                  placeholder="NOME DO CLIENTE *"
                  name="cliente"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className={styles.rentInputBox}>
                <label>CPF/CNPJ *</label>
                <input
                  type="text"
                  placeholder="CPF/CNPJ *"
                  name="documento"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className={styles.rentInputBox}>
                <label>CEP *</label>
                <input
                  type="text"
                  placeholder="CEP *"
                  name="cep"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className={styles.rentInputBox}>
                <label>TELEFONE *</label>
                <input
                  type="text"
                  placeholder="TELEFONE *"
                  name="telefone"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className={styles.rentInputBox}>
                <label>CIDADE *</label>
                <input
                  type="text"
                  placeholder="CIDADE *"
                  name="cidade"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className={styles.rentInputBox}>
                <label>RUA *</label>
                <input
                  type="text"
                  placeholder="RUA *"
                  name="rua"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className={styles.rentInputBox}>
                <label>NÚMERO *</label>
                <input
                  type="text"
                  placeholder="NÚMERO *"
                  name="numero"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className={styles.rentInputBox}>
                <label>COMPLEMENTO</label>
                <input
                  type="text"
                  placeholder="COMPLEMENTO"
                  name="complemento"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className={styles.rentInputBox}>
                <label>DATA ALUGUEL *</label>
                <input
                  type="date"
                  placeholder="DATA ALUGUEL *"
                  name="aluguel"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className={styles.rentInputBox}>
                <label>DATA ENTREGA *</label>
                <input
                  type="date"
                  placeholder="DATA ENTREGA *"
                  name="entrega"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className={styles.rentItems}>
              {data.map((element: any, index: number) => {
                return element.alugado ? null : (
                  <div key={index} className={styles.rentCheckbox}>
                    <input
                      type="checkbox"
                      name="item"
                      value={element.id}
                      onChange={(e) => handleItemsCheck(e)}
                    />
                    <label>
                      {element.item} - {element.tamanho}
                    </label>
                  </div>
                );
              })}
            </div>
            <button onClick={handleRented}>ALUGAR</button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ModalMostruario;
