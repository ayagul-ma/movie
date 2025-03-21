"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../../constants";
import { useParams } from "next/navigation";

export default function MovieDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState<any>({});

  const getMovieDetail = async () => {
    const movies = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    setDetail(movies.data);
  };

  useEffect(() => {
    getMovieDetail();
  }, []);

  return (
    <div className="mb-5">
      <div className="flex flex-wrap gap-[32px]">
        <h1>{detail.original_title}</h1>

        <img
          className="w-[230px] h-[300px] object-fit"
          src={`https://image.tmdb.org/t/p/w300${detail.poster_path}`}
        />
      </div>
    </div>
  );
}
