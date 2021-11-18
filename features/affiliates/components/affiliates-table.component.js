import React from "react";
import { DataTable } from "react-native-paper";

// COMPONENTS
import { Text } from "../../../components/typography/text.component";
import { Title } from "./affiliates.styles";

export const AffiliatesTable = ({ columns, rows }) => {
  return (
    <DataTable style={{ backgroundColor: "#FFF", borderRadius: 10, padding: 10 }}>
      <DataTable.Header>
        {columns.map((c) => (
          <DataTable.Title key={c.title}>
            <Title>{c.title}</Title>
          </DataTable.Title>
        ))}
      </DataTable.Header>
      {rows.map((r, i) => (
        <DataTable.Row style={{ borderBottomColor: "green", borderBottomWidth: 1 }} key={i}>
          <DataTable.Cell>{r.name}</DataTable.Cell>
          <DataTable.Cell style={{ paddingLeft: 10 }}>
            <Text variant="bold" style={{ color: r.status === "completado" ? "#0D8284" : "#AFAFAF" }}>
              {r.status}
            </Text>
          </DataTable.Cell>
          <DataTable.Cell>{r.reward}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};
