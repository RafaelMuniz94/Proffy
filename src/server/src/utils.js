function getSubject(subjectNumber) {
    return subjects[subjectNumber];
  }


  function convertHoursToMinutes(time){
    let [hours,minutes] = time.split(":")
    return Number((hours*60) + minutes)
  }

module.exports = {
    getSubject,
    convertHoursToMinutes
}