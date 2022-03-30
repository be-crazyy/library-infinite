const db = require('../../../../db');
const { LMSCache } = require('../core-wrapper/LMSCache');
const LMSRabbitMq = require('../core-wrapper/LMSRabbitMq');

class BaseModel {
  constructor() {
    this.resource = "";
  }

  async find(filter) {
    if (!filter.limit) filter.limit = 10;
    if (!filter.page) filter.page = 0;
    filter['status'] = true;
    const new_filter = JSON.stringify(filter);
    const key = `${this.resource}_list_${new_filter}`;
    const redis_data = await LMSCache.getCacheByKey(key);
    if (redis_data) {
      return JSON.parse(redis_data);
    }
    const dbInstance = await db.getDB();
    const limit = filter.limit;
    if (filter.page == 0) filter.page = 1;
    const offset = (filter.page - 1) * limit;
    delete filter.limit;
    delete filter.page;
    const data = await dbInstance[this.resource].find(filter, {
      offset,
      limit
    });
    await LMSCache.setCacheByKey(key, data);
    return data;
  }

  async findById(id) {
    const dbInstance = await db.getDB();
    const resource_id = `${this.resource}_id`; 
    const filter = { 'status': true };
    filter[resource_id] = id;
    const data = await dbInstance[this.resource].findOne(filter);
    return data;
  }

  async create(data) {
    const dbInstance = await db.getDB();
    const new_data = await dbInstance[this.resource].insert(data);
    await LMSRabbitMq.publish(`${this.resource}.queue`, new_data);
    return new_data;
  }

  async update(criteria, data) {
    const dbInstance = await db.getDB();
    let new_data;
    if (this.resource === 'rentals') new_data = await dbInstance[this.resource].update(criteria, data);
    else new_data = await dbInstance[this.resource].update(criteria, { ...data, 'updated_at': new Date() });
    const key = `${this.resource}_`;
    await LMSCache.deleteCacheByKey(key);
    await LMSRabbitMq.publish(`${this.resource}.queue`, new_data);
    return new_data;
  }

  async delete(criteria) {
    const dbInstance = await db.getDB();
    const new_data = await dbInstance[this.resource].update(criteria, { 'status': false, 'deleted_at': new Date() });
    const key = `${this.resource}_`;
    await LMSCache.deleteCacheByKey(key);
    await LMSRabbitMq.publish(`${this.resource}.queue`, new_data);
    return new_data;
  }
}

module.exports = BaseModel;