const { Schema, model, Types } = require ("mongoose");
const moment = require("moment");

const ReactionsSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
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
        reactions: [{
            ReactionsSchema
        }]
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

module.exports = ReactionsSchema;
module.exports = Thoughts;