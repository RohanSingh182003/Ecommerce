import User from "../../models/User";
import connectDb from "../../middleware/mongoose"

const handler = async (req,res) => {
    if(req.method === 'POST'){
        let user =await User.findOne({email:req.body.email})
        if(user){
        if(user.email == req.body.email && user.password == req.body.password){
            res.status(200).json({success:true});
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