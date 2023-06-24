import { useState } from "react";
import { Menu, MenuProps, Layout } from "antd";
import { defaultTheme } from "../../styles/defaultTheme";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/logo.svg";
import Spider from "../../assets/icons/spider-man.svg";
import Panter from "../../assets/icons/black-panter.svg";
import Iron from "../../assets/icons/iron-man.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
const { Sider, Header } = Layout;

export const AppSidebar = () => {
  const { t } = useTranslation();
  const mobile = useMediaQuery({ maxWidth: "750px" });
  const navigate = useNavigate();
  const location = useLocation();
  const [active] = useState<string>("characters");

  const handleNavigate = (options: { key: string; keyPath: string[] }) => {
    navigate(options.keyPath.join("/"), {
      state: { from: location },
      replace: true,
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "",
      icon: (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <img src={Logo} alt="" style={{ width: "80%" }} />
        </div>
      ),
      label: "",
      style: {
        height: "100px",
        marginBottom: !mobile ? "25px" : undefined,
      },
      disabled: true,
    },
    {
      key: "characters",
      icon: <img src={Iron} alt="iron-man" style={{ height: 30 }} />,
      label: t("menu.characters"),
      style: {
        fontSize: "18px",
        fontFamily: "sans-serif",
        display: "flex",

        alignItems: "center",
      },
      onClick: handleNavigate,
    },
    {
      key: "comics",
      icon: <img src={Panter} alt="iron-man" style={{ height: 30 }} />,
      label: t("menu.comics"),
      style: {
        fontSize: "18px",
        fontFamily: "sans-serif",
        display: "flex",

        alignItems: "center",
      },
      onClick: handleNavigate,
    },
    {
      key: "movies",
      icon: <img src={Spider} alt="iron-man" style={{ height: 32 }} />,
      label: t("menu.movies"),
      style: {
        fontSize: "18px",
        fontFamily: "sans-serif",
        display: "flex",

        alignItems: "center",
      },
      onClick: handleNavigate,
    },
  ];

  return !mobile ? (
    <Sider style={{ display: "flex", alignItems: "center" }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={[active]}
        style={{
          height: "100%",
          width: "250px",
          backgroundColor: defaultTheme.colors.dark,
        }}
        items={items}
        theme="dark"
      />
    </Sider>
  ) : (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        padding: 0,
        margin: 0,
        height: "80px",
      }}
    >
      <Menu
        mode="horizontal"
        defaultSelectedKeys={[active]}
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: defaultTheme.colors.dark,
        }}
        items={items}
        theme="dark"
      />
    </Header>
  );
};
