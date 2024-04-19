import app from './app'
import mongoose from 'mongoose'
import config from './app/config'

async function server() {
  try {
    //TODO: write await
    await mongoose.connect(config.database_url)
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

server().catch((err) => console.log(err))
