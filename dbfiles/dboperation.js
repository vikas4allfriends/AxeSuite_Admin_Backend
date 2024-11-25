const config        = require('./dbconfig.js')

  const sql                 = require('mssql')

const getAllPerson = async () => {
  try {
    let pool = await sql.connect(config);
    let persons = await pool.request().query("SELECT * FROM Students");
    console.log(persons);
    return persons;
  }
   catch (error) {
    console.error('Error fetching all Students:', error);
  }
}
const createPerson = async(Person) => {
    try{
        let pool = await sql.connect(config);
        let persons = await pool.request().query(`
            INSERT INTO Students (ID, NAME, CITY, STATE)
            VALUES (${Person.ID}, '${Person.NAME}',' ${Person.CITY}', '${Person.STATE}')
        `);
        return persons;
    }
    catch(error){
        console.log(error);
    }
  }
//delet person 
const deletePerson= async(ID)=>{
  let pool=await sql.connect(config);
  let persons= await pool.request().query(`DELETE FROM Students WHERE ID=(${ID})`);
  return persons;
}

//update person 
const updatePerson = async(Person) => {
  try {
      let pool = await sql.connect(config);
      let persons = await pool.request()
      .query(`UPDATE Students SET NAME = '${Person.NAME}', CITY = '${Person.CITY}',STATE = '${Person.STATE}' WHERE ID = ${Person.ID}`);
      return persons;
  }
  catch(error) {
      console.log(error);
  }
}
module.exports = {
    getAllPerson,
    createPerson,
    deletePerson,
    updatePerson
}