/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetCharacter } from "../../service/characters/getCharacter";
import { Row, Col, Typography } from "antd";
import { defaultTheme } from "../../styles/defaultTheme";
const { Title } = Typography;

export const Character = () => {
  const { id } = useParams();
  const { character, refetch } = useGetCharacter(id);

  useEffect(() => {
    refetch();
  }, [id]);
  console.log(character);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Row style={{ width: "100%" }}>
        <Col xs={24}>
          <div
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${character?.thumbnail?.path}.${character?.thumbnail?.extension})`,
              width: "100%",
              height: "400px",
              backgroundPosition: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row-reverse",
                paddingRight: "5%",
                paddingLeft: "2%",
              }}
            >
              <Title
                style={{ color: defaultTheme.colors.text, fontWeight: 800 }}
              >
                {character?.name.toLocaleUpperCase()}
              </Title>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
