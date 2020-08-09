const proffys = require("./model/proffys");
const subjects = require("./model/subjects");
const week = require("./model/week");
const {getSubject,convertHoursToMinutes} = require("./utils")



function pageLanding(req, resp) {
    return resp.render("index.html");
  }
  
  async function pageStudy(req, resp) {
    let filter = req.query;


    if(!filter.subject || !filter.weekday || !filter.time){
       
        return resp.render("study.html", {
            filter,
            subjects,
            week,
            tittle: "Hi From Nunjucks",
          });
    }

    try {
        let timeToMinutes = convertHoursToMinutes(filter.time)


        let proffList = await proffys.returnProffyByClassAndSchedule({class_ID: filter.subject,time: timeToMinutes,weekday:filter.weekday})
        
        proffList.map((proff)=>{
            proff.subject = getSubject(proff.subject)
        })


        return resp.render("study.html", {
          proffys:proffList,
          filter,
          subjects,
          week,
          tittle: "Hi From Nunjucks",
        });
    } catch (error) {
        console.log(error)
    }
  }
  
  function pageGiveClasses(req, resp) {
    let data = req.query;
  
    try {
        if (Object.keys(data).length > 0) {
          
            proffys.add(data);
            //data.subject = getSubject(data.subject);

            return resp.redirect("/study");
          }
    } catch (error) {
        console.log(error)
    }
  
    return resp.render("give-classes.html", { subjects, week });
  }

  function saveClasses(req,resp){  
    const data = req.body;

    try {

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


    
      const classSchedule = req.body.weekday.map(
          (weekday,index) => {
            return {
              weekday: weekday,
              time_from: convertHoursToMinutes(req.body.time_from[index]),
              time_to: convertHoursToMinutes(req.body.time_to[index])
            }
          }
      )
      
  
      proffys.addBody({proffy,classValue,classSchedule});
      let queryString = `?subject=${req.body.subject}&weekday=${req.body.weekday[0]}&time=${req.body.time_from[0]}`

      return resp.redirect('/study'+queryString)
    } catch (error) {
      console.log(error)
    }

  }


  module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
  }