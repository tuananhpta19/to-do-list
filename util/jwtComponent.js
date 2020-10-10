var jwt = require("jsonwebtoken");


var generationJWT = (value, secret , expressIn) => {
    return new Promise((resolve, reject) => {
        let token = jwt.sign({value}, secret, {expiresIn: expressIn})
        resolve(token)
    })
}


var verifyJWT = (value, secret) => {
    return new Promise((resolve, reject) => {
        try {
            let decodeToken = jwt.verify(value, secret)
            resolve(decodeToken)
        } catch (error) {
            if(error.message === "jwt must be provided"){
                reject("chưa cung cấp token")
              }
              if(error.message === "jwt expired"){
                reject("token hết hạn");
              }
              if(error.message === "invalid signature"){
                reject("mã token sai vui lòng gửi lại");
              }
             reject("lỗi server")
        }
    })
}

module.exports = {
    generationJWT,
    verifyJWT
};
