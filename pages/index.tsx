// pages/index.tsx
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useState } from "react";
import { connectToDatabase } from "@/util/mongo";
import { GetStaticProps } from "next";
import Head from "next/head";
import axios from "axios";
import Layout from "@/components/layout";

const inter = Inter({ subsets: ["latin"] });

interface Movie {
  _id: string;
  title: string;
  year: string;
  poster: string;
}

interface HomeProps {
  movies: Movie[];
}

const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function Home({ movies }: HomeProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <Layout title="Old Movies | Carla Heywood">
      <main
        className={`flex  min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <div className="grid grid-cols-4 gap-4 font-size-2xl mx-auto font-bold">
          {movies &&
            movies.map((movie) => (
              <Link
                key={movie._id}
                href={`/movies/[movie]`}
                as={`/movies/${slugify(movie.title)}`}
                passHref
              >
                <div
                  key={movie._id}
                  className="bg-white text-center rounded-lg p-3"
                >
                  {movie && (
                    <Image
                      key={movie._id}
                      className="mx-auto"
                      width={150}
                      height={100}
                      src={movie.poster}
                      alt={movie.title}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/default.png";
                      }}
                    />
                  )}
                  {movie.title}
                </div>
              </Link>
            ))}
        </div>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { db, client } = await connectToDatabase();
  const data = await db.collection("movies").find({}).limit(50).toArray();

   let movies = await Promise.all(
    data.map((movie: { poster: string; }) =>
      !movie.poster
        ? Promise.resolve(movie) // If no poster URL, return the original movie object.
        : axios.head(movie.poster)
            .then(response => {
              if (response.status === 200) {
                return movie; // If the image is reachable, return the original movie object.
              } else {
                throw new Error('Not Found'); // If the image is not reachable, throw an error.
              }
            })
            .catch(error => {
              // console.error(`Error fetching image from ${movie.poster}`);
              // If an error is caught, return a new movie object with the default 'poster' URL.
              return { ...movie, poster: "/default.png" };
            })
    )
  );

  movies = JSON.parse(JSON.stringify(movies));

  return {
    props: { movies },
  };
};

const checkPosterAvailability = async (poster: string): Promise<boolean> => {
  try {
    const response = await fetch(poster, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

