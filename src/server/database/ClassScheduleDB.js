module.exports.create = async function create( db, {class_ID, classSchedule }) {
    // inserir dados na table proffys
  
  
    const insertedAllClassesSchedules = classSchedule.map((schedule) => {
      return db.run(`
                INSERT INTO class_schedule (
    
                    weekday,
                    time_from,
                    time_to,
                    class_id
    
                ) VALUES (
                    "${schedule.weekday}",
                    "${schedule.time_from}",
                    "${schedule.time_to}",
                    ${class_ID}
                )
            `);
    });
  
    await Promise.all(insertedAllClassesSchedules);
  };


  module.exports.selectAll = async function (db) {
    return await db.all("SELECT * FROM class_schedule");
  };
  