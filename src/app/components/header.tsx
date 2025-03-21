import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../constants";
import axios from "axios";
import { SelectLabel } from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Header() {
  const [genreList, setGenreList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const getGenreList = async () => {
    const genres = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list",
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    setGenreList(genres.data.genres);
  };

  const getSearchResult = async (searchText: string) => {
    const movies = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${searchText}`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    setSearchResults(movies.data.results);
  };

  useEffect(() => {
    getGenreList();
  }, []);

  const handleSearch = async (e: any) => {
    console.log(e.target.value);

    const searchValue = e.target.value;

    await getSearchResult(searchValue);
  };

  console.log(searchResults);

  return (
    <div className="flex gap-4">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Genre</SelectLabel>
            {genreList.map((genre: any) => (
              <SelectItem key={genre.id} value={genre.id}>
                {genre.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="flex">
        <Input placeholder="Search movie" onChange={handleSearch} />
        <ScrollArea className="rounded-md border p-4 h-[200px]">
          {searchResults.map((result: any) => (
            <div key={result.id} className="flex mb-4">
              <img
                alt="poster"
                src={`https://image.tmdb.org/t/p/w300/${result.poster_path}`}
                height={30}
                width={30}
              />
              <div>{result.title}</div>
              <Separator />
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
