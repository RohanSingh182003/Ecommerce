import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    let products = await Product.find()
    let homeappliances = {}
    for(let item of products){
    if(item.title in homeappliances){
        if(!homeappliances[item.title].color.includes(item.color) && item.availableQty > 0){
            homeappliances[item.title].color.push(item.color)
        }
        if(!homeappliances[item.title].size.includes(item.size) && item.availableQty > 0){
            homeappliances[item.title].size.push(item.size)
        }
    }
    else{
        homeappliances[item.title] = JSON.parse(JSON.stringify(item))
        if(item.availableQty > 0){
            homeappliances[item.title].color = [item.color]
            homeappliances[item.title].size = [item.size]
        }
    }
}
    res.status(200).json({ homeappliances })

}
export default connectDb(handler)