const path = require("path"); //fs : file system

const uploadSingleFile = async(fileObject) => {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

    // Use the mv() method to place the file somewhere on your server

    //save => public/images/upload
    let uploadPath = path.resolve(__dirname, "../public/images/upload");

    // abc.png => abc-timestamp.png
    // upload mutiple files

    //get image extension
    let extName = path.extname(fileObject.name);
    //get images name (without extension)
    let baseName = path.basename(fileObject.name, extName);

    //create final path: eg: /upload/your-image.png
    let finalName = `${baseName}-${Date.now()}${extName}`
    let finalPath = `${uploadPath}/${finalName}`;
    try {
        await fileObject.mv(finalPath);
        return {
            status: "success",
            path: finalName,
            error: null
        }
    } catch (err) {
        console.log(">>> check error: ", err)
        return {
            status: "failed",
            path: null,
            error: JSON.stringify(err)
        }
    }
}

const uploadMultipleFiles = async(filesArr) => {
    try {
        let uploadPath = path.resolve(__dirname, "../public/images/upload");
        let resultArr = [];
        let countSuccess = 0;

        for (let i = 0; i < filesArr.length; i++) {
            let extName = path.extname(filesArr[i].name);
            let baseName = path.basename(filesArr[i].name, extName);

            // Tạo tên file cuối cùng với timestamp
            let finalName = `${baseName}-${Date.now()}${extName}`;
            let finalPath = `${uploadPath}/${finalName}`;

            try {
                // Di chuyển file đến đường dẫn cuối cùng
                await filesArr[i].mv(finalPath);

                resultArr.push({
                    status: "success",
                    path: finalName,
                    fileName: filesArr[i].name,
                    error: null
                });
                countSuccess++;
            } catch (err) {
                resultArr.push({
                    status: "failed",
                    path: null,
                    fileName: filesArr[i].name,
                    error: JSON.stringify(err)
                });
            }
        }

        return {
            countSuccess: countSuccess,
            detail: resultArr
        };
    } catch (error) {
        console.log(error);
        return {
            countSuccess: 0,
            detail: [],
            error: "An unexpected error occurred."
        };
    }
}


module.exports = {
    uploadSingleFile,
    uploadMultipleFiles
}