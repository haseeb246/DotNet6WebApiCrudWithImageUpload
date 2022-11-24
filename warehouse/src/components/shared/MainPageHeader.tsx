import { useState } from "react";
import { Link } from "react-router-dom";

const MainPageHeader = () => {
  const [active, setActive] = useState<boolean>(false);
  function handleClickMenu(e: any) {
    debugger;

    const links = document.querySelectorAll(".nav-link");

    links.forEach((link) => {
      // ✅ Remove class from each element
      link.classList.remove("active");

      // ✅ Add class to each element
      // box.classList.add('small');
    });
    e.target.classList.add("active");
  }

  return (
    <header className="p-3 mb-3 border-bottom">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul className="nav nav-pills col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li className="nav-item">
            <Link
              to="/"
              className={"nav-link px-2 active"}
              onClick={handleClickMenu}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/games"
              className={"nav-link px-2"}
              onClick={handleClickMenu}
            >
              Games
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/gamecharacters"
              className={"nav-link px-2"}
              onClick={handleClickMenu}
            >
              Game Characters
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/delete-orders"
              className={"nav-link px-2"}
              onClick={handleClickMenu}
            >
              Slett ordre
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default MainPageHeader;
