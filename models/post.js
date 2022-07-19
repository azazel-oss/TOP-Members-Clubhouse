const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

PostSchema.virtual("createdAt").get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(
    DateTime.DATETIME_SHORT
  );
});

module.exports = mongoose.model("Post", PostSchema);
