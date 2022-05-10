import {
  Center,
  Grid,
  Button,
  GridItem,
  Divider,
  Heading,
  Box,
  Stack,
  Spacer,
} from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import moment from "moment";

import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  usePDF,
} from "@react-pdf/renderer";
import { AviSelect } from "./components/AviSelect";
import FileSaver from "file-saver";

const divisionOptions = [
  { value: "1", text: "Week" },
  { value: "2", text: "Fortnight" },
  // { value: "4", text: "Month" },
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
    const value = time.toISOString();
    const text = time.format("YYYY / MM / DD");
    options.push({ value, text });
    time.add(1, "w");
  }
  return options;
})();

interface PlannerDocumentProps {
  division: number;
  count: number;
  first: number;
  starting: string;
}

interface IDivision {
  time: string;
  count: string;
}

function PlannerDocument({
  division,
  count,
  first,
  starting,
}: PlannerDocumentProps) {
  const padding = 8;
  const margin = 2;
  const fontSize = 10;
  const color = "#555";
  const backgroundColor = "#fafafa";

  const divisions: IDivision[] = Array.from(new Array(count)).map((_, i) => {
    const time = moment(starting);
    time.add(division * i, "weeks");
    return {
      time: time.format("YYYY/MM/DD"),
      count: String(i + 1).padStart(2, "0"),
    };
  });

  return (
    <Document>
      <Page
        size="A4"
        style={{ display: "flex", flexDirection: "column", padding: 30 }}
      >
        <View
          style={{
            padding,
            paddingBottom: 0,
          }}
        >
          <View
            style={{
              margin,
              padding,
              backgroundColor,
              display: "flex",
            }}
          >
            <Text style={{ fontSize: fontSize * 1.5, color: "#444" }}>
              My Multi Week Plan
            </Text>
          </View>
        </View>
        <View
          style={{ flex: 1, display: "flex", flexDirection: "row", padding }}
        >
          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {divisions.map((d) => (
              <View
                key={d.time}
                style={{ flex: 1, padding, margin, backgroundColor }}
              >
                <Text style={{ fontSize, color }}>
                  {d.count} - {d.time}
                </Text>
              </View>
            ))}
          </View>
          <View
            style={{
              flex: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {divisions.map((d) => (
              <View
                key={d.time}
                style={{ flex: 1, padding, margin, backgroundColor }}
              >
                <Text style={{ fontSize, color }}>
                  The one thing I will achieve is...
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}

export function App() {
  const [division, setDivision] = useState("1");
  const [count, setCount] = useState("12");
  const [first, setFirst] = useState("mon");
  const [starting, setStarting] = useState(startingOptions[0].value);

  const plannerProps = useMemo(
    () => ({
      division: parseInt(division),
      count: parseInt(count),
      first: first === "mon" ? 1 : 0,
      starting,
    }),
    [count, division, first, starting]
  );

  const ref = useRef<HTMLDivElement>(null);
  const [instance, updateInstance] = usePDF({
    document: <PlannerDocument {...plannerProps} />,
  });

  async function onGeneratePDF() {
    updateInstance();
    if (instance.blob) {
      FileSaver(instance.blob, "planner.pdf");
    }
  }

  return (
    <Center w="100vw" h="100vh" p={4} bg="orange.100">
      <Grid
        p={4}
        gap={4}
        borderRadius={4}
        templateColumns="2fr 1fr"
        bg="white"
        w="100%"
        h="100%"
        overflowY="scroll"
        overflowX="auto"
      >
        <Stack gap={4} flex={1}>
          <Box ref={ref} flex={1}>
            <PDFViewer width="100%" height={ref.current?.clientHeight}>
              <PlannerDocument {...plannerProps} />
            </PDFViewer>
          </Box>
        </Stack>
        <Stack gap={1}>
          <Grid
            p={4}
            gap={4}
            borderRadius={4}
            templateColumns="1fr 3fr"
            bg="white"
          >
            <GridItem colSpan={2}>
              <Heading size="md" fontWeight={400}>
                Multi Week Plan Generator
              </Heading>
            </GridItem>
            <GridItem colSpan={2}>
              <Divider />
            </GridItem>
            <AviSelect
              label="Division"
              options={divisionOptions}
              value={division}
              onValue={setDivision}
            />
            <AviSelect
              label="Count"
              options={countOptions}
              value={count}
              onValue={setCount}
            />
            {/* <AviSelect
              label="First Day"
              options={firstOptions}
              value={first}
              onValue={setFirst}
            /> */}
            <AviSelect
              label="Starting From"
              options={startingOptions}
              value={starting}
              onValue={setStarting}
            />
          </Grid>
          <Spacer />
          <Button
            w="full"
            variant="outline"
            colorScheme="orange"
            onClick={onGeneratePDF}
          >
            Download as PDF
          </Button>
        </Stack>
      </Grid>
    </Center>
  );
}
