import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail(){
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState([]);

    const getMovie = async () => {
        console.log(id);
        const res = await fetch(
          `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
        );
        const json = await res.json();
        setDetail(json.data.movie);
        setLoading(false);
      };
    useEffect(() => {
        getMovie();
    }, []);
    return (
        <div className={styles.container}>
          {loading ? (
            <div className={styles.loader}>
              <h1>Loading movie detail....</h1>
            </div>
          ) : (
            <div className={styles.movie}>
              <img src={detail.large_cover_image} className={styles.movie__img}></img>
              <div>
                <h1 className={styles.movie__title}>
                  {detail.title}
                </h1>
                <h3 className={styles.movie__year}>{detail.year}</h3>
                <ul className={styles.movie__genres}>
                  {detail.genres.map((g) => (
                    <li key={g}>{g}|</li>
                  ))}
                </ul>
                <h3 className={styles.movie__rating}>
                  ★ {detail.rating}
                </h3>
                <hr/>
                <p>{detail.description_full}</p>
              </div>
            </div>
          )}
        </div>
      );
    }

export default Detail;