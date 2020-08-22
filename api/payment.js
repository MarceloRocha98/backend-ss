module.exports = app => {
    
    const save = async(req, res) => {
        const userId = req.params.userId
        const serviceId = req.params.serviceId
        const data=req.body
        
        await app.db('payment')
            .insert(data)
            .then(res.status(204).send())
            .catch(err=>res.status(500).send(err))
    }

    const get = async (req, res) => {
        const userId = req.params.userId
        const serviceId = req.params.serviceId

        await app.db('payment')
            .select('generatedBefore', 'payed', 'paymentLink','dueDate')
            .where({
                userId,
                serviceId
            })
            .then(payment => res.json({ data: payment }))
            .catch(err=>res.status(500).send(err))
    }

    const remove = async (req, res) => {
        const serviceId = req.params.serviceId
        
        await app.db('payment')
            .where({serviceId})
            .del()
            .then(_ => res.status(204).send())
            .catch(err=>res.status(500).send(err))
    }
    
    const update = async (req, res) => {
        const userId = req.params.userId
        const serviceId = req.params.serviceId

        await app.db('payment')
            .where({
                userId,
                serviceId,
            })
            .update({ 
                generatedBefore:0
            })
            .then(_ => res.status(204).send())
            .catch(err=>res.status(500).send(err))
    }

    return {save,get,remove, update}
}