import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";import i18n from "./i18n";
import { Layout, ConfigProvider } from "antd";
import { ThemeProvider } from "styled-components";
import { AppSidebar } from "./components/AppSidebar";
import { I18nextProvider } from "react-i18next";
import { GlobalStyle } from "./styles/globalStyles";
import { defaultTheme } from "./styles/defaultTheme";
const { Sider, Content } = Layout;

function App() {
  return (
    <I18nextProvider i18n={i18n} defaultNS={"translation"}>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: defaultTheme.colors.secondary,
                colorBgTextHover: defaultTheme.colors.secondary,
              },
            }}
          >
          
              <Layout style={{ height: "100vh", }}>
                <Sider style={{ display: "flex", alignItems: "center" }}>
                  <AppSidebar />
                </Sider>
                <Content style={{ padding: "0 24px", minHeight: 280 }}>
                  <AppRoutes />
                </Content>
              </Layout>
       
          </ConfigProvider>
        </BrowserRouter>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
