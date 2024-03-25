import db from "../Database/index.js";

function QuestionRoutes(app) {

    app.post("/api/courses/:cid/quizzes/:qid/questions", (req, res) => {
        const { cid } = req.params;
        const { qid } = req.params;
        const newQuestion = {...req.body, course: cid, quiz: qid, _id: new Date().getTime().toString()};
        db.quizzes.push(newQuestion);
        console.log("Added Question==>"+req.body._id);
        res.send(newQuestion);
    });

    app.put("/api/questions/:quid", (req, res) => {
        const { quid } = req.params;
        const questionIndex = db.questions.findIndex((q) => q._id === quid);
        if (questionIndex!==-1){
            db.questions[questionIndex] = {...db.questions[questionIndex],...req.body};
            console.log("Updated question id==>"+quid);
        }
        else {

            const newQuestion = { ...req.body, _id: new Date().getTime().toString()};
            db.questions.push(newQuestion);   
            console.log("Added question==>"+req.body._id);   
        }
        res.sendStatus(204);
      });
    
        
    app.delete("/api/questions/:quid", (req, res) => {
        const { quid } = req.params;
        db.questions = db.questions.filter((q) => q._id !== quid);
        console.log("Deleted question id==>"+quid);
        res.sendStatus(200);
    });
    
    app.get("/api/courses/:cid/quizzes/:qid/questions", (req, res) => {
        const { cid } = req.params;
        const { qid } = req.params;
        const questions = db.questions.filter((m) => m.course === cid && m.quiz === qid);
        console.log("Fetched all questions");
        res.send(questions);
    });


    app.get("/api/courses/:cid/quizzes/:qid/questions/:id", (req, res) => {
        const { cid } = req.params;
        const { qid } = req.params;
        const { id } = req.params;
        const question = db.questions.filter((m) => m.course === cid && m.quiz === qid && m._id === id);
        if (!question) {
          res.status(404).send("Question not found");
          return;
        }
        console.log("Fetched question==>"+id);
        res.send(question);
      });
}
export default QuestionRoutes;