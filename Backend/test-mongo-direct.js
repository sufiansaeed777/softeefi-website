const { MongoClient } = require('mongodb');

async function testConnection() {
    const uri = 'mongodb://127.0.0.1:27017/softeefi';
    const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 2000
    });

    try {
        console.log('Testing direct connection to MongoDB...');
        await client.connect();
        console.log('✓ Successfully connected to MongoDB!');
        
        const db = client.db('softeefi');
        const collections = await db.listCollections().toArray();
        console.log('\nDatabase: softeefi');
        console.log('Collections:', collections.map(c => c.name));
        
        return true;
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        return false;
    } finally {
        await client.close();
    }
}

testConnection();