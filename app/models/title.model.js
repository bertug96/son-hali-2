const { Model } = require('objection');
const Person = require('./person.model');

class Title extends Model {
    static get tableName() {
        return 'title';
    };

    $beforeInsert() {
        this.createdAt = new Date();
    };

    $beforeUpdate() {
        this.updatedAt = new Date();
    };

    static get titleColumn() {
        return 'title';
    };

    static get personIdColumn() {
        return 'person_id';
    };

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['title'],
            properties: {
                id: { type: 'integer' },
                title: { type: 'string' },
                person_id: { type: 'integer' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' }
            }
        };
    };

    static relationMappings = {
        order: {
            relation: Model.HasOneRelation,
            modelClass: Person,
            join: {
                from: 'titles.person_id',
                to: 'persons.id'
            }
        }
    };
};

module.exports = Title;