import db from "../Database/index.js";
function ModuleRoutes(app) {

    app.put("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        const moduleIndex = db.modules.findIndex((m) => m._id === mid);
        db.modules[moduleIndex] = {...db.modules[moduleIndex],...req.body};
        console.log("Updated module id==>"+mid);
        res.sendStatus(204);
      });
    
      app.delete("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        db.modules = db.modules.filter((m) => m._id !== mid);
        console.log("Deleted module id==>"+mid);
        res.sendStatus(200);
    });
    
      app.post("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const newModule = {...req.body, course: cid, _id: new Date().getTime().toString()};
        db.modules.push(newModule);
        console.log("Added module==>"+toString(req.body));
        res.send(newModule);
        });
    
    app.get("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const modules = db.modules.filter((m) => m.course === cid);
        console.log("Fetched all modules");
        res.send(modules);
    });
}
export default ModuleRoutes;