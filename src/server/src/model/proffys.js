const proffDb = require("../../database/ProffyDB");
const Database = require("../../database/db");
const {convertHoursToMinutes} = require('../utils')

module.exports.proffys = Database.then(async (db) => {
  return await proffDb.selectAll(db);
});

module.exports.add = async (data) => {
  console.log(data)
  proffy = {
    name: data.name,
    avatar: data.avatar,
    whatsapp: data.whatsapp,
    bio: data.bio,
  };
  classValue = {
    subject: data.subject,
    cost: data.cost
  };

  classSchedule = [];
  for(let i = 0; i < data.weekday.length; i++){
      classSchedule.push( {
        weekday: data.weekday,
        time_from: convertHoursToMinutes(data.time_from+''),
        time_to: convertHoursToMinutes(data.time_to+'')
      })
  }

  await Database.then(async (db) => {
    proffDb.create(db, { proffy, classValue, classSchedule });
  });
};


module.exports.addBody = async({  proffy, classValue, classSchedule }) =>{
  await Database.then(async (db) => {
    proffDb.create(db, { proffy, classValue, classSchedule });
  });
}

module.exports.returnProffyByClassAndSchedule = async ({
  class_ID,
  time,
  weekday,
}) => {
  let proffys = await Database.then(async (db) => {
    return proffDb.selectProffyByClassAndSchedule(db, {
      class_ID,
      time,
      weekday,
    });
  });

  return proffys
};
