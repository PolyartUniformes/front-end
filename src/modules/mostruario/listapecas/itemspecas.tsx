import styles from "../styles/modal.module.css";

const Items = ({ items, parents }: any) => {
  function dateChange(value: string) {
    return new Date(value).toLocaleString().split(" ")[0];
  }

  if (items.length > 0) {
    return (
      <div style={{ marginTop: "10px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "100px auto 100px 250px 100px",
            textAlign: "center",
          }}
        >
          <p>ID</p>
          <p>ITEM</p>
          <p>TAMANHO</p>
          <p>LOTE</p>
          <p>DEVOLVER</p>
        </div>
        {items &&
          items.map((element: any, index: number) => {
            const cliente: any = parents.clientes.filter(
              (e: any) => e.uuid === element.uuid
            )[0];
            const lote: any = parents.lotes.filter(
              (e: any) => e.uuid === element.uuid
            )[0];

            console.log(lote);

            const lateData = () => {
              const date1 = new Date();
              const date2 = new Date(cliente.entrega);

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
            };

            return (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px auto 100px 250px 100px",
                }}
              >
                <input
                  type="text"
                  name="id"
                  className={element.alugado ? styles.alugado : styles.nalugado}
                  value={element.id}
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
                  name="tamanho"
                  style={{ textAlign: "center" }}
                  value={element.tamanho}
                  readOnly
                />
                <input
                  type="text"
                  name="item"
                  style={{ textAlign: "center" }}
                  value={lote.code ? lote.code : ""}
                  readOnly
                />
                <input
                  type="text"
                  name="item"
                  className={
                    element.alugado && lateData()
                      ? styles.atrasado
                      : styles.naoatrasado
                  }
                  value={
                    element.alugado ? dateChange(cliente.entrega) : "DISPONÍVEL"
                  }
                  readOnly
                />
              </div>
            );
          })}
      </div>
    );
  }
  return (
    <div>
      <i style={{ color: "red" }}>Nenhum dado encontrado!</i>
    </div>
  );
};

export { Items };
