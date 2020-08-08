const classDB = require("./ClassesDB");
const classScheduleDB = require("./ClassScheduleDB");

module.exports.create = async function create(
  db,
  { proffy, classValue, classSchedule }
) {
  // inserir dados na table proffys

  const insertedProffy = await db.run(`
          INSERT INTO proffys (
              name,
              avatar,
              whatsapp,
              bio
          ) VALUES (
              "${proffy.name}",
              "${proffy.avatar}",
              "${proffy.whatsapp}",
              "${proffy.bio}"
          );
     `); //Insercao proffy

  const proffy_ID = insertedProffy.lastID;

  const class_ID = await classDB.create(db, { proffy_ID, classValue });

  if (class_ID) {
    classScheduleDB.create(db,{ class_ID: class_ID.lastID, classSchedule })
  }
};

module.exports.selectAll = async function (db) {
  return await db.all("SELECT * FROM proffys");
};

module.exports.selectByID = async function(db,proffy_ID){
    return await db.all(`SELECT proffys.*,classes.* FROM proffys
    JOIN
    classes on(proffys.id = classes.proffy_id) WHERE classes.proffy_id = ${proffy_ID};`);
}

module.exports.selectProffyByClassAndSchedule = async function(db,{class_ID,time}){
    return await db.all(`SELECT proffys.*,classes.*,class_schedule.* FROM proffys
    JOIN
    classes on(proffys.id = classes.proffy_id) 
    JOIN
    class_schedule on(classes.id = class_schedule.class_id)
    WHERE classes.proffy_id = ${class_ID}
    and
    class_schedule.time_from >= ${time} and class_schedule.time_to < ${time};`);
}