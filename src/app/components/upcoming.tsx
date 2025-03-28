import axios from "axios";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../constants";
import Link from "next/link";

type MovieType = {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  video: boolean;
  orginal_language: string;
  orginal_title: string;
  vote_count: number;
  vote_average: number;
  overview: string;
};

export default function Upcoming() {
  const [upcomingList, setUpcomingList] = useState<MovieType[]>([]);

  const getMovies = async () => {
    const movies = await axios.get(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",

      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    setUpcomingList(movies.data.results);
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="mb-5">
      <h1>Upcoming</h1>
      <div className="flex flex-wrap gap-[32px]">
        {upcomingList.slice(0, 10).map((movie) => {
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
                <h1>
                  <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
                </h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
