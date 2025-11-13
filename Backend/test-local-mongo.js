const { MongoClient } = require('mongodb');

async function testConnection() {
    const uri = 'mongodb://localhost:27017/softeefi';
    const client = new MongoClient(uri);

    try {
        console.log('Testing MongoDB connection to localhost...');
        await client.connect();
        console.log('✓ Successfully connected to MongoDB!');
        
        // List databases
        const adminDb = client.db().admin();
        const databases = await adminDb.listDatabases();
        console.log('\nAvailable databases:');
        databases.databases.forEach(db => {
            console.log(`  - ${db.name}`);
        });
        
        // Test creating a collection
        const db = client.db('softeefi');
        console.log('\n✓ Using database: softeefi');
        
        return true;
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        console.log('\nMake sure MongoDB is running:');
        console.log('  - Windows: Check MongoDB service in Services');
        console.log('  - Or run: mongod');
        return false;
    } finally {
        await client.close();
    }
}

testConnection();