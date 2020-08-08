const Database = require("./db");
const ProffyDB = require("./ProffyDB");
const ClassesDB = require("./ClassesDB");
const ClassScheduleDB = require("./ClassScheduleDB");

Database.then(async (db) => {
  // Inserir dados
  proffy = {
    name: "Rafael",
    avatar: "https://avatars0.githubusercontent.com/u/26208069?v=4",
    whatsapp: "8996451213218",
    bio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //subject: "Como fazer nada com louvor",
  };

  let classValue = {
    subject: "Portugues",
    cost: 40,
  };

  let classSchedule = [
    {
      weekday: 0,
      time_from: 3600,
      time_to: 7800,
    },
    {
      weekday: 2,
      time_from: 3600,
      time_to: 7800,
    },
    {
      weekday: 4,
      time_from: 3600,
      time_to: 7800,
    },
  ];
  // await ProffyDB.create(db, { proffy, classValue, classSchedule });



  // Consultar os dados Inseridos

  //todos 

  // let proffys = await ProffyDB.selectAll(db)

  // console.log(proffys)

  // let classes = await ClassesDB.selectAll(db)

  //  console.log(classes)

  // let classesSchedules = await ClassScheduleDB.selectAll(db)

  // console.log(classesSchedules)


  // let completeProffy = await ProffyDB.selectByID(db,1)

  // console.log(completeProffy)

  // let completeClass = await ClassesDB.selectWithClassesSchedules(db,1)

  //  console.log(completeClass)

   let completeClass = await ProffyDB.selectProffyByClassAndSchedule(db,{class_ID:1,time:7700})

   console.log(completeClass)
});
