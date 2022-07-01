import User from "../../models/User";
import connectDb from "../../middleware/mongoose"
const jwt = require('jsonwebtoken');

const handler = async (req,res) => {
    if(req.method === 'POST'){
        const CryptoJS = require("crypto-js");
        let user =await User.findOne({email:req.body.email})
        let bytes  = CryptoJS.AES.decrypt(user.password, process.env.ENC_DEC_SECRETKEY);
        let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        if(user){
        if(user.email == req.body.email && decryptedData == JSON.stringify(req.body.password)){
            let token = jwt.sign(req.body, process.env.JWT_TOKEN, {
                expiresIn: "2d"
              });
            res.status(200).json({success:true ,token});
        }
        else{
            res.status(400).json({success:false , error:'Invalide Cedintials'});
        }
    }
    else{
        res.status(400).json({success:false , error:'no user found'});
    }
}
}

export default connectDb(handler)