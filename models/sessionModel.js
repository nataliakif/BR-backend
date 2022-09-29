const { Schema, model, default: mongoose } = require("mongoose");

const sessionSchema = new Schema({
  uid: mongoose.Types.ObjectId,
});

const Session = model("session", sessionSchema);

module.exports = {
  Session,
};
