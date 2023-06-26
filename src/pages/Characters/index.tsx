/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { CharactersQuery } from "../../service/types/characters/characters.interface";
import { useGetCharacters } from "../../service/characters/getCharacters";
import { Card, Space, Input, Result, Col, Row, Button } from "antd";
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

  const [query, setQuery] = useState<CharactersQuery>({
    limit: 100,
    orderBy: "name",
  });
  const [search, setSearch] = useState<string>("");

  const isFetchingArray = new Array(25).fill(null);
  const divRef = useRef<any>(null);
  const searchRef = useRef<any>("");
  const navigate = useNavigate();
  const { characters, isError, isFetching, refetch } = useGetCharacters(query);
  const { debounce } = useDebounce(setQuery, "nameStartsWith");
  const queryRef = useRef<CharactersQuery>(query);

  useEffect(() => {
    if (queryRef.current !== query) {
      refetch();
    }
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
        {" "}
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Space.Compact
            style={{ width: "100%" }}
            block
            direction="horizontal"
            size="large"
          >
            <Input
              ref={searchRef}
              style={{ width: "60%" }}
              size="large"
              placeholder={t("input.search")}
              onChange={handleChange}
            />
            <Button
              style={{ width: "40%" }}
              size="large"
              type="primary"
              onClickCapture={() => {
                delete query.nameStartsWith;
                setQuery({
                  limit: 100,
                  orderBy: "name",
                });
                refetch();
                setSearch("");
                searchRef.current.input.value = ""
                searchRef.current.input.defaultValue = ""
              }}
            >
              {t("button.remove_filters")}
            </Button>
          </Space.Compact>
        </Col>
      </Row>

      {characters?.total === 0 && !isError && (
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
