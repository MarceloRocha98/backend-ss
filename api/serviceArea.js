

module.exports = app => {
    
    const save = (req, res) => {
        
        const data={...req.body}

        app.db('serviceArea')
            .insert(data)
            .then(res.status(204).send())
            .catch(res.status(500))
    }

    const modify =async (req, res) => {
        
        const userId1=  req.params.id //qm ta realizando o serviço
        const chekingLocal = req.params.chekingLocal
        const chekingLocal2 = req.query.chekingLocal2
 

        if (userId1 && chekingLocal) {
            
           await app.db('serviceArea')
                .where({
                    userId1,
                })
                .update({
                    chekingLocal1:chekingLocal,
                })
                .then(_=>res.status(204).send())
                .catch(err => res.status(500))
            

        }
        if (chekingLocal2) {
            await app.db('serviceArea')
            .where({
                userId1,
            })
            .update({
                chekingLocal2:chekingLocal2,
            })
            .then(_=>res.status(204).send())
            .catch(err => res.status(500))
        }

 
    }
 
    const get = async (req, res)=>{
      //  const data = { ...req.body }
        const userId1 = req.params.id //qm esta realizando o serviço
        const serviceId = req.params.serviceId
        const userId2 = req.query.userId2 
       
        if (userId1 !=='0') {
       
            await app.db('serviceArea')
                .select('chekingLocal1','chekingLocal2','finish1','finish2','id') 
                .where({
                    userId1,
                    userId2,
                    serviceId,
                })
                .then(value => res.json({ data: value })) 
                .catch(err=>res.status(500).send(err))
        } else {

       
            await app.db('serviceArea')
                .select('finish1', 'finish2', 'id')
                .where({ serviceId })
                .then(value => res.json({ data: value }))
                .catch(err=>res.status(500).send(err))
        }


    }
    
    const handleFinish = async (req, res) => {
        const serviceId = req.params.serviceId
        const finish1=req.query.finish1
        const finish2 = req.query.finish2
        
        if (finish1 || finish2) {
            
            if (finish1) {
                await app.db('serviceArea')
                    .where({ serviceId })
                    .update({ finish1 })
                    .then(_ => res.status(204).send())
                    .catch(err=>res.status(500).send(err))
    
            }
    
            if (finish2) {
                await app.db('serviceArea')
                    .where({ serviceId })
                    .update({ finish2 })
                    .then(_ => res.status(204).send())
                    .catch(err=>res.status(500).send())
            }
        }
    }
    

    return {save,modify,get,handleFinish }
}