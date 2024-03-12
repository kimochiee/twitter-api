import { MongoClient, Db } from 'mongodb'
import { env } from '../constants/env'

const uri = env.MONGO_URI as string
const db_name = env.DB_NAME as string

class DatabaseService {
  private client: MongoClient
  private db: Db

  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(db_name)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('Error: ', error)
      throw error
    }
  }

  get users() {
    return this.db.collection('users')
  }
}

export const databaseService = new DatabaseService()
