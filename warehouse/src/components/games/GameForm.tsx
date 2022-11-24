import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import commonUtil, { handleError } from "../../common/commonUtil";
import { Game } from "../../models/game";
import GameService from "../../services/GameService";
import LoaderControl from "../LoaderControl";
import constantsUtils from "./../../common/constantsUtil";
const noImageFound = require("../../assets/images/No-image-found.jpg");
function GameForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<Game>(new Game());
  const [preview, setPreview] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  // require("../assets/images/No-image-found.jpg") as any

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
          result = await GameService.update(formData);
        } else {
          result = await GameService.create(formData);
        }

        setLoading(false);
        if (result == true) {
          navigate("/games");
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
    if (!data.title) {
      alert("Title is required");
      return false;
    } else if (!data.platform) {
      alert("Platform is required");
      return false;
    } else if (!data.releaseYear) {
      alert("Release year is required");
      return false;
    }

    return true;
  }

  const getData = async (id: number) => {
    setLoading(true);
    const record = await GameService.getById(id);
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
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      name="title"
                      id="title"
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={data.title}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="platform" className="form-label">
                      Platform
                    </label>
                    <input
                      name="platform"
                      id="platform"
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={data.platform}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="releaseYear" className="form-label">
                      Release Year
                    </label>
                    <input
                      name="releaseYear"
                      id="releaseYear"
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={data.releaseYear}
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
                    navigate("/games");
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

export default GameForm;
