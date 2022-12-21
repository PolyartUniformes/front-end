import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 3,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "limegreen",
    borderBottom: "1px solid black",
    fontSize: "10px",
    padding: 2,
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
    fontSize: "8px",
  },
  contentImage: {
    width: "100%",
    textAlign: "center",
  },
  rowSection: {
    border: "1px solid black",
    padding: 2,
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
    padding: 2,
    textAlign: "center",
    fontSize: "8px",
    marginLeft: 1,
    marginRight: 1,
  },
  textSize: {
    fontSize: "8px",
  },
  tamanho: {
    width: "60px",
  },
  layout: {
    width: "30px",
    height: "30px",
  },
});

function dateChange(value: string) {
  return new Date(value).toLocaleString().split(" ")[0];
}

import icon from "../../../assets/logopreta.jpeg";

const MyDocument = ({ element, cliente }: any) => (
  <Document>
    <Page orientation="landscape" size="A6" style={styles.page}>
      <View style={styles.contentImage}>
        <Image style={styles.layout} src={icon} />
      </View>

      <View style={styles.content}>
        <View style={styles.rowSection}>
          <Text style={styles.textSize}>MOSTRUÁRIO</Text>
        </View>
        <View style={styles.columnSection}>
          <Text style={styles.textSize}>{element.code}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.rowSection}>
          <Text style={styles.textSize}>CLIENTE</Text>
        </View>
        <View style={styles.columnSection}>
          <Text style={styles.textSize}>{cliente.cliente}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.rowSection}>
          <Text style={styles.textSize}>RUA</Text>
        </View>
        <View style={styles.columnSection}>
          <Text style={styles.textSize}>{cliente.rua}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.rowSection}>
          <Text style={styles.textSize}>CIDADE</Text>
        </View>
        <View style={styles.columnSection}>
          <Text style={styles.textSize}>{cliente.cidade}</Text>
        </View>
      </View>

      <View style={styles.rowOne}>
        <View style={styles.content}>
          <View style={styles.rowSection}>
            <Text style={styles.textSize}>NÚMERO</Text>
          </View>
          <View style={styles.columnSection}>
            <Text style={styles.textSize}>{cliente.numero}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.rowSection}>
            <Text style={styles.textSize}>CEP</Text>
          </View>
          <View style={styles.columnSection}>
            <Text style={styles.textSize}>{cliente.cep}</Text>
          </View>
        </View>
      </View>

      <View style={styles.rowOne}>
        <View style={styles.content}>
          <View style={styles.rowSection}>
            <Text style={styles.textSize}>TELEFONE</Text>
          </View>
          <View style={styles.columnSection}>
            <Text style={styles.textSize}>{cliente.telefone}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.rowSection}>
            <Text style={styles.textSize}>DATA ALUGUEL</Text>
          </View>
          <View style={styles.columnSection}>
            <Text style={styles.textSize}>{dateChange(cliente.aluguel)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.rowSection}>
          <Text style={styles.textSize}>QUANTIDADE DE PEÇAS EMPRESTADAS</Text>
        </View>
        <View style={styles.columnSection}>
          <Text style={styles.textSize}>{cliente.pecas.split(",").length}</Text>
        </View>
      </View>

      {cliente.detalhes ? (
        <View style={styles.content}>
          <View style={styles.rowSection}>
            <Text style={styles.textSize}>DETALHES</Text>
          </View>
          <View style={styles.columnSection}>
            <Text style={styles.textSize}>{cliente.detalhes}</Text>
          </View>
        </View>
      ) : null}
    </Page>
  </Document>
);

export default MyDocument;
