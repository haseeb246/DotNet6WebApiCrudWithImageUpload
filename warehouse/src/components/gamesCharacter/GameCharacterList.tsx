import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Game } from "../../models/game";
import GameService from "../../services/GameService";
import LoaderControl from "../LoaderControl";
import commonUtil, { handleError } from "../../common/commonUtil";
import { GameCharacter } from "./../../models/gameCharacter";
import GameCharactersService from "../../services/GameCharactersService";

function GameCharacterList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<GameCharacter[]>([]);

  function handleEditClick(row: GameCharacter, index: number) {
    if (row && row.id) {
      navigate("/gamecharacter/" + row.id);
    }
  }
  async function handleAddClick() {
    navigate("/gamecharacter");
  }
  async function handleDeleteClick(row: GameCharacter, index: number) {
    if (row && row.id) {
      try {
        setLoading(true);
        const success = await GameCharactersService.deleteRecord(row.id);
        setLoading(false);
        if (success == true) {
          getData();
        } else {
          alert("Record not deleted");
        }
      } catch (error) {
        handleError(error);
      }
    }
  }

  const getData = async () => {
    setLoading(true);

    const list = await GameCharactersService.getAll();
    setLoading(false);
    setData(list);
  };

  useEffect(() => {
    const abortController = new AbortController();
    // Some synchronous code.
    getData();

    return () => {
      // Component unmount code.
      abortController.abort();
    };
  }, []);
  return (
    <Fragment>
      {loading == true ? (
        <LoaderControl />
      ) : (
        <div className="row">
          <div className="col-sm-12">
            <button
              type="button"
              className="btn btn-info float-end"
              onClick={() => handleAddClick()}
            >
              Add New
            </button>
          </div>
          <div className="col-sm-12">
            {data && data.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Game</th>
                    <th scope="col">Image</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{item.name}</th>
                        <td>{item.game.title}</td>
                        <td>
                          <img
                            style={{
                              width: "40px",
                              height: "40px",
                            }}
                            src={commonUtil.getPreviewOrDefaultImage(
                              item.image
                            )}
                          ></img>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => handleEditClick(item, index)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Do you want to delete the record " +
                                    item.name +
                                    " ?"
                                )
                              ) {
                                handleDeleteClick(item, index);
                              }
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <h3>No record found.</h3>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default GameCharacterList;
