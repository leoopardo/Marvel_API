/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCharacter } from "../../service/characters/getCharacter";
import { Row, Col, Typography, Carousel, Image, Spin } from "antd";
import { defaultTheme } from "../../styles/defaultTheme";
import { queryClient } from "../../service/queryClient";
import { useMediaQuery } from "react-responsive";
import { useGetComicsColection } from "../../service/colections/comics";
import { ColCard, ColCarousel } from "./style";
import { useGetSeriesColection } from "../../service/colections/series";
import { useTranslation } from "react-i18next";
const { Title } = Typography;

export const Character = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const mobile = useMediaQuery({ maxWidth: 750 });
  const { character, refetch, isFetching } = useGetCharacter(id);
  const { comicsColection, comicsColectionRefetch } = useGetComicsColection(id);
  const { seriesColection, seriesColectionRefetch } = useGetSeriesColection(id);

  const [cache] = useState<any>(queryClient.getQueryData(["character"]));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (id == cache?.data.results[0].id) {
      return;
    }
    refetch();
    comicsColectionRefetch();
    seriesColectionRefetch();
  }, [id]);

  console.log(comicsColection);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        overflow: "auto",
        maxHeight: !mobile ? "100vh" : "90vh",
      }}
    >
      <Row
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Col xs={24}>
          <div
            style={{
              backgroundImage: `linear-gradient(#2020202e, #202020), url(${character?.thumbnail?.path}.${character?.thumbnail?.extension})`,
              width: "100%",
              height: "400px",
              backgroundPosition: "center",
            }}
          >
            {isFetching ? (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Spin />
              </div>
            ) : (
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
                  style={{
                    color: defaultTheme.colors.text,
                    fontWeight: 800,
                    textAlign: "center",
                  }}
                >
                  {character?.name.toLocaleUpperCase()}
                </Title>
              </div>
            )}
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={18} xl={18}>
          <div style={{ width: "100%" }}>
            <Title
              level={4}
              style={{
                color: defaultTheme.colors.text,
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {character?.description}
            </Title>
          </div>
        </Col>
      </Row>
      <Row
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {[comicsColection, seriesColection].map((type, index) => (
          <Col
            xs={24}
            style={{
              borderRadius: "6px",
              paddingBottom: "50px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              flexWrap: "wrap",
              backgroundColor:
                index % 2 === 0 ? "#202020" : defaultTheme.colors.text,
            }}
          >
            <Title
              lang="4"
              style={{
                color: index % 2 === 0 ? defaultTheme.colors.text : "#202020",
                width: "100%",
                fontWeight: 800,
                margin: 0,
                padding: 20,
                textAlign: "center",
              }}
            >
              {type === comicsColection
                ? t("text.comics").toUpperCase()
                : t("text.series").toUpperCase()}
            </Title>
            <Row
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {type?.data?.results[0] && (
                <ColCard xs={24} sm={24} md={24} lg={12} xl={5}>
                  <Image
                    src={`${type?.data?.results[0]?.thumbnail?.path}/portrait_uncanny.${type?.data?.results[0].thumbnail.extension}`}
                  />
                </ColCard>
              )}

              {type?.data?.results[1] && (
                <ColCard xs={24} sm={24} md={24} lg={12} xl={5}>
                  <Image
                    src={`${type?.data?.results[1]?.thumbnail?.path}/portrait_uncanny.${type?.data?.results[1].thumbnail.extension}`}
                  />
                </ColCard>
              )}

              {type?.data?.results[2] && (
                <ColCard xs={24} sm={24} md={24} lg={12} xl={5}>
                  <Image
                    src={`${type?.data?.results[2].thumbnail?.path}/portrait_uncanny.${type?.data?.results[2].thumbnail.extension}`}
                  />
                </ColCard>
              )}
              {type?.data?.results[3] && (
                <ColCarousel xs={24} sm={24} md={24} lg={12} xl={5}>
                  <Title
                    level={5}
                    style={{
                      color: defaultTheme.colors.text,
                      width: "100%",
                    }}
                  >
                    {t("text.others")}
                  </Title>
                  <Carousel
                    autoplay
                    centerMode
                    dotPosition="right"
                    style={{
                      maxWidth: "300px",
                      maxHeight: "400px",
                      borderRadius: "6px",
                    }}
                  >
                    {type?.data.results.map((comic, index) => {
                      switch (index) {
                        case 0:
                        case 1:
                        case 2:
                          return;
                        default:
                          return (
                            <>
                              <Image
                                preview={false}
                                height={300}
                                src={`${comic?.thumbnail?.path}/portrait_uncanny.${comic?.thumbnail?.extension}`}
                                loading="eager"
                                onClick={() => setVisible(true)}
                              />
                              <div style={{ display: "none" }}>
                                <Image.PreviewGroup
                                  preview={{
                                    visible,
                                    onVisibleChange: (vis) => setVisible(vis),
                                  }}
                                >
                                  {comicsColection?.data.results.map(
                                    (preview) => (
                                      <Image
                                        src={`${preview?.thumbnail?.path}.${preview?.thumbnail?.extension}`}
                                      />
                                    )
                                  )}
                                </Image.PreviewGroup>
                              </div>
                            </>
                          );
                      }
                    })}
                  </Carousel>
                </ColCarousel>
              )}
            </Row>
          </Col>
        ))}
      </Row>
    </div>
  );
};
