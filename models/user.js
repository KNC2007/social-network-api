const { Schema, model } = require('mongoose');
// const assignmentSchema = require('./reaction');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
        }
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
},
  {
    toJSON: {
      virtuals: true, // tell schema it will have virtuals 
    },
    id: false, // set to false because this is a virtual that Mongoose returns, and we don't need it
  }
);

// virtual retrieves the length of the user's friends array field on query
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
