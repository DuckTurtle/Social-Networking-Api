import dateFormat, { masks } from "dateformat";


const formatDate = (passed) => {
const recived = passed
let date = dateFormat(recived, "mmmm dS, yyyy, h:MM:ss TT")
return date
}

module.exports = formatDate