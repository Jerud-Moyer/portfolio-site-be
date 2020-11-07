const pool = require('../utils/pool');

module.exports = class Fact {
  id;
  type;
  colorCode;
  text;
  imageUrl;

  constructor(row) {
    this.id = row.id;
    this.type = row.type;
    this.colorCode = row.color_code;
    this.text = row.text;
    this.imageUrl = row.image_url;
  }

  static async insert(fact) {
    const { rows } = await pool.query(
      `INSERT into facts (type, color_code, text, image_url)
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [fact.type, fact.colorCode, fact.text, fact.imageUrl]
    );

    return new Fact(rows[0]);
    
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM facts',
    );

    return rows.map(row => new Fact(row));
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM facts WHERE id=$1 RETURNING *',
      [id]
    );

    if(!rows[0]) return null;
    return new Fact(rows[0]);
  }

};
