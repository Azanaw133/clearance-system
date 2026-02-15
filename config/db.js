const { Pool } = require('pg');
require('dotenv').config();

// ✅ Use Neon DATABASE_URL (Required for Render)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Test database connection
pool.connect()
    .then(() => console.log('✅ Connected to PostgreSQL database'))
    .catch(err => console.error('❌ Database connection error:', err));


// ================================
// MySQL Compatibility Layer
// ================================
pool.execute = async function (sql, params = []) {

    // 1️⃣ Convert ? placeholders → $1, $2, $3
    let paramIndex = 1;
    let pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);

    // 2️⃣ Replace backticks with double quotes
    pgSql = pgSql.replace(/`/g, '"');

    // 3️⃣ Fix LIMIT offset, count → LIMIT count OFFSET offset
    pgSql = pgSql.replace(/LIMIT\s+(\d+)\s*,\s*(\d+)/gi, 'LIMIT $2 OFFSET $1');

    // 4️⃣ Handle INSERT to return id
    const isInsert = /^INSERT/i.test(pgSql);
    if (isInsert && !/RETURNING/i.test(pgSql)) {
        pgSql += ' RETURNING id';
    }

    // 5️⃣ Handle SHOW TABLES LIKE
    const showTablesMatch = pgSql.match(/^SHOW\s+TABLES\s+LIKE\s+['"]([^'"]+)['"]/i);
    if (showTablesMatch) {
        const tableName = showTablesMatch[1];
        pgSql = `
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = '${tableName}'
        `;
    }

    // 6️⃣ Handle SHOW COLUMNS
    const showColumnsMatch = pgSql.match(/^SHOW\s+COLUMNS\s+FROM\s+(\S+)\s+LIKE\s+['"]([^'"]+)['"]/i);
    if (showColumnsMatch) {
        const tableName = showColumnsMatch[1].replace(/[`"']/g, '');
        const columnName = showColumnsMatch[2];
        pgSql = `
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = '${tableName}' 
            AND column_name = '${columnName}'
        `;
    }

    try {
        const result = await this.query(pgSql, params);

        // Handle INSERT result
        if (isInsert) {
            return [{
                insertId: result.rows.length > 0 ? result.rows[0].id : 0,
                affectedRows: result.rowCount
            }, undefined];
        }

        // Handle UPDATE / DELETE
        if (/^UPDATE|DELETE/i.test(pgSql)) {
            return [{
                affectedRows: result.rowCount
            }, undefined];
        }

        return [result.rows, undefined];

    } catch (err) {
        console.error('❌ SQL Error:', err.message);
        console.error('Query:', pgSql);
        throw err;
    }
};

module.exports = pool;
