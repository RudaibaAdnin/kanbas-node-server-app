import Database from "../Database/index.js";
function CourseRoutes(app) {

  app.get("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = Database.courses.find((c) => c._id === id);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    console.log("Fetched db course==>"+id);
    res.send(course);
  });

  app.put("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = req.body;
    Database.courses = Database.courses.map((c) =>  c._id === id ? { ...c, ...course } : c );
    console.log("Updated course id==>"+id);
    res.sendStatus(204);
  });

  app.delete("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    Database.courses = Database.courses.filter((c) => c._id !== id);
    console.log("Deleted course id==>"+id);
    res.sendStatus(204);
  });

  app.post("/api/courses", (req, res) => {
    const course = { ...req.body, _id: new Date().getTime().toString() };
    console.log("Added course==>"+req.body._id);
    Database.courses.push(course);
    res.send(course);
  });

  app.get("/api/courses", (req, res) => {
    const courses = Database.courses;
    console.log("Fetched all db courses");
    res.send(courses);
  });
}

export default CourseRoutes;