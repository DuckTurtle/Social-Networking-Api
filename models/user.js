const { Schema, model } = require('mongoose');


// Schema to create user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please fill a valid email address'],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
         ref: 'Thoughts'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
         ref: 'User'}],
  },
  {
    toJSON: {
        virtuals:true,
      getters: true,
    },
  }
);
userSchema
  .virtual('friendCount').get(function () {
    return this.friends.length;
  })

const Users = model('User', userSchema);

module.exports = Users;
