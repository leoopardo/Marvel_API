import { Col } from "antd";
import { styled } from "styled-components";

export const ColCard = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ColCarousel = styled(Col)`
  display: flex;
  align-items: center;

  flex-direction: column;
  max-height: 400px;
  overflow: hidden;
  margin-left: 50px;
`;
