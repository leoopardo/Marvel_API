import React from "react";
import { Result } from "antd";
import notFound from "../../assets/notfount.png";
import { useTranslation } from "react-i18next";
import { defaultTheme } from "../../styles/defaultTheme";

export const NofFound = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        width: "100%",
        height: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Result
        icon={<img src={notFound} style={{ width: "60%" }} />}
        title="404"
        subTitle={t("messages.404")}
        style={{ color: defaultTheme.colors.text }}
      />
    </div>
  );
};
