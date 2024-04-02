import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017/todo-list';

const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
connectDB();

export default client;