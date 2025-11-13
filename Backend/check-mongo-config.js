const { MongoClient } = require('mongodb');

async function checkMongoDB() {
    const possibleURIs = [
        'mongodb://localhost:27017',
        'mongodb://127.0.0.1:27017',
        'mongodb://localhost:27018',
        'mongodb://127.0.0.1:27018',
        'mongodb://0.0.0.0:27017'
    ];

    console.log('Checking MongoDB connections...\n');

    for (const uri of possibleURIs) {
        const client = new MongoClient(uri, {
            serverSelectionTimeoutMS: 2000,
            connectTimeoutMS: 2000
        });

        try {
            console.log(`Trying ${uri}...`);
            await client.connect();
            console.log(`✓ SUCCESS! Connected to ${uri}`);
            
            // If successful, update the .env file suggestion
            console.log(`\nUpdate your .env file with:`);
            console.log(`MONGO_URL=${uri}/softeefi`);
            
            await client.close();
            return true;
        } catch (error) {
            console.log(`✗ Failed: ${error.message}`);
        }
    }

    console.log('\n❌ Could not connect to MongoDB on any common port');
    console.log('\nTroubleshooting steps:');
    console.log('1. Check if MongoDB service is actually running');
    console.log('2. Check Windows Firewall settings');
    console.log('3. Check MongoDB log files at:');
    console.log('   C:\\Program Files\\MongoDB\\Server\\7.0\\log\\');
    console.log('4. Try restarting the MongoDB service');
    
    return false;
}

checkMongoDB();