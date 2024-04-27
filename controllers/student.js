const allstudent = (req, res) => res.send("get them all");
const newStudent = (req, res) => res.send("new student");
const deletestudent = (req, res) => res.send("delete the student ");
const putstudent = (req, res) => res.send("put them all");

export { allstudent, newStudent, deletestudent, putstudent };
