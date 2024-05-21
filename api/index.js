const express = require("express");
const videos = require("../MoviesData.json");
const app = express();
const cors = require("cors");

app.use(cors());

// Route to get all movies or filter by title
app.get("/movies", (req, res) => {
  const title = req.query.title;
  if (!title) {
    // If no search query is provided, send back all movies
    res.json(videos.movies);
  } else {
    // If search query is provided, filter movies based on the query
    const filteredMovies = videos.movies.filter((movie) => {
      return movie.title.toLowerCase().includes(title.toLowerCase());
    });
    res.json(filteredMovies.length > 0 ? filteredMovies : { message: "No movies found" });
  }
});

// Route to get a movie by ID
app.get("/movies/id/:id", (req, res) => {
  const id = req.params.id;
  const movie = videos.movies.find((movie) => movie.id === id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

// Route to search movies by title
app.get("/movies/title/:title", (req, res) => {
  const title = req.params.title;
  if (!title) {
    res.status(400).json({ message: "Title parameter is missing" });
  } else {
    const filteredMovies = videos.movies.filter((movie) => {
      return movie.title.toLowerCase().includes(title.toLowerCase());
    });
    res.json(filteredMovies.length > 0 ? filteredMovies : { message: "No movies found" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
