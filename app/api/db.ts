import mongoose, { Mongoose } from 'mongoose';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error('Please add your Mongo URI to env');
}

// Declare a global object for caching the connection
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache;
}

if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

export const connectDB = async (): Promise<Mongoose> => {
  if (global.mongooseCache.conn) {
    return global.mongooseCache.conn;
  }

  if (!global.mongooseCache.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true,
    };

    global.mongooseCache.promise = mongoose.connect(MONGODB_URI as string, options).then((mongoose) => {
      return mongoose;
    });
  }

  global.mongooseCache.conn = await global.mongooseCache.promise;
  return global.mongooseCache.conn;
};
