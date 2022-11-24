import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPageHeader from "./components/shared/MainPageHeader";
import { HomePage, DeleteOrderPage } from "./pages";
import GameList from "./components/games/GameList";
import GameForm from "./components/games/GameForm";
import GameCharacterList from "./components/gamesCharacter/GameCharacterList";
import GameCharacterForm from "./components/gamesCharacter/GameCharacterForm";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <MainPageHeader />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/games" element={<GameList />}></Route>
            <Route path="/game" element={<GameForm />}></Route>
            <Route path="/game/:id" element={<GameForm />}></Route>

            <Route
              path="/gamecharacters"
              element={<GameCharacterList />}
            ></Route>
            <Route
              path="/gamecharacter"
              element={<GameCharacterForm />}
            ></Route>
            <Route
              path="/gamecharacter/:id"
              element={<GameCharacterForm />}
            ></Route>

            <Route path="/delete-orders" element={<DeleteOrderPage />}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
