import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { options } from "../utils/constants";
import axios from "axios";
import DetailHero from "../components/DetailHero";
import Cast from "../components/Cast";
import Reviews from "../components/Reviews";
import Recommend from "../components/Recommend";
import CardImg from "../components/CardImg";

const DetailPage = () => {
  const { movieId } = useParams();
  const [detail, setDetail] = useState();
  console.log(movieId);
  useEffect(() => {
    axios
      .get(`/movie/${movieId}`, options)
      .then((res) => setDetail(res.data))
      .catch((err) => console.log(err));
  }, []);

  //console.log(detail);
  return (
    
    <div>
      {detail && (
       <> 
          <div className="row  px-4 pt-3">
            <DetailHero detail={detail} />
          </div>
          <div>
            <Recommend detail={detail} />
          </div>
          <div>
            <CardImg detail={detail} />
          </div>
          <div>
            <Cast detail={detail} />
          </div>
          <div>
            <Reviews detail={detail} />
          </div>
       </>
      )}
    </div> 
  );
};

export default DetailPage;
