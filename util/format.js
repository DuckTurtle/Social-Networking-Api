const dayjs = require('dayjs')

const formatDate = (passed) => {
const recived = passed
let date = dayjs(recived).format('MMM D, YYYY h:mm A')
return date
}

module.exports = formatDate