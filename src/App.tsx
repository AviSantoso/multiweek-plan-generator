import {
  Box,
  Button,
  Center,
  Divider,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { PDFViewer, usePDF } from "@react-pdf/renderer";
import FileSaver from "file-saver";
import { useEffect, useMemo, useRef } from "react";

import { AppVm } from "./AppVm";
import { AviInput } from "./components/avi/AviInput";
import { AviSelect } from "./components/avi/AviSelect";
import { AviTextarea } from "./components/avi/AviTextarea";
import { PlannerDocument } from "./components/PlannerDocument";

export function App() {
  const vm = useMemo(() => new AppVm(), []);

  useEffect(() => {
    vm.init();
  }, [vm]);

  const divisions = vm.getDivisions();

  const ref = useRef<HTMLDivElement>(null);

  const [instance, updateInstance] = usePDF({
    document: <PlannerDocument title={vm.title} divisions={divisions} />,
  });

  if (!vm.isReady) {
    return null;
  }

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
              <PlannerDocument title={vm.title} divisions={divisions} />
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
            <AviInput label="Title" value={vm.title} onValue={vm.setTitle} />
            <AviSelect
              label="Division"
              options={vm.divisionOptions}
              value={vm.division}
              onValue={vm.setDivision}
            />
            <AviSelect
              label="Count"
              options={vm.countOptions}
              value={vm.count}
              onValue={vm.setCount}
            />
            <AviSelect
              label="Starting From"
              options={vm.startingOptions}
              value={vm.starting}
              onValue={vm.setStarting}
            />
            <AviTextarea
              label="Division Text"
              value={vm.text}
              onValue={vm.setText}
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
