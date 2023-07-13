const { Schema, model } = require('mongoose');
const formatDate = require('../util/dateFormat.js');

// Schema to create Student model
const replySchema = new Schema(
  {
    id: {
        type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    text: {
        type: String,
        required: true,
        unique: true,
        max_length: 280,
      },
      createdAt: {
          type: Date,
          default: Date.now,
          get: timestamp => formatDate(timestamp)
        },
      username: {
          type: String,
        required: true,
      },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);



module.exports = replySchema;