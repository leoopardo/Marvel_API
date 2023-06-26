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
import { StyledRow, StyledSpaceCards } from "./style";
import { motion } from "framer-motion";
const { Meta } = Card;

export const Characters = () => {
  const { t } = useTranslation();
  const mobile = useMediaQuery({ maxWidth: 750 });

  const [query, setQuery] = useState<CharactersQuery>({
    limit: 100,
    orderBy: "name",
  });

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
      <StyledRow>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={8}
          xl={8}
          style={{
            height: "100px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "4%",
            justifyContent: "start",
          }}
        >
          <Space.Compact block direction="horizontal" size="large">
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
                searchRef.current.input.value = "";
                searchRef.current.input.defaultValue = "";
              }}
            >
              {t("button.remove_filters")}
            </Button>
          </Space.Compact>
        </Col>
      </StyledRow>

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

      <StyledSpaceCards ref={divRef} direction="vertical" size="large">
        {isFetching &&
          !characters &&
          isFetchingArray.map(() => (
            <Card loading hoverable style={{ width: 240 }} />
          ))}
        {!isError &&
          characters?.total !== 0 &&
          characters?.results.map((character) => (
            <motion.div
              whileHover={{
                scale: 1.2,
                zIndex: 9999,
                margin: "20px",
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 1.1, margin: 10 }}
              transition={{bounce: 0.6, type: "spring"}}
            >
              <Card
                loading={isFetching}
                hoverable
                onClick={
                  !isFetching
                    ? () => setTimeout(() => navigate(`/character/${character.id}`), 200) 
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
            </motion.div>
          ))}
      </StyledSpaceCards>
    </div>
  );
};
