"use client";
import { headers } from "next/headers";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "./constants";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Upcoming from "./components/upcoming";
import TopRated from "./components/top-rated";
import Popular from "./components/popular";
import Footer from "./components/footer";
type MovieType = {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  video: boolean;
  orginal_language: string;
  orginal_title: string;
  vote_count: number;
  overview: string;
};

export default function Home() {
  const [movieList, setMovieList] = useState<MovieType[]>([]);

  const getMovies = async () => {
    const movies = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",

      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    setMovieList(movies.data.results);
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div
      className="
    grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="w-full">
            {movieList.slice(0, 3).map((movie) => {
              return (
                <CarouselItem key={movie.id}>
                  <div key={movie.id}>
                    <h1>{movie.title}</h1>
                    <img
                      className="w-full h-[600px] object-fit"
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    />
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <Upcoming />
        <TopRated />
        <Popular />
        <Footer />
      </main>
    </div>
  );
}
