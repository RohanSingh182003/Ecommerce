import User from "../../models/User";
import connectDb from "../../middleware/mongoose"

const handler = async (req,res) => {
    if(req.method === 'POST'){
        const CryptoJS = require("crypto-js");
        let {name ,email ,password} = await req.body
        let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(password), 'secret key 123').toString();
        let u =await new User({name ,email ,password : ciphertext})
        await u.save()
        res.status(200).json({success:true});
    }
    else{
        res.status(400).json({success:false , error:'Bad Request'});
    }
}

export default connectDb(handler)