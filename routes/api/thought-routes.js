const router = require("express").Router();

const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction
} = require("../../controllers/thoughts-controller");

router
.route("/")
.get(getAllThoughts)
.post(createThoughts);

router
.route("/:id")
.get(getThoughtsById)
.delete(deleteThoughts)
.put(updateThoughts)

router
.route("/:thoughtsId/reaction/:reactionId")
.post(addReaction)
.delete(deleteReaction);

module.exports = router;