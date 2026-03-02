import mongoose from 'mongoose'

const MongoDB = () => {
  const mongUri = process.env.MONGO_URI || ''
  mongoose
    .connect(mongUri)
    .then(() => {
      console.info('[Connect MongoDB] : ✅ Kết nối MongoDB thành công')
    })
    .catch((error) => {
      console.warn(`[Connect MongoDB] :❌ Lỗi kết nối MongoDB: ${error}`)
    })
}

export default MongoDB
