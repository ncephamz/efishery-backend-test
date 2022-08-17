const wrapper = require('../../helpers/utils/wrapper');

class Repository {
  constructor(SteinHq) {
    this.stein = new SteinHq();
  }

  async registration(sheet, { id, phone, name, role, password, createdAt }) {
    const { err, data } = await this.stein.create(sheet, [
      {
        id, phone, name, role, password, created_at: createdAt
      }
    ]);
    if (err) {
      return wrapper.error(err);
    }
    return wrapper.data(data)
  }

  async findByPhone(sheet, { phone }) {
    const { err, data } = await this.stein.find(sheet, {
      search: {
        phone
      }
    });
    if (err) {
      return wrapper.error(err);
    }
    return wrapper.data(data)
  }
}

module.exports = Repository;
