const { MongoClient } = require('mongodb');

// Test different connection methods
const tests = [
    { uri: 'mongodb://127.0.0.1:27017', name: 'IPv4 localhost' },
    { uri: 'mongodb://localhost:27017', name: 'localhost' },
    { uri: 'mongodb://127.0.0.1:27017/softeefi', name: 'IPv4 with DB' },
    { uri: 'mongodb://127.0.0.1:27017/admin', name: 'IPv4 admin DB' }
];

async function runTests() {
    for (const test of tests) {
        console.log(`\nTesting ${test.name}: ${test.uri}`);
        
        const client = new MongoClient(test.uri, {
            serverSelectionTimeoutMS: 3000,
            directConnection: true,
            maxPoolSize: 1
        });
        
        try {
            await client.connect();
            console.log('✓ Connected successfully!');
            await client.close();
            
            // If successful, show how to update .env
            console.log(`\nSUCCESS! Update your .env file with:`);
            console.log(`MONGO_URL=${test.uri}${test.uri.includes('/softeefi') ? '' : '/softeefi'}`);
            return;
        } catch (error) {
            console.log(`✗ Failed: ${error.message}`);
        }
    }
}

runTests();