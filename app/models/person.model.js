const { Model } = require('objection');
const Title = require('./title.model');

class Person extends Model {
    static get tableName() {
        return 'person';
    };

    $beforeInsert() {
        this.createdAt = new Date();
    };

    $beforeUpdate() {
        this.updatedAt = new Date();
    };

    static get nameColumn() {
        return 'name';
    };

    static get passwordColumn() {
        return 'password';
    };

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'password'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 50 },
                password: { type: 'string', minLength: 1, maxLength: 16 },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' }
            }
        };
    };

    static relationMappings = {
        order: {
            relation: Model.HasOneRelation,
            modelClass: Title,
            join: {
                from: 'persons.id',
                to: 'titles.person_id'
            }
        }
    };
};

module.exports = Person;