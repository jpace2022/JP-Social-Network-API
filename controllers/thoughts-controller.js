const { Thoughts, Users } = require("../models");

const thoughtsController = {
    createThoughts({params, body}, res) {
        console.log(body)
        Thoughts.create(body)
        .then(({_id}) => {
            return Users.findOneAndUpdate({ _id: body.userId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({message: "No thoughts were made!"});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.json(err));
    },

    getAllThoughts(req, res) {
        Thoughts.find({})
        .populate({
            path: "reactions",
            select: "-__v"
        })
        .select("-__v")
        .sort ({ _id: -1 })
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getThoughtsById({params}, res) {
        Thoughts.findOne({ _id: params.id })
        .populate({path: "reactions", select: "-__v"})
        .select("-__v")
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
            res.status(404).json({message: "No thoughts with this ID!"});
            return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => {
            console.log(err);
            res.status(400);
        });
    },

    updateThoughts({params, body}, res) {
        Thoughts.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .populate({path: "reactions", select: "-__v"})
        .select("-__v")
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
            res.status(404).json({message: "No thoughts with this ID!"});
            return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => {
            console.log(err);
            res.status(400);
        });
    },

    deleteThoughts({params}, res) {
        Thoughts.findOneAndDelete(
            {_id: params.id})
            .then(dbThoughtsData => {
            if(!dbThoughtsData) {
            res.status(404).json({message: "No thoughts with this ID!"});
            return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.status(400).json(err));
    },

    addReaction({params, body}, res) {
        Thoughts.findOneAndUpdate(
        {_id: params.thoughtsId}, 
        {$addToSet: {reactions: body}}, 
        {new: true, runValidators: true})
        .populate({path: "reactions", select: "-__v"})
        .select("-__v")
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
            res.status(404).json({message: "No thoughts with this ID!"});
            return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => {
            console.log(err);
            res.status(400);
        });
    },

    deleteReaction({params}, res) {
        Thoughts.findOneAndUpdate({_id: params.thoughtsId},
            {$pull: {reactions: {reactionsId: params.reactionsId}}}, 
            {new: true})
            .then(dbThoughtsData => {
            if(!dbThoughtsData) {
            res.status(404).json({message: "No thoughts with this ID!"});
            return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.status(400).json(err));
    }

};

module.exports = thoughtsController;