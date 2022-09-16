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

async function insertInto(table, filds, values){
    const query = `
    INSERT INTO 
    ${table} 
    (${filds})
    values(${values});`

    try {
        const [results, metadata] = await sequelize.query(query)
        return results

    } catch (error) {
        throw error   
    }
}

/* função especifica para essa tabela, insiro todos os dados novos na tabela novamente */
async function updateTableSazonalidade(table, filds, values){
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

async function updateTable2(table, values, conditions){
    const query = `
    update ${table} 
    ${values}
    where 1 = 1 ${conditions}
    `

    try {
        const [results, metadata] = await sequelize.query(query)
        return results

    } catch (error) {
        throw error   
    }
}
async function deleteTable(table){
    const query = `SET SQL_SAFE_UPDATES = 0; delete from ${table}`

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
    , updateTableSazonalidade
    , deleteTable
    , updateTable2
}