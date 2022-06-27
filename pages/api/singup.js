import User from "../../models/User";
import connectDb from "../../middleware/mongoose"

const handler = async (req,res) => {
    if(req.method === 'POST'){
        let u =await new User(req.body)
        await u.save()
        res.status(200).json({Success:'Success'});
    }
    else{
        res.status(400).json({Error:'Bad Request'});
    }
}

export default connectDb(handler)