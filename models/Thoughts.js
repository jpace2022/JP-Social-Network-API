const { Schema, model, Types } = require ("mongoose");
const moment = require("moment");

const ReactionsSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => newTypes.ObjectId()
        },
        reactionBody: {
            type: String,
            require: true, 
            maxLength: 280
        },
        username: {
            type: String,
            require: true
        },
        createdAt: {
            type: Date,
            default: Date.now, 
            get: (createdAtVal) => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")

        }
        },
        {
        toJSON: {
           getters: true
        }
        }
);

const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now, 
            get: (createdAtVal) => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")

        },
        username: {
            type: String,
            require: true
        },
        reactions: [ReactionsSchema]
        },
        {
            toJSON: {
                virtuals: true,
                getters: true
            },
            id: false
    }
)

ThoughtsSchema.virtual("reactionCount").get(function(){
    return this.reactions.length;
});

const Thoughts = model("Thoughts", ThoughtsSchema);

module.exports = Thoughts;