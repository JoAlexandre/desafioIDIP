const { Sequelize } = require('sequelize');
const database = 'idip'

const sequelize = new Sequelize(database, 'admin', 'admin2022', {
    host: 'database-1.cdatatkl8loy.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    // port:'3306'
});

async function connection(){
    try {
        await sequelize.authenticate();
        return 'DB Connection has been established successfully.'
      } catch (error) {
        throw 'Unable to connect to the database:' + error
      }
}

async function getTable(tableName, filter = ''){
    const query = `SELECT * FROM ${tableName} WHERE 1 = 1 ${filter};`
    console.log(query)
    try {
        const [results, metadata] = await sequelize.query(query)
        return results

    } catch (error) {
        throw error   
    }
}

async function insertInto(table, values){
    const query = `
    INSERT INTO 
    ${table} 
    values(${values});`

    try {
        const [results, metadata] = await sequelize.query(query)
        return results

    } catch (error) {
        throw error   
    }
}

async function updateTable(table, filds, values){
    const query = `
    insert into ${table} 
    (${filds})
    values(${values})
    `

    try {
        const [results, metadata] = await sequelize.query(query)
        return results

    } catch (error) {
        throw error   
    }
}

async function deleteTable(table){
    const query = `delete from ${table}`

    try {
        const [results, metadata] = await sequelize.query(query)
        return results

    } catch (error) {
        throw error   
    }
}

module.exports = {
      connection
    , getTable
    , insertInto 
    , updateTable
    , deleteTable
}