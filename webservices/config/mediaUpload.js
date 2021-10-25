let fs = require('fs');

const process = require('./env_variables.js');




module.exports = async function upload(files, id) {

  return new Promise(async (resolve, reject) => {
    fs.mkdir(`./uploads/media`, { recursive: true }, async function (err) {

      if (err) {

        console.log("failed to create media directory")

      } else {


        fileName = files.media.name
        ext = fileName.split('.').pop();
        filename = id + "." + ext

        var oldPath = files.media.path;

        currentLoc = `/../uploads/media` + '/' + filename

        var newPath = __dirname + currentLoc
        var rawData = fs.readFileSync(oldPath)


        imagePath = `${process.env.baseURL}/uploads/media/` + filename;


        fs.writeFile(newPath, rawData, function (err) {
          if (err) {
            console.log("Failed while inserting file into directory")
            reject(new Error(err))

          }
          else {
            console.log({ "success": `Successfully inserted  file`, "type": `media` })
            resolve({ filename, imagePath })

          }

        });
      }
    })
  })

}