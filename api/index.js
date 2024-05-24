const express = require("express");
const courses = require("../CoursesData.json");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Route to get all courses or filter by title
app.get("/courses", (req, res) => {
  try {
    const title = req.query.title;
    if (!title) {
      // If no search query is provided, send back all courses
      res.json(courses.Courses);
    } else {
    
      const filteredCourses = courses.Courses.filter((course) =>
        course.title.toLowerCase().includes(title.toLowerCase())
      );
      res.json(filteredCourses.length > 0 ? filteredCourses : { message: "No courses found" });
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to get a course by ID
app.get("/courses/:id", (req, res) => {
  try {
    const id = req.params.id;
    const course = courses.Courses.find((course) => course.id === id);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
