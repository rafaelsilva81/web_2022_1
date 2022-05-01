import studentModel from "../models/studentModel.js"

let students = [
    { _id: 0, name: 'Jefferson', university: "Universidade Federal do Ceará", course: 'Sistemas de Informação', ira: 7.5 },
    { _id: 1, name: 'Wladimir', university: "Universidade Federal do Ceará",course: 'Design Digital', ira: 5.8 },
    { _id: 2, name: 'Aragão', university: "Universidade Federal do Ceará", course: 'Matemática Industrial', ira: 9.5 }
]

let _id = 3


const listAll = () => {
    return students
}

const list = (id) => {
    return students.find((s) => (s._id == id));
}

const create = (data) => {
    let student = new studentModel(
        _id++,
        data.name,
        data.university,
        data.course);
    students.push(student);
    return student;
}

const remove = (id) => {
    for (let i = 0; i < students.length; i++) {
        if (students[i]._id == id) {
            students.splice(i, 1);
            return true;
        }
    }
    return false;
}

const update = (id, data) => {
    for (let s of students) {
        if (s._id == id) {
            s.name = data.name
            s.university = data.university
            s.course = data.course
            return s;
        }
    }
    return null;
}

export default {listAll, list, update, remove, create}