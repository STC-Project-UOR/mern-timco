import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import AddPage from "./pages/AddPage";
import ActionPage from "./pages/ActionPage";
import HomePage from "./pages/HomePage";
import StorePage from "./pages/StorePage";
import CreatePage from "./pages/CreatePage";
import ClassificationPage from "./pages/Classificationpage";

function App() {
  return (
    <Box minH={"100vh"}>
      <Navbar />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/action/:id" element={<ActionPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/classification" element={<ClassificationPage />} />
        </Routes>
      </Layout>
    </Box>
  );
}

export default App;
