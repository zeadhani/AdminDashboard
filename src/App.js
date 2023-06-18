import React from "react";
import { ColorModeContext, useMode } from "./Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import SideBarContainer from "./components/global/sidebar/sideBarContainer";
import ToastMessage from "./components/global/ToastMessage";
import "react-toastify/dist/ReactToastify.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import RouteComponent from "./components/auth/RouteComponent";

function App() {
  const [theme, colorMode] = useMode();
  const queryClient = new QueryClient();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <div className="app">
            <SideBarContainer />
            <main className="content">
              <RouteComponent />
              <ToastMessage />
            </main>
          </div>
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
