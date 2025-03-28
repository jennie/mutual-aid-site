// server/api/resources.ts
import { MongoClient } from 'mongodb'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const client = new MongoClient(config.mongodbUri)

  try {
    await client.connect()
    const db = client.db('mutual-aid')
    const resources = await db.collection('resources').find({}).toArray()
    return resources
  } finally {
    await client.close()
  }
})