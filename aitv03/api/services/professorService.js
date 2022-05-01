import professorModel from "../models/professorModel.js"

let professors = [
    { _id: 0, name: 'Jefferson', university:"Universidade Federal do Ceará", degree: 'Sistemas de Informação' },
    { _id: 1, name: 'Wladimir',  university:"Universidade Federal do Ceará", degree: 'Design Digital' },
    { _id: 2, name: 'Aragão',  university:"Universidade Federal do Ceará", degree: 'Matemática Industrial' }
]

let _id = 3


const listAll = () => {
    return professors
}

const list = (id) => {
    return professors.find((p) => (p._id == id));
}

const create = (data) => {
    let professor = new professorModel(
        _id++,
        data.name,
        data.university,
        data.degree);
    professors.push(professor);
    return professor;
}

const remove = (id) => {
    for (let i = 0; i < professors.length; i++) {
        if (professors[i]._id == id) {
            professors.splice(i, 1);
            return true;
        }
    }
    return false;
}

const update = (id, data) => {
    for (let p of professors) {
        if (p._id == id) {
            p.name = data.name
            p.university = data.university
            p.course = data.course
            return p;
        }
    }
    return null;
}

export default {listAll, list, update, remove, create}