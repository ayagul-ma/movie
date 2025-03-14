import axios from "axios";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../constants";

type MovieType = {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  video: boolean;
  orginal_language: string;
  orginal_title: string;
  vote_average: number;
  overview: string;
};

export default function TopRated() {
  const [topRatedList, setTopRatedList] = useState<MovieType[]>([]);

  const getMovies = async () => {
    const movies = await axios.get(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",

      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    setTopRatedList(movies.data.results);
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="mb-5">
      <h1>Top Rated</h1>
      <div className="flex flex-wrap gap-[32px]">
        {topRatedList.slice(0, 10).map((movie) => {
          return (
            <div key={movie.id} className="w-[230px] h-[400px]">
              <img
                className="w-[230px] h-[300px] object-fit"
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              />
              <div className="bg-[#f4f4f5] ml-2 whitespace-nowrap text-ellipsis">
                <span className="text-ellipsis">
                  🌟 {movie.vote_average} / 10
                </span>
                <h1>{movie.title}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
