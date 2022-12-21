import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import { DataJSON } from "../../../../../utils/types";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "limegreen",
    borderBottom: "1px solid black",
    fontSize: "10px",
  },
  section: {
    border: "1px solid black",
    fontSize: "10px",
  },
  rowOne: {
    fontSize: "10px",
    flexDirection: "row",
  },
  content: {
    width: "100%",
  },
  rowSection: {
    border: "1px solid black",
    padding: 1,
    fontWeight: "bold",
    backgroundColor: "gray",
    textAlign: "center",
    marginTop: 2,
    fontSize: "10px",
    marginLeft: 1,
    marginRight: 1,
  },
  columnSection: {
    border: "1px solid black",
    padding: 1,
    textAlign: "center",
    fontSize: "10px",
    marginLeft: 1,
    marginRight: 1,
  },
  layout: {
    width: "100%",
  },
  grade: {
    width: "100%",
    height: "100px",
  },
  titleMasculina: {
    textAlign: "center",
    padding: 2,
    backgroundColor: "lightblue",
    fontWeight: "bold",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    fontSize: "10px",
    marginTop: 2,
  },
  titleFeminina: {
    textAlign: "center",
    padding: 2,
    backgroundColor: "lightpink",
    fontWeight: "bold",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    fontSize: "10px",
    marginTop: 2,
  },
  titleInfantil: {
    textAlign: "center",
    padding: 2,
    backgroundColor: "lightgreen",
    fontWeight: "bold",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    fontSize: "10px",
    marginTop: 2,
  },
  titleCalcas: {
    textAlign: "center",
    padding: 2,
    backgroundColor: "lightgoldenrodyellow",
    fontWeight: "bold",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    fontSize: "10px",
    marginTop: 2,
  },
  titleBone: {
    textAlign: "center",
    padding: 2,
    backgroundColor: "lightsalmon",
    fontWeight: "bold",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    fontSize: "10px",
    marginTop: 2,
  },
});

type Element = {
  element: DataJSON;
};

const handleLayout = (image: string) => {
  if (image) {
    if (image.includes("cloudinary")) {
      return image;
    } else {
      return `https://ngaolrcpscllqpabwqkx.supabase.co/storage/v1/object/public/polyart/${image}`;
    }
  }
};

const MyDocument = ({ element }: Element) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.title}>
          <Text>ORDEM DE CORTE Nº {element.main_code}</Text>
        </View>

        <View style={styles.rowOne}>
          <View style={styles.content}>
            <View style={styles.rowSection}>
              <Text>DATA DE ENTREGA</Text>
            </View>
            <View style={styles.columnSection}>
              <Text>{new Date(element.deliver_in).toLocaleDateString()}</Text>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.rowSection}>
              <Text>PILOTO</Text>
            </View>
            <View style={styles.columnSection}>
              <Text>{element.pilot === true ? "SIM" : "NÃO"}</Text>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.rowSection}>
              <Text>LINHA</Text>
            </View>
            <View style={styles.columnSection}>
              <Text>
                {element.line_type === "" || !element.line_type
                  ? "-"
                  : element.line_type}
              </Text>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.rowSection}>
              <Text>QNTD. O.C</Text>
            </View>
            <View style={styles.columnSection}>
              <Text>{element.quantity || "0"}</Text>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.rowSection}>
              <Text>Nº DO PEDIDO</Text>
            </View>
            <View style={styles.columnSection}>
              <Text>
                {element.sub_code ? element.sub_code : "NÃO DEFINIDO"}
              </Text>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.rowSection}>
              <Text>VENDEDOR</Text>
            </View>
            <View style={styles.columnSection}>
              <Text>{element.seller}</Text>
            </View>
          </View>
        </View>

        {/* Início da segunda row */}

        <View style={styles.rowOne}>
          <View style={styles.content}>
            <View style={styles.rowSection}>
              <Text>APLICAÇÃO</Text>
            </View>
            <View style={styles.columnSection}>
              <Text>{element.aplication_type}</Text>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.rowSection}>
              <Text>EMBALAGEM</Text>
            </View>
            <View style={styles.columnSection}>
              <Text>{element.package_type}</Text>
            </View>
          </View>
        </View>

        <View style={styles.rowOne}>
          <View style={styles.content}>
            <View style={styles.rowSection}>
              <Text>CLIENTE</Text>
            </View>
            <View style={styles.columnSection}>
              <Text>{element.client}</Text>
            </View>
          </View>
        </View>

        {/* Início da terceira row */}

        <View style={styles.rowOne}>
          {element.tissues.split(",")[0] !== "NONE" ? (
            <View style={styles.content}>
              <View style={styles.rowSection}>
                <Text>TECIDO 01</Text>
              </View>
              <View style={styles.columnSection}>
                <Text>{element.tissues.split(",")[0]}</Text>
              </View>
            </View>
          ) : null}

          {element.tissues.split(",")[1] !== "NONE" ? (
            <View style={styles.content}>
              <View style={styles.rowSection}>
                <Text>TECIDO 02</Text>
              </View>
              <View style={styles.columnSection}>
                <Text>{element.tissues.split(",")[1]}</Text>
              </View>
            </View>
          ) : null}
        </View>

        <View style={styles.rowOne}>
          {element.tissues.split(",")[2] !== "NONE" ? (
            <View style={styles.content}>
              <View style={styles.rowSection}>
                <Text>TECIDO 03</Text>
              </View>
              <View style={styles.columnSection}>
                <Text>{element.tissues.split(",")[2]}</Text>
              </View>
            </View>
          ) : null}

          {element.tissues.split(",")[3] !== "NONE" ? (
            <View style={styles.content}>
              <View style={styles.rowSection}>
                <Text>TECIDO 04</Text>
              </View>
              <View style={styles.columnSection}>
                <Text>{element.tissues.split(",")[3]}</Text>
              </View>
            </View>
          ) : null}
        </View>

        {element.description ? (
          <View style={styles.rowOne}>
            <View style={styles.content}>
              <View style={styles.rowSection}>
                <Text>DESCRIÇÃO</Text>
              </View>
              <View style={styles.columnSection}>
                <Text>{element.description}</Text>
              </View>
            </View>
          </View>
        ) : null}

        {element.observation ? (
          <View style={styles.rowOne}>
            <View style={styles.content}>
              <View style={styles.rowSection}>
                <Text>OBSERVAÇÃO</Text>
              </View>
              <View style={styles.columnSection}>
                <Text>{element.observation}</Text>
              </View>
            </View>
          </View>
        ) : null}

        {/* Início da quarta row */}

        {element.image_path ? (
          <Image style={styles.layout} src={handleLayout(element.image_path)} />
        ) : null}

        {element.size_type === "" ? null : element.size_type === "UNISEX" ? (
          <View>
            <View>
              <View style={styles.titleMasculina}>
                <Text>GRADE DE TAMANHOS MASCULINOS</Text>
              </View>

              <View style={styles.rowOne}>
                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>PP</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[0] === "0"
                        ? "-"
                        : element.sizes.split(",")[0]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>P</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[1] === "0"
                        ? "-"
                        : element.sizes.split(",")[1]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>M</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[2] === "0"
                        ? "-"
                        : element.sizes.split(",")[2]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>G</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[3] === "0"
                        ? "-"
                        : element.sizes.split(",")[3]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>GG</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[4] === "0"
                        ? "-"
                        : element.sizes.split(",")[4]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>XG</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[5] === "0"
                        ? "-"
                        : element.sizes.split(",")[5]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>EG</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[6] === "0"
                        ? "-"
                        : element.sizes.split(",")[6]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>EG 1</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[7] === "0"
                        ? "-"
                        : element.sizes.split(",")[7]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>EG 2</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[8] === "0"
                        ? "-"
                        : element.sizes.split(",")[8]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>EG 3</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[9] === "0"
                        ? "-"
                        : element.sizes.split(",")[9]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>TOTAL</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {parseInt(element.sizes.split(",")[0]) +
                        parseInt(element.sizes.split(",")[1]) +
                        parseInt(element.sizes.split(",")[2]) +
                        parseInt(element.sizes.split(",")[3]) +
                        parseInt(element.sizes.split(",")[4]) +
                        parseInt(element.sizes.split(",")[5]) +
                        parseInt(element.sizes.split(",")[6]) +
                        parseInt(element.sizes.split(",")[7]) +
                        parseInt(element.sizes.split(",")[8]) +
                        parseInt(element.sizes.split(",")[9])}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View>
              <View style={styles.titleFeminina}>
                <Text>GRADE DE TAMANHOS FEMININOS</Text>
              </View>

              <View style={styles.rowOne}>
                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>PP BL</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[10] === "0"
                        ? "-"
                        : element.sizes.split(",")[10]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>P BL</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[11] === "0"
                        ? "-"
                        : element.sizes.split(",")[11]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>M BL</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[12] === "0"
                        ? "-"
                        : element.sizes.split(",")[12]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>G BL</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[13] === "0"
                        ? "-"
                        : element.sizes.split(",")[13]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>GG BL</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[14] === "0"
                        ? "-"
                        : element.sizes.split(",")[14]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>XG BL</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[15] === "0"
                        ? "-"
                        : element.sizes.split(",")[15]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>EG BL</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[16] === "0"
                        ? "-"
                        : element.sizes.split(",")[16]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>EG 1 BL</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[17] === "0"
                        ? "-"
                        : element.sizes.split(",")[17]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>EG 2 BL</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[18] === "0"
                        ? "-"
                        : element.sizes.split(",")[18]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>EG 3 BL</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[19] === "0"
                        ? "-"
                        : element.sizes.split(",")[19]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>TOTAL</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {parseInt(element.sizes.split(",")[10]) +
                        parseInt(element.sizes.split(",")[11]) +
                        parseInt(element.sizes.split(",")[12]) +
                        parseInt(element.sizes.split(",")[13]) +
                        parseInt(element.sizes.split(",")[14]) +
                        parseInt(element.sizes.split(",")[15]) +
                        parseInt(element.sizes.split(",")[16]) +
                        parseInt(element.sizes.split(",")[17]) +
                        parseInt(element.sizes.split(",")[18]) +
                        parseInt(element.sizes.split(",")[19])}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View>
              <View style={styles.titleInfantil}>
                <Text>GRADE DE TAMANHOS INFANTIS</Text>
              </View>

              <View style={styles.rowOne}>
                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>0 AN</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[20] === "0"
                        ? "-"
                        : element.sizes.split(",")[20]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>2 AN</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[21] === "0"
                        ? "-"
                        : element.sizes.split(",")[21]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>4 AN</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[22] === "0"
                        ? "-"
                        : element.sizes.split(",")[22]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>PI</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[23] === "0"
                        ? "-"
                        : element.sizes.split(",")[23]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>MI</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[24] === "0"
                        ? "-"
                        : element.sizes.split(",")[24]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>GI</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {element.sizes.split(",")[25] === "0"
                        ? "-"
                        : element.sizes.split(",")[25]}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>-</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>-</Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>-</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>-</Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>-</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>-</Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>-</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>-</Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.rowSection}>
                    <Text>TOTAL</Text>
                  </View>
                  <View style={styles.columnSection}>
                    <Text>
                      {parseInt(element.sizes.split(",")[20]) +
                        parseInt(element.sizes.split(",")[21]) +
                        parseInt(element.sizes.split(",")[22]) +
                        parseInt(element.sizes.split(",")[23]) +
                        parseInt(element.sizes.split(",")[24]) +
                        parseInt(element.sizes.split(",")[25])}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View>
            {element.size_type === "MASCULINA" ? (
              <View>
                <View style={styles.titleMasculina}>
                  <Text>GRADE DE TAMANHOS MASCULINA</Text>
                </View>

                <View style={styles.rowOne}>
                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>PP</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[0] === "0"
                          ? "-"
                          : element.sizes.split(",")[0]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>P</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[1] === "0"
                          ? "-"
                          : element.sizes.split(",")[1]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>M</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[2] === "0"
                          ? "-"
                          : element.sizes.split(",")[2]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>G</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[3] === "0"
                          ? "-"
                          : element.sizes.split(",")[3]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>GG</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[4] === "0"
                          ? "-"
                          : element.sizes.split(",")[4]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>XG</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[5] === "0"
                          ? "-"
                          : element.sizes.split(",")[5]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>EG</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[6] === "0"
                          ? "-"
                          : element.sizes.split(",")[6]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>EG 1</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[7] === "0"
                          ? "-"
                          : element.sizes.split(",")[7]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>EG 2</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[8] === "0"
                          ? "-"
                          : element.sizes.split(",")[8]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>EG 3</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[9] === "0"
                          ? "-"
                          : element.sizes.split(",")[9]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>TOTAL</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {parseInt(element.sizes.split(",")[0]) +
                          parseInt(element.sizes.split(",")[1]) +
                          parseInt(element.sizes.split(",")[2]) +
                          parseInt(element.sizes.split(",")[3]) +
                          parseInt(element.sizes.split(",")[4]) +
                          parseInt(element.sizes.split(",")[5]) +
                          parseInt(element.sizes.split(",")[6]) +
                          parseInt(element.sizes.split(",")[7]) +
                          parseInt(element.sizes.split(",")[8]) +
                          parseInt(element.sizes.split(",")[9])}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : element.size_type === "FEMININA" ? (
              <View>
                <View style={styles.titleFeminina}>
                  <Text>GRADE DE TAMANHOS FEMININA</Text>
                </View>

                <View style={styles.rowOne}>
                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>PPBL</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[0] === "0"
                          ? "-"
                          : element.sizes.split(",")[0]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>P</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[1] === "0"
                          ? "-"
                          : element.sizes.split(",")[1]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>MBL</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[2] === "0"
                          ? "-"
                          : element.sizes.split(",")[2]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>GBL</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[3] === "0"
                          ? "-"
                          : element.sizes.split(",")[3]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>GGBL</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[4] === "0"
                          ? "-"
                          : element.sizes.split(",")[4]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>XGBL</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[5] === "0"
                          ? "-"
                          : element.sizes.split(",")[5]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>EGBL</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[6] === "0"
                          ? "-"
                          : element.sizes.split(",")[6]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>EG1BL</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[7] === "0"
                          ? "-"
                          : element.sizes.split(",")[7]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>EG2BL</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[8] === "0"
                          ? "-"
                          : element.sizes.split(",")[8]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>EG3BL</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[9] === "0"
                          ? "-"
                          : element.sizes.split(",")[9]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>TOTAL</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {parseInt(element.sizes.split(",")[0]) +
                          parseInt(element.sizes.split(",")[1]) +
                          parseInt(element.sizes.split(",")[2]) +
                          parseInt(element.sizes.split(",")[3]) +
                          parseInt(element.sizes.split(",")[4]) +
                          parseInt(element.sizes.split(",")[5]) +
                          parseInt(element.sizes.split(",")[6]) +
                          parseInt(element.sizes.split(",")[7]) +
                          parseInt(element.sizes.split(",")[8]) +
                          parseInt(element.sizes.split(",")[9])}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : element.size_type === "INFANTIL" ? (
              <View>
                <View style={styles.titleInfantil}>
                  <Text>GRADE DE TAMANHOS INFANTIL</Text>
                </View>

                <View style={styles.rowOne}>
                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>0A</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[0] === "0"
                          ? "-"
                          : element.sizes.split(",")[0]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>2A</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[1] === "0"
                          ? "-"
                          : element.sizes.split(",")[1]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>4A</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[2] === "0"
                          ? "-"
                          : element.sizes.split(",")[2]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>PI</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[3] === "0"
                          ? "-"
                          : element.sizes.split(",")[3]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>MI</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[4] === "0"
                          ? "-"
                          : element.sizes.split(",")[4]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>GI</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[5] === "0"
                          ? "-"
                          : element.sizes.split(",")[5]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>-</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>-</Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>-</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>-</Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>-</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>-</Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>-</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>-</Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>TOTAL</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {parseInt(element.sizes.split(",")[0]) +
                          parseInt(element.sizes.split(",")[1]) +
                          parseInt(element.sizes.split(",")[2]) +
                          parseInt(element.sizes.split(",")[3]) +
                          parseInt(element.sizes.split(",")[4]) +
                          parseInt(element.sizes.split(",")[5]) +
                          parseInt(element.sizes.split(",")[6]) +
                          parseInt(element.sizes.split(",")[7]) +
                          parseInt(element.sizes.split(",")[8]) +
                          parseInt(element.sizes.split(",")[9])}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : element.size_type === "CALCA" ? (
              <View>
                <View style={styles.titleCalcas}>
                  <Text>GRADE DE TAMANHOS DE CALÇAS</Text>
                </View>

                <View style={styles.rowOne}>
                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>34</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[0] === "0"
                          ? "-"
                          : element.sizes.split(",")[0]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>36</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[1] === "0"
                          ? "-"
                          : element.sizes.split(",")[1]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>38</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[2] === "0"
                          ? "-"
                          : element.sizes.split(",")[2]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>40</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[3] === "0"
                          ? "-"
                          : element.sizes.split(",")[3]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>42</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[4] === "0"
                          ? "-"
                          : element.sizes.split(",")[4]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>44</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[5] === "0"
                          ? "-"
                          : element.sizes.split(",")[5]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>46</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[6] === "0"
                          ? "-"
                          : element.sizes.split(",")[6]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>48</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[7] === "0"
                          ? "-"
                          : element.sizes.split(",")[7]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>50</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[8] === "0"
                          ? "-"
                          : element.sizes.split(",")[8]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>52</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[9] === "0"
                          ? "-"
                          : element.sizes.split(",")[9]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>TOTAL</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {parseInt(element.sizes.split(",")[0]) +
                          parseInt(element.sizes.split(",")[1]) +
                          parseInt(element.sizes.split(",")[2]) +
                          parseInt(element.sizes.split(",")[3]) +
                          parseInt(element.sizes.split(",")[4]) +
                          parseInt(element.sizes.split(",")[5]) +
                          parseInt(element.sizes.split(",")[6]) +
                          parseInt(element.sizes.split(",")[7]) +
                          parseInt(element.sizes.split(",")[8]) +
                          parseInt(element.sizes.split(",")[9])}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : element.size_type === "BONE" ? (
              <View>
                <View style={styles.titleBone}>
                  <Text>GRADE DE TAMANHOS ÚNICOS</Text>
                </View>

                <View style={styles.rowOne}>
                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>UNC</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {element.sizes.split(",")[0] === "0"
                          ? "-"
                          : element.sizes.split(",")[0]}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>-</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>-</Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>-</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>-</Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>-</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>-</Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>-</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>-</Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>-</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>-</Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>-</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>-</Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>-</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>-</Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>-</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>-</Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>-</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>-</Text>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <View style={styles.rowSection}>
                      <Text>TOTAL</Text>
                    </View>
                    <View style={styles.columnSection}>
                      <Text>
                        {parseInt(element.sizes.split(",")[0]) +
                          parseInt(element.sizes.split(",")[1]) +
                          parseInt(element.sizes.split(",")[2]) +
                          parseInt(element.sizes.split(",")[3]) +
                          parseInt(element.sizes.split(",")[4]) +
                          parseInt(element.sizes.split(",")[5]) +
                          parseInt(element.sizes.split(",")[6]) +
                          parseInt(element.sizes.split(",")[7]) +
                          parseInt(element.sizes.split(",")[8]) +
                          parseInt(element.sizes.split(",")[9])}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        )}
      </View>
    </Page>
  </Document>
);

export default MyDocument;
