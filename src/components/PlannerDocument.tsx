import { Document, Page, Text, View } from "@react-pdf/renderer";

import { IDivision } from "../types/IDivision";

export interface PlannerDocumentProps {
  title: string;
  divisions: IDivision[];
}

export function PlannerDocument({ title, divisions }: PlannerDocumentProps) {
  const padding = 8;
  const margin = 2;
  const fontSize = 10;
  const color = "#555";
  const backgroundColor = "#fafafa";

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
              {title}
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
                key={d.number}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "row",
                  padding,
                  margin,
                  backgroundColor,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    padding: padding / 2,
                    margin: margin / 2,
                  }}
                >
                  <Text style={{ flex: 1, fontSize, color }}>Div</Text>
                  <Text style={{ flex: 1, fontSize, color }}>From</Text>
                  <Text style={{ flex: 1, fontSize, color }}>To</Text>
                </View>
                <View
                  style={{
                    flex: 3,
                    display: "flex",
                    flexDirection: "column",
                    padding: padding / 2,
                    margin: margin / 2,
                  }}
                >
                  <Text style={{ flex: 1, fontSize, color }}># {d.number}</Text>
                  <Text style={{ flex: 1, fontSize, color }}>{d.starting}</Text>
                  <Text style={{ flex: 1, fontSize, color }}>{d.ending}</Text>
                </View>
              </View>
            ))}
          </View>
          <View
            style={{
              flex: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {divisions.map((d) => (
              <View
                key={d.number}
                style={{ flex: 1, padding, margin, backgroundColor }}
              >
                <Text style={{ fontSize, color }}>{d.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
