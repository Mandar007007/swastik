const app = require('./app.js');
const {connectDatabase} = require('./config/dbconnect.js')

connectDatabase()

app.listen(process.env.PORT,()=>{
    console.log('listening on port ' + process.env.PORT)
})