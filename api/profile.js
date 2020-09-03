module.exports = app => {
    
    const save = async (req, res) => {
        const id = req.params.id
        const aboutMe = req.body.aboutMe
        
        await app.db('profile')
            .where({id})
            .insert(aboutMe)
            .then(_ => res.status(204).send())
            .catch(err=>res.status(500).send(err))
    }

    return { save }
} 