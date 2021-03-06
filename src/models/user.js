const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

let userSchema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, default: 'user' },
  timestamps: {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  verified: { type: Boolean, default: false },
});

userSchema.methods.generatePasswordHash = (password) => {
  const saltRounds = 10;
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(password, salt);
  return hash;
};

userSchema.methods.validatePassword = (password, hashedPassword) => {
  let res = bcrypt.compareSync(password, hashedPassword);
  return res;
};

userSchema.statics.fillable = ["name", "email"];

userSchema.statics.returnable = [
  "_id",
  "name",
  "email",
  "timestamps",
];

userSchema.statics.publicReturnable = ["_id", "name", "timestamps"];


module.exports = mongoose.model("User", userSchema);