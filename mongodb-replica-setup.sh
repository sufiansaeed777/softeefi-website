#!/bin/bash

echo "=== MongoDB Replica Set Setup for High Availability ==="
echo ""
echo "This script will help you set up MongoDB replication"
echo ""

# Step 1: Update MongoDB configuration for replica set
cat << 'EOF' > /tmp/mongod-replica.conf
# MongoDB Replica Set Configuration
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true
  engine: wiredTiger
  wiredTiger:
    engineConfig:
      cacheSizeGB: 1

systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

net:
  port: 27017
  bindIp: 0.0.0.0  # Allow connections from anywhere (secure with firewall)

replication:
  replSetName: "softeefi-replica"
  oplogSizeMB: 100

security:
  authorization: enabled
  keyFile: /etc/mongodb-keyfile

processManagement:
  timeZoneInfo: /usr/share/zoneinfo
EOF

echo "Step 1: Generate keyfile for replica authentication"
openssl rand -base64 756 > /tmp/mongodb-keyfile
chmod 400 /tmp/mongodb-keyfile

echo ""
echo "Step 2: Instructions for setting up replica set:"
echo ""
echo "ON PRIMARY SERVER (current server):"
echo "1. sudo cp /tmp/mongod-replica.conf /etc/mongod.conf"
echo "2. sudo cp /tmp/mongodb-keyfile /etc/mongodb-keyfile"
echo "3. sudo chown mongodb:mongodb /etc/mongodb-keyfile"
echo "4. sudo systemctl restart mongod"
echo ""
echo "5. Connect to MongoDB and initiate replica set:"
echo "   mongosh"
echo "   > rs.initiate({"
echo "       _id: 'softeefi-replica',"
echo "       members: ["
echo "         { _id: 0, host: 'primary-server-ip:27017', priority: 2 },"
echo "         { _id: 1, host: 'secondary-server-ip:27017', priority: 1 },"
echo "         { _id: 2, host: 'arbiter-server-ip:27017', arbiterOnly: true }"
echo "       ]"
echo "     })"
echo ""
echo "ON SECONDARY SERVERS:"
echo "1. Install MongoDB"
echo "2. Copy the same keyfile (/etc/mongodb-keyfile)"
echo "3. Use the same configuration"
echo "4. Start MongoDB"
echo ""
echo "Step 3: Update your application connection string:"
echo "mongodb://username:password@server1:27017,server2:27017,server3:27017/softeefi?replicaSet=softeefi-replica&authSource=admin"
echo ""
echo "Benefits:"
echo "- Automatic failover if primary goes down"
echo "- Read scaling with secondary reads"
echo "- Data redundancy across multiple servers"