import express from 'express';
import Hello from './Hello.js';
import Lab5 from './lab5.js';
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from './Kanbas/modules/routes.js';
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app)
Hello(app);
Lab5(app);
app.listen(process.env.PORT || 4000);