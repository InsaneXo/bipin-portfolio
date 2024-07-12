import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: true,
  },
  projectLink: {
    type: String,
    required: true,
  },
  projectImage: {
    public_id: String,
    url: String,
  },
  techStack: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const projectModel = mongoose.model("Project", projectSchema);

export default projectModel;
