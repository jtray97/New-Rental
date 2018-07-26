
module.exports = {
    read: (req, res)=>{
        const db = req.app.get('db')
        db.getAll(['quads']).then(response=>{res.status(200) .send(response)
           }).catch(err=>console.log(err))
    }
}