const { Schema, model } = require('mongoose');
const replySchema = require('./replys.js');
const formatDate = require('../util/format.js');

// Schema to create user model
const thoughtSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      unique: true,
      max_length: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => formatDate(timestamp),
      },
    username: {
        type: String,
      required: true,
    },
    reactions: [replySchema],
},

{
    toJSON: {
        virtuals:true,
      getters: true,
    },
  }
);

thoughtSchema
  .virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

  const Thoughts = model('Thoughts', thoughtSchema);

module.exports = Thoughts;