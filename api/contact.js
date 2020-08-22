module.exports = app => {
    
    const save = (req, res) => {
        const userFrom = req.params.userFrom 
        const userTo = req.params.userTo 
        const msg = { ...req.body }


        const data = {
            userFrom,
            userTo,
            mensage: msg.mensage,
            serviceId:msg.serviceId
        }
        app.db('contact')
            .insert(data)
            .then(_ => res.status(204).send())
            .catch(err=>res.status(500).send())
        
        
    }

    const get = (req, res) => {
        const userFrom = req.params.userFrom 
        const userTo = req.params.userTo 
        const serviceId=parseInt( req.query.serviceId)

        app.db('contact')
            .select("mensage")
            .where({
                userFrom,
                userTo,
                serviceId,
            })
            .then(msgs => res.json({ data: msgs }))
            .catch(err=>res.status(500).send(err))
    }
    const remove=async (req, res) => {
        const userFrom = req.params.userFrom 
        const userTo = req.params.userTo 
        const serviceId = parseInt(req.query.serviceId)
        
        try {
                
            const rowsDeleted= await app.db("contact")
            .where({userFrom,userTo,serviceId})
            .del()
            existsOrError(rowsDeleted, 'serviço não encontrado')
            res.status(204).send()
        } catch(err) {
            res.status(500).send(err)
        }
    }

    return {save,get,remove}
}