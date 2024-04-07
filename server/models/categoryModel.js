import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  hyphenSeparated: {
    type: String,
  },
});

categorySchema.pre("save", function (next) {
  this.hyphenSeparated = this.name.toLowerCase().split(" ").join("-");
  next();
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
