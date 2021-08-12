const User = require('../Model/User')
// create a new user
module.exports.Signup = (req, res) => {
    const { name, email, mobile, address } = req.body
    if (!name || !email || !mobile || !address) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    User.findOne({ email: email }).then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({ error: "email already exists" })
        } else {
            const user = new User({
                name,
                email,
                mobile,
                address
            })
            user.save().then(user => {
                return res.status(200).json({ message: "saved successfully" })
            }).catch(err => {
                return res.status(400).json({ error: err})
            })
        }
    })

}
// Get all users near to passed coordinate 
module.exports.GetUserByDistance = (req, res) => {
    const long = req.query.long;
    const lat = req.query.lat;

    User.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [long, lat]
                }
            }
        }
    }).then((data) => {
        return res.status.json({data})
    }).catch(err=>{
        return res.status(400).json({error:err})
    })
}
// Delete a user
module.exports.DeleteUser=(req,res)=>{
    User.findOneAndDelete({email:req.body.email}).then((err,data)=>{
        if(err){
            return res.status(400).json({error:err})
        }else{
            return res.status(200).json({data})
        }
    })
}
// Update an existing user
module.exports.UpdateUser=(req,res)=>{
    User.findOneAndUpdate({email:req.query.email},req.body).then((err,data)=>{
        if(err){
            return res.status(400).json({error:err})
        }else{
            return res.status(200).json({data})
        }
    })
}
// Get all users sorted by time and page limit
module.exports.GetAllUsersByTime=(req,res)=>{
    User.find().sort('-createdAT').limit((Number(req.query.pageLimit))).then(users=>{
        return res.status(200).json({data:users})
    }).catch(err=>{
        console.log(err)
        return res.status(400).json({error:err})
    })
}