import mongoose from 'mongoose'

const MongoDB = () => {
  const mongUri = process.env.MONGO_URI || ''
  mongoose
    .connect(mongUri)
    .then(() => {
      console.log('✅ Kết nối MongoDB thành công!')
    })
    .catch((error) => {
      console.log(`❌ Lỗi kết nối MongoDB: ${error}`)
    })
}

export default MongoDB
