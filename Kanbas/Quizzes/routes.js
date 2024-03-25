import db from "../Database/index.js";

function QuizRoutes(app) {

    app.post("/api/courses/:cid/quizzes", (req, res) => {
        const { cid } = req.params;
        const newQuiz= {...req.body, course: cid, _id: new Date().getTime().toString()};
        db.quizzes.push(newQuiz);
        console.log("Added Quiz==>"+req.body._id);
        res.send(newQuiz);
    });

    app.put("/api/quizzes/:qid", (req, res) => {
        const { qid } = req.params;
        const quizIndex = db.quizzes.findIndex((q) => q._id === qid);
        if (quizIndex!==-1){
            db.quizzes[quizIndex] = {...db.quizzes[quizIndex],...req.body};
            console.log("Updated quizz id==>"+qid);
        }
        else {

            const newQuiz = { ...req.body, _id: new Date().getTime().toString()};
            db.quizzes.push(newQuiz);   
            console.log("Added quizz==>"+req.body._id);   
        }
        res.sendStatus(204);
      });
    
        
    app.delete("/api/quizzes/:qid", (req, res) => {
        const { qid } = req.params;
        db.quizzes = db.quizzes.filter((q) => q._id !== qid);
        console.log("Deleted quiz id==>"+qid);
        res.sendStatus(200);
    });
    
    app.get("/api/courses/:cid/quizzes", (req, res) => {
        const { cid } = req.params;
        const quizzes = db.quizzes.filter((m) => m.course === cid);
        console.log("Fetched all quizzes");
        res.send(quizzes);
    });
}
export default QuizRoutes;
