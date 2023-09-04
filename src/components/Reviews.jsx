import axios from "axios";
import { useEffect, useState } from "react";
import { baseImgUrl, options2 } from "../utils/constants";
import Unknowm from "../assets/unknown.jpg";
import StringArea from "./StringArea";

const Reviews = ({ detail }) => {
  const [reviews, setReviews] = useState(null);
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    axios
      .get(`/movie/${detail.id}/reviews?language=en-US&page=1`, options2)
      .then((res) => setReviews(res.data.results))
      .catch((err) => console.log(err));
  }, []);
  console.log(detail.id);
  return (
    <div className="p-4 text-dark">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12 ">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h4 className="text-white mb-0">Yorumlar ({reviews?.length})</h4>
            <div className=" border rounded-3 bg-white">
              <div className="card-body p-2 d-flex align-items-center">
                {showFull ? (
                  <h6 className="text-primary fw-bold small mb-0 me-1">
                    Yorumlar "ON"
                  </h6>
                ) : (
                  <h6 className="text-secondary fw-bold small mb-0 me-1">
                    Yorumlar "OFF"
                  </h6>
                )}
                <div
                  className="form-check form-switch"
                  onClick={() => setShowFull(!showFull)}
                >
                  {showFull ? (
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      checked
                    />
                  ) : (
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                    />
                  )}
                  <label
                    className="form-check-label"
                    for="flexSwitchCheckChecked"
                  ></label>
                </div>
              </div>
            </div>
          </div>
          {reviews?.length <= 0 && (
        
            <h1 className="text-white text-center mt-5">
              Henüz yorum yapılmadı...
            </h1>
          
          )}
          {showFull &&
            reviews?.map((review) => (
              <div className="card review mb-3" key={review.id} style={{minHeight:"220px"}}>
                <div className="card-body">
                  <div className="d-flex flex-column">
                    <div className="d-flex flex-row">
                      {review.author_details.avatar_path ? (
                        <img
                          src={`${baseImgUrl}${review.author_details.avatar_path}`}
                          className="rounded-circle shadow-1-strong me-3"
                          style={{ width: "40px", height: "40px" }}
                        />
                      ) : (
                        <img
                          src={Unknowm}
                          className="rounded-circle shadow-1-strong me-3"
                          style={{ width: "40px", height: "40px" }}
                        />
                      )}

                      <div>
                        <h6 className="text-primary fw-bold mb-0 text-start">
                          {review.author}{" "}
                          <span className="fw-medium text-dark">
                            ({review.author_details.username})
                          </span>
                        </h6>
                        <p className="mb-0">
                          {review.created_at.substring(0, 10)}
                        </p>
                      </div>
                    </div>

                    <div className="w-100">
                      <div className="d-flex flex-column justify-content-between align-items-center mb-2">
                        <StringArea text={review.content} max={200} />
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p
                          className="fs-6 mb-0 gap-2"
                          style={{ color: "#aaa" }}
                        >
                          <a href="#!" className="link-grey">
                            Remove
                          </a>{" "}
                          •
                          <a href="#!" className="link-grey">
                            Reply
                          </a>{" "}
                          •
                          <a href="#!" className="link-grey">
                            Translate
                          </a>
                        </p>
                        <div className="d-flex flex-row me-4">
                          <i
                            className={`fas fa-star me-2 ${
                              review.author_details.rating > 4
                                ? "text-warning"
                                : "text-secondary"
                            } `}
                          ></i>
                          <i
                            className={`${
                              review.author_details.avatar_path
                                ? "far fa-check-circle text-success"
                                : "fa fa-minus-circle text-danger"
                            }`}
                            style={{ color: " #aaa" }}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
