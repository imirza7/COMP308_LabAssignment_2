const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    projectName: { type: String, required: true },
    description: { type: String },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    status: { type: String, enum: ["In Progress", "Completed", "Pending"], default: "Pending" }
}, { timestamps: true });

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;