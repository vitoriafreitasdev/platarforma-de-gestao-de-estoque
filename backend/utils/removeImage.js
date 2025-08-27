const fs = require("fs")
const removedImage = (image) => {
    fs.unlink(`public/${image.src}`, (err) => {
        if(err){
            console.log(err)
        } else {
            console.log("Imagem deletada.")
        }
    })
}

module.exports = removedImage