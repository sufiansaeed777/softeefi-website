// Mock database for development when MongoDB is not available
class MockDatabase {
    constructor() {
        this.contacts = [];
        this.freeReports = [];
        this.idCounter = 1;
    }

    // Contact methods
    async createContact(data) {
        const contact = {
            _id: this.idCounter++,
            ...data,
            status: 'new',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.contacts.push(contact);
        console.log('📧 Mock: Contact saved:', contact.name);
        return contact;
    }

    async findContacts(filter = {}, options = {}) {
        let results = [...this.contacts];
        
        // Apply filters
        if (filter.status) {
            results = results.filter(c => c.status === filter.status);
        }
        
        // Sort by createdAt desc
        results.sort((a, b) => b.createdAt - a.createdAt);
        
        // Apply pagination
        const skip = options.skip || 0;
        const limit = options.limit || 50;
        results = results.slice(skip, skip + limit);
        
        return results;
    }

    async findContactById(id) {
        return this.contacts.find(c => c._id === parseInt(id));
    }

    async updateContact(id, updates) {
        const index = this.contacts.findIndex(c => c._id === parseInt(id));
        if (index !== -1) {
            this.contacts[index] = {
                ...this.contacts[index],
                ...updates,
                updatedAt: new Date()
            };
            return this.contacts[index];
        }
        return null;
    }

    async deleteContact(id) {
        const index = this.contacts.findIndex(c => c._id === parseInt(id));
        if (index !== -1) {
            const deleted = this.contacts.splice(index, 1)[0];
            return deleted;
        }
        return null;
    }

    async countContacts(filter = {}) {
        if (filter.status) {
            return this.contacts.filter(c => c.status === filter.status).length;
        }
        return this.contacts.length;
    }

    // Free report methods
    async createFreeReport(data) {
        const report = {
            _id: this.idCounter++,
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.freeReports.push(report);
        console.log('📊 Mock: Free report saved:', report.email);
        return report;
    }

    async findFreeReports() {
        return [...this.freeReports].sort((a, b) => b.createdAt - a.createdAt);
    }
}

// Singleton instance
const mockDb = new MockDatabase();

// Mongoose model mock factories
function createMockModel(modelName) {
    switch (modelName) {
        case 'Contact':
            return {
                create: (data) => mockDb.createContact(data),
                find: (filter) => ({
                    sort: () => ({
                        limit: (limit) => ({
                            skip: (skip) => ({
                                select: () => mockDb.findContacts(filter, { limit, skip })
                            })
                        })
                    })
                }),
                findById: (id) => mockDb.findContactById(id),
                findByIdAndUpdate: (id, updates) => mockDb.updateContact(id, updates),
                findByIdAndDelete: (id) => mockDb.deleteContact(id),
                countDocuments: (filter) => mockDb.countContacts(filter),
                aggregate: () => Promise.resolve([])
            };
        case 'FreeReportUser':
            return {
                create: (data) => mockDb.createFreeReport(data),
                find: () => mockDb.findFreeReports()
            };
        default:
            return {};
    }
}

module.exports = {
    mockDb,
    createMockModel
};