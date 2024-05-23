const express = require("express");
const videos = require("../MoviesData.json");
const app = express();
const cors = require("cors");

app.use(cors());

// Middleware to handle JSON responses
app.use(express.json());

// Route to get all movies or filter by title
app.get("/movies", (req, res) => {
  try {
    const title = req.query.title;
    if (!title) {
      // If no search query is provided, send back all movies
      res.json(videos.movies);
    } else {
      // If search query is provided, filter movies based on the query
      const filteredMovies = videos.movies.filter((movie) =>
        movie.title.toLowerCase().includes(title.toLowerCase())
      );
      res.json(filteredMovies.length > 0 ? filteredMovies : { message: "No movies found" });
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to get a movie by ID
app.get("/movies/:id", (req, res) => {
  try {
    const id = req.params.id;
    const movie = videos.movies.find((movie) => movie.id === id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
