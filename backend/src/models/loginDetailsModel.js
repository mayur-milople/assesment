const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const loginDetailsSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
  },
  type: {
    type: String,
  },
  login_at: {
    type: Date,
  },
});

module.exports = mongoose.model("loginDetail", loginDetailsSchema);
