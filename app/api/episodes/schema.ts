import mongoose, { Schema, model, models } from 'mongoose';

const EpisodesSchema = new Schema(
  {
    adsMedia: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      default: '',
    },
    currency: {
      type: String,
      default: 'USD',
    },
    description: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
      default: '',
    },
    guestName: {
      type: String,
      default: '',
    },
    guestProfile: {
      type: String,
      default: '',
    },
    images: [{
      type: String,
      default: [],
    }],
    instagram: {
      type: String,
      default: '',
    },
    listenLink: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
    publicationDate: {
      type: Date,
      required: true,
    },
    shortDescription: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'inactive', 'pending'],
      default: 'draft',
    },
    title: {
      type: String,
      required: true,
    },
    twitter: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      enum: ['paid', 'free'],
      required: true,
    },
    category: {
      type: String,
      default: '',
    },
    tags: [{
      type: String,
      default: [],
    }],
    coverImage: {
      type: String,
      default: '',
    },
    episodeNumber: {
      type: Number,
      default: null,
    },
    duration: {
      type: String,
      default: '',
    },
    season: {
      type: Number,
      default: null,
    },
    host: {
      type: String,
      default: '',
    },
    explicit: {
      type: Boolean,
      default: false,
    },
    audioFile: {
      type: String,
      default: '',
    },
    transcript: {
      type: String,
      default: '',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    externalLinks: [{
      type: String,
      default: [],
    }],
  },
  { timestamps: true }
);

// Check if the model already exists to prevent recompiling in development
const EpisodeModel = models.Episodes || model('Episodes', EpisodesSchema);

export default EpisodeModel;
