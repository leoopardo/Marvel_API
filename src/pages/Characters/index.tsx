/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { CharactersQuery } from "../../service/types/characters/characters.interface";
import { useGetCharacters } from "../../service/characters/getCharacters";
import { Card, Space, Input, Result, Col, Row } from "antd";
import noRecords from "../../assets/noRecords.png";
import Error from "../../assets/error.png";
import { useDebounce } from "../../utils/useDebounce";
import { defaultTheme } from "../../styles/defaultTheme";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

export const Characters = () => {
  const { t } = useTranslation();
  const mobile = useMediaQuery({ maxWidth: 750 });
  const isFetchingArray = new Array(25).fill(null);
  const divRef = useRef<any>(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState<CharactersQuery>({
    limit: 100,
    orderBy: "name",
  });
  const { characters, isError, isFetching, refetch } = useGetCharacters(query);
  const { debounce } = useDebounce(setQuery, "nameStartsWith");

  useEffect(() => {
    refetch();
  }, [query]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    divRef?.current?.scrollTo({ top: 0, behavior: "smooth" });
    if (!value) {
      const q = { ...query };
      delete q.nameStartsWith;
      return setQuery(q);
    }
    debounce(value);
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          marginBottom: 20,
          paddingLeft: "2%",
        }}
      >
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Input
            size="large"
            placeholder={t("input.search")}
            onChange={handleChange}
          />
        </Col>
      </Row>

      {characters?.total === 0 && (
        <Result
          icon={<img src={noRecords} style={{ width: "60%" }} />}
          title={<p style={{ color: defaultTheme.colors.text }}>400</p>}
          subTitle={
            <p style={{ color: defaultTheme.colors.text }}>
              {t("messages.400")}
            </p>
          }
          style={{ color: defaultTheme.colors.text }}
        />
      )}
      {isError && (
        <Result
          icon={<img src={Error} style={{ width: "60%" }} />}
          title={<p style={{ color: defaultTheme.colors.text }}>500</p>}
          subTitle={
            <p style={{ color: defaultTheme.colors.text }}>
              {t("messages.500")}
            </p>
          }
          style={{ color: defaultTheme.colors.text }}
        />
      )}

      <Space
        ref={divRef}
        direction="vertical"
        size="middle"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          maxHeight: "100%",
          overflow: "auto",
        }}
      >
        {isFetching &&
          !characters &&
          isFetchingArray.map(() => (
            <Card loading hoverable style={{ width: 240 }} />
          ))}
        {!isError &&
          characters?.total !== 0 &&
          characters?.results.map((character) => (
            <Card
              loading={isFetching}
              hoverable
              onClick={
                !isFetching
                  ? () => navigate(`/character/${character.id}`)
                  : undefined
              }
              style={{ width: mobile ? "80vw" : 240 }}
              cover={
                <img
                  alt={character.name}
                  src={`${character.thumbnail.path}/landscape_incredible.${character.thumbnail.extension}`}
                />
              }
            >
              <Meta
                title={character.name}
                description={`${character.description.substring(0, 50)}...`}
              />
            </Card>
          ))}
      </Space>
    </div>
  );
};
