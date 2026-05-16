import mongoose from 'mongoose'

// keeps retrying isn't needed here since process.exit handles it
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    console.error('MongoDB connection failed:', err)
    process.exit(1)
  }
}

export default connectDB