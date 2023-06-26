import { Row, Space } from "antd";
import { styled } from "styled-components";

export const StyledRow = styled(Row)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",
  alignItems: "center",
  marginBottom: "20px",
  paddingLeft: "2%",
}));

export const StyledSpaceCards = styled(Space)(() => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  maxHeight: "100%",
  minHeight: "80%",
  minWidth: "100%",
  overflow: "auto",
}));
