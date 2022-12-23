import { mostruario } from "../functions/mostruario";

const Items = ({ items }: any) => {
  function dateChange(value: string) {
    return new Date(value).toLocaleString().split(" ")[0];
  }

  const handleDelete = async (id: number) => {
    alert(await mostruario.deleteClient(id));
  };

  if (items.length > 0) {
    return (
      <div style={{ marginTop: "10px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "25px 120px 130px auto 150px 230px 80px 80px 25px",
            textAlign: "center",
          }}
        >
          <p>ID</p>
          <p>CLIENTE</p>
          <p>TELEFONE</p>
          <p>ENDEREÇO</p>
          <p>LOTE</p>
          <p>ITEM</p>
          <p>ALUGUEL</p>
          <p>ENTREGA</p>
          <p></p>
        </div>
        {items &&
          items.map((element: any, index: number) => {
            return (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "25px 120px 130px auto 150px 230px 80px 80px 25px",
                  fontSize: "10px",
                }}
              >
                <input
                  type="text"
                  name="tamanho"
                  style={{ textAlign: "center", fontSize: "10px" }}
                  value={element.id}
                  readOnly
                />
                <input
                  type="text"
                  name="tamanho"
                  style={{ textAlign: "center", fontSize: "10px" }}
                  value={element.cliente}
                  readOnly
                />
                <input
                  type="text"
                  name="id"
                  style={{ textAlign: "center", fontSize: "10px" }}
                  value={element.telefone}
                  readOnly
                />
                <input
                  type="text"
                  name="tamanho"
                  style={{ textAlign: "center", fontSize: "10px" }}
                  value={element.endereco}
                  readOnly
                />
                <input
                  type="text"
                  name="tamanho"
                  style={{ textAlign: "center", fontSize: "10px" }}
                  value={element.lote}
                  readOnly
                />
                <input
                  type="text"
                  name="tamanho"
                  style={{ textAlign: "center", fontSize: "10px" }}
                  value={element.item}
                  readOnly
                />
                <input
                  type="text"
                  name="item"
                  style={{ textAlign: "center", fontSize: "10px" }}
                  value={dateChange(element.dia_alugado)}
                  readOnly
                />
                <input
                  type="text"
                  name="item"
                  style={{ textAlign: "center", fontSize: "10px" }}
                  value={
                    element.dia_entregue ? element.dia_entregue : "NÃO ENTREGUE"
                  }
                  readOnly
                />
                <button
                  style={{ backgroundColor: "red" }}
                  onClick={() => handleDelete(element.id)}
                >
                  X
                </button>
              </div>
            );
          })}
      </div>
    );
  }
  return (
    <div>
      <i style={{ color: "red" }}>Nenhum dado...</i>
    </div>
  );
};

export { Items };
