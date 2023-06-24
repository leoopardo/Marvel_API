import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { NofFound } from "../pages/404";
import { Characters } from "../pages/Characters";
import { Character } from "../pages/Character";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/character/:id" element={<Character />} />
      <Route path="/comics" element={<Home />} />
      <Route path="/movies" element={<Home />} />
      <Route path="*" element={<NofFound />} />
    </Routes>
  );
};
