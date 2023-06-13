import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Movie() {
  const router = useRouter();
  const { movie } = router.query;
  const [movieData, setMovieData] = useState<Movie | null>(null);
  const decodedMovie = movie ? JSON.parse(decodeURIComponent(movie)) : null;

  // useEffect(() => {
  //   // Fetch the movie data using the `movie` slug
  //   // Example: fetch movie data from API using movie slug
  //   fetch(`/api/movies?title=${movie}`)
  //     .then((response) => response.json())
  //     .then((data: Movie) => {
  //       setMovieData(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, [movie]);

  // Render the movie details once the data is fetched
  return (
    <Layout title={decodedMovie?.title ?? "Movie"}>
      {decodedMovie ? (
        <div className="text-white h-screen">
          <h1>{decodedMovie.title}</h1>
          <p>Year: {decodedMovie.year}</p>
          {/* Render other movie details */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </Layout>
  );
}

export default Movie;

