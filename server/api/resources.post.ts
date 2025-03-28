// server/api/resources.post.ts
import { MongoClient } from 'mongodb'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  
  console.log('Received resource submission:', body);
  console.log('MongoDB URI configured:', !!config.mongodbUri);
  
  const client = new MongoClient(config.mongodbUri)

  try {
    console.log('Attempting to connect to MongoDB...');
    await client.connect()
    console.log('Successfully connected to MongoDB');
    
    const db = client.db('mutual-aid')
    const resource = {
      ...body,
      createdAt: new Date(),
      lastVerified: new Date(),
      verifiedBy: body.submitterEmail,
      status: 'pending'
    }

    console.log('Inserting resource into database:', resource);
    const result = await db.collection('resources').insertOne(resource)
    console.log('Resource inserted successfully:', result.insertedId);

    return { success: true, id: result.insertedId }
  } catch (error) {
    console.error('Error in resources.post.ts:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to save resource'
    });
  } finally {
    await client.close()
  }
})