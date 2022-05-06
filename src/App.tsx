import {
  Center,
  Grid,
  Button,
  GridItem,
  Divider,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import moment from "moment";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  usePDF,
} from "@react-pdf/renderer";
import FileSaver from "file-saver";

import { AviSelect } from "./components/AviSelect";

const divisionOptions = [
  { value: "1", text: "Week" },
  { value: "2", text: "Fortnight" },
  { value: "4", text: "Four Weeks" },
];

const firstOptions = [
  { value: "mon", text: "Monday" },
  { value: "sun", text: "Sunday" },
];

const countOptions = Array.from(new Array(20)).map((_, i) => {
  const item = `${i + 1}`;
  return { value: item, text: item };
});

const startingOptions = (() => {
  const options = [];
  let time = moment().day(0);
  for (let i = 0; i < 8; i++) {
    const value = "" + time.utc();
    const text = time.format("YYYY / MM / DD");
    options.push({ value, text });
    time.add(1, "w");
  }
  return options;
})();

function MyDocument() {
  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
}

export function App() {
  const [division, setDivision] = useState("1");
  const [count, setCount] = useState("1");
  const [first, setFirst] = useState("mon");
  const [starting, setStarting] = useState("");

  const [instance, updateInstance] = usePDF({ document: <MyDocument /> });

  if (instance.loading) return <div>Loading ...</div>;
  if (instance.error) return <div>Something went wrong: {instance.error}</div>;

  async function onGeneratePDF() {
    if (instance.blob) {
      FileSaver(instance.blob, "planner.pdf");
    }
  }

  return (
    <Center w="100vw" h="100vh" p={4} overflow="auto" bg="orange.100">
      <Grid p={4} gap={4} borderRadius={4} templateColumns="1fr 3fr" bg="white">
        <GridItem colSpan={2}>
          <Heading size="md" fontWeight={400}>
            Multi Week Plan Generator
          </Heading>
        </GridItem>
        <GridItem colSpan={2}>
          <Divider />
        </GridItem>
        <AviSelect
          label="Division Size"
          options={divisionOptions}
          value={division}
          onValue={setDivision}
        />
        <AviSelect
          label="Division Count"
          options={countOptions}
          value={count}
          onValue={setCount}
        />
        <AviSelect
          label="First Day"
          options={firstOptions}
          value={first}
          onValue={setFirst}
        />
        <AviSelect
          label="Starting From"
          options={startingOptions}
          value={starting}
          onValue={setStarting}
        />
        <GridItem colSpan={2}>
          <Divider />
        </GridItem>
        <GridItem colSpan={2}>
          <Button
            variant="outline"
            colorScheme="orange"
            w="full"
            onClick={onGeneratePDF}
          >
            Generate PDF
          </Button>
        </GridItem>
        {/* <GridItem colSpan={2} h="0" bg="gray" paddingBottom="140%"></GridItem> */}
      </Grid>
    </Center>
  );
}
