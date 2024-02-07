const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // format timestamp
      get: (createdAtVal) => new Date(createdAtVal).toDateString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  },
);

// virtual retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});


const Thought = model('Thought', thoughtSchemaSchema);

module.exports = Thought;
