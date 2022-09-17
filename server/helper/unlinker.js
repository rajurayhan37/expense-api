const fs = require('fs')

const remove = (file, path) => {
    fs.unlink(path +'/' + file, cb)
    function cb(err) {
        if(err){
            return 
        }else{
            return 
        }
    }
}

module.exports = remove