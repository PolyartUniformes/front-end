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
            gridTemplateColumns: "50px auto 300px 300px 120px 120px 25px",
            textAlign: "center",
          }}
        >
          <p>ID</p>
          <p>CLIENTE</p>
          <p>LOTE</p>
          <p>ITEM</p>
          <p>DATA ALUGUEL</p>
          <p>DATA ENTREGA</p>
          <p></p>
        </div>
        {items &&
          items.map((element: any, index: number) => {
            return (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "50px auto 300px 300px 120px 120px 25px",
                }}
              >
                <input
                  type="text"
                  name="id"
                  style={{ textAlign: "center" }}
                  value={element.id}
                  readOnly
                />
                <input
                  type="text"
                  name="tamanho"
                  style={{ textAlign: "center" }}
                  value={element.cliente}
                  readOnly
                />
                <input
                  type="text"
                  name="tamanho"
                  style={{ textAlign: "center" }}
                  value={element.lote}
                  readOnly
                />
                <input
                  type="text"
                  name="tamanho"
                  style={{ textAlign: "center" }}
                  value={element.item}
                  readOnly
                />
                <input
                  type="text"
                  name="item"
                  style={{ textAlign: "center" }}
                  value={dateChange(element.dia_alugado)}
                  readOnly
                />
                <input
                  type="text"
                  name="item"
                  style={{ textAlign: "center" }}
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
