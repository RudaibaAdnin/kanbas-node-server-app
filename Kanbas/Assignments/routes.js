import db from "../Database/index.js";

function AssignmentRoutes(app) {

    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {...req.body, course: cid, _id: new Date().getTime().toString()};
        db.assignments.push(newAssignment);
        console.log("Added assignment==>"+req.body._id);
        res.send(newAssignment);
    });

    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
        if (assignmentIndex!==-1){
            db.assignments[assignmentIndex] = {...db.assignments[assignmentIndex],...req.body};
            console.log("Updated assignment id==>"+aid);
        }
        else {

            const newAssignment = { ...req.body, _id: new Date().getTime().toString()};
            db.assignments.push(newAssignment);   
            console.log("Added assignment==>"+req.body._id);   
        }
        res.sendStatus(204);
      });
    
        
    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== aid);
        console.log("Deleted assignment id==>"+aid);
        res.sendStatus(200);
    });
    
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments.filter((m) => m.course === cid);
        console.log("Fetched all assignments");
        res.send(assignments);
    });
}
export default AssignmentRoutes;
