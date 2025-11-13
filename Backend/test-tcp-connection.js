const net = require('net');

console.log('Testing TCP connection to MongoDB port...');

const client = new net.Socket();

client.connect(27017, '127.0.0.1', () => {
    console.log('✓ TCP connection successful to 127.0.0.1:27017');
    client.destroy();
});

client.on('error', (err) => {
    console.error('❌ TCP connection failed:', err.message);
    
    // Try Windows host IP
    console.log('\nTrying Windows host IP...');
    const client2 = new net.Socket();
    client2.connect(27017, '172.17.0.1', () => {
        console.log('✓ Connected via WSL host IP');
        client2.destroy();
    });
    
    client2.on('error', () => {
        console.log('❌ Also failed on host IP');
    });
});