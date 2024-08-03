import mongoose, { Schema, model, models } from 'mongoose';

const EpisodeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Check if the model already exists to prevent recompiling in development
const EpisodeModel = models.Episodes || model('Episodes', EpisodeSchema);

export default EpisodeModel;
