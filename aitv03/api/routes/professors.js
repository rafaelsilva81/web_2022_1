import express from "express"
import professorService from "../services/professorService.js";

var professorRoutes = express.Router();

professorRoutes.get('/', function(req, res) {
    return res.json(professorService.listAll())
});

professorRoutes.get('/:id', function(req, res) {
    return res.json(professorService.list(req.params.id))
});

professorRoutes.post('/', function(req, res) {
    return res.json(professorService.create(req.body))
})

professorRoutes.delete('/:id', function(req, res) {
    let deleted = professorService.remove(req.params.id)
    if (deleted) {
        return res.json({"deleted" : true})
    }
    else {
        return res.json({"deleted" : false}) 
    }
})

professorRoutes.put('/:id', function(req, res) {
    let updated = professorService.update(req.params.id, req.body)
    if (updated != null) {
        return res.json(updated)
    } else {
        return res.json({"error" : "could not update"})
    }
})

export default professorRoutes