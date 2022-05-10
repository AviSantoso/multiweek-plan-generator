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
  useToast,
} from "@chakra-ui/react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";
import useMeasure from "react-use-measure";

import { AppVm } from "./AppVm";
import { AviInput } from "./components/avi/AviInput";
import { AviSelect } from "./components/avi/AviSelect";
import { AviTextarea } from "./components/avi/AviTextarea";
import { PlannerDocument } from "./components/PlannerDocument";

export const App = observer(() => {
  const toast = useToast();
  const vm = useMemo(() => new AppVm(), []);

  useEffect(() => {
    vm.init();
  }, [vm]);

  const divisions = useMemo(
    () => JSON.parse(JSON.stringify(vm.divisions)),
    [vm.divisions]
  );

  const [ref, bounds] = useMeasure();

  if (!vm.isReady) {
    return null;
  }

  async function onRefreshPreview() {
    try {
      vm.refreshDivisions();
      toast({
        description: "Successfully refreshed preview.",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      toast({ description: "" + error, status: "error", isClosable: true });
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
            <PDFViewer width="100%" height={bounds.height}>
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
            <GridItem colSpan={2}>
              <Divider />
            </GridItem>
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
            <GridItem colSpan={2}>
              <Button
                w="full"
                variant="outline"
                colorScheme="blue"
                onClick={onRefreshPreview}
              >
                Refresh Preview
              </Button>
            </GridItem>
          </Grid>
          <Spacer />
          <PDFDownloadLink
            document={
              <PlannerDocument title={vm.title} divisions={divisions} />
            }
            fileName="planner.pdf"
          >
            {({ loading, error }) => (
              <Button
                w="full"
                variant="outline"
                colorScheme="orange"
                disabled={loading}
                pointerEvents="none"
              >
                {error ? error : "Download Preview"}
              </Button>
            )}
          </PDFDownloadLink>
        </Stack>
      </Grid>
    </Center>
  );
});
