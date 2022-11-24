import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import commonUtil, { handleError } from "../../common/commonUtil";
import { Game } from "../../models/game";
import GameService from "../../services/GameService";
import LoaderControl from "../LoaderControl";
import { GameCharacter } from "./../../models/gameCharacter";
import GameCharactersService from "./../../services/GameCharactersService";
function GameCharacterForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<GameCharacter>(new GameCharacter());
  const [preview, setPreview] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [games, setGames] = useState<Game[]>([]);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!data.file) {
      let pre = commonUtil.getPreviewOrDefaultImage(data.image);
      setPreview(pre);
      return;
    }

    const objectUrl = URL.createObjectURL(data.file);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [data.file]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    debugger;
    if (isValid() == true) {
      let result = null;
      try {
        setLoading(true);
        let formData = new FormData();
        formData.append("file", data.file);
        delete data.file;
        formData = commonUtil.convertModelToFormData(data, formData);
        if (data.id > 0) {
          result = await GameCharactersService.update(formData);
        } else {
          result = await GameCharactersService.create(formData);
        }

        setLoading(false);
        if (result == true) {
          navigate("/gamecharacters");
        } else {
          alert("Record not saved");
        }
      } catch (error) {
        setLoading(false);
        handleError(error);
      }
    }
  }

  function isValid() {
    if (!data.name) {
      alert("Name is required");
      return false;
    } else if (!data.gameId || data.gameId == 0) {
      alert("Please select game");
      return false;
    }

    return true;
  }

  const getData = async (id: number) => {
    setLoading(true);

    const record = await GameCharactersService.getById(id);
    setLoading(false);
    if (record && record.image) {
      debugger;
      // let pre = constantsUtils.fileUrl + record.image;
      // setPreview(pre);
    }
    setData(record);
  };

  function handleChange(e: any) {
    const { id, name, value, type, files, file } = e.target;
    let localData: any = { ...data };
    debugger;
    if (name) {
      if (type == "file" && value.length > 0) {
        localData[name] = files[0];
      } else {
        localData[name] = value;
      }
      setData(localData);
    }
  }

  useEffect(() => {
    const abortController = new AbortController();
    // Some synchronous code.
    const getLoadData = async () => {
      const games = await GameService.getAll();
      setGames(games);
    };

    getLoadData();
    if (id && Number(id) > 0) {
      getData(Number(id));
    } else {
      setPreview(commonUtil.getPreviewOrDefaultImage(""));
    }
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
        <div className="col-12">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-12 col-md-9">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      name="name"
                      id="name"
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={data.name}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="formFile" className="form-label">
                      Image
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="file"
                      name="file"
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="gameId" className="form-label">
                      Game
                    </label>
                    <select
                      name="gameId"
                      id="gameId"
                      className="form-control"
                      onChange={handleChange}
                      value={data.gameId}
                    >
                      <option value={""}>Select Game</option>
                      {games &&
                        games.map((s, i) => {
                          return (
                            <option key={i} value={s.id}>
                              {s.title}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-3">
                <img
                  src={preview}
                  className="border"
                  alt="No image found"
                  style={{
                    width: "150px",
                    height: "150px",
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12 text-end">
                <button type="submit" className="btn btn-primary me-2">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/gamecharacters");
                  }}
                  className="btn btn-primary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
}

export default GameCharacterForm;
