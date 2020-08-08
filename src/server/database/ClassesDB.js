module.exports.create = async function create(db, { proffy_ID, classValue }) {
  // inserir dados na table proffys


  const insertedClass = await db.run(`
            INSERT INTO classes(
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                ${proffy_ID}
            );   
       `); // Insercao Class
  return insertedClass;
};

module.exports.selectAll = async function (db) {
    return await db.all("SELECT * FROM classes");
  };


  module.exports.selectWithClassesSchedules = async function(db,class_ID){
    return await db.all(`
        SELECT classes.*,class_schedule.*
        FROM class_schedule
        JOIN classes ON (classes.id = class_schedule.class_id)
        WHERE  classes.id = ${class_ID}
    `)
}
  