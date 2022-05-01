import express from "express"
import studentService from "../services/studentService.js";

var studentRoutes = express.Router();

studentRoutes.get('/', function(req, res) {
    return res.json(studentService.listAll())
});

studentRoutes.get('/:id', function(req, res) {
    return res.json(studentService.list(req.params.id))
});

studentRoutes.post('/', function(req, res) {
    return res.json(studentService.create(req.body))
})

studentRoutes.delete('/:id', function(req, res) {
    let deleted = studentService.remove(req.params.id)
    if (deleted) {
        return res.json({"deleted" : true})
    }
    else {
        return res.json({"deleted" : false}) 
    }
})

studentRoutes.put('/:id', function(req, res) {
    let updated = studentService.update(req.params.id, req.body)
    if (updated != null) {
        return res.json(updated)
    } else {
        return res.json({"error" : "could not update"})
    }
})

export default studentRoutes