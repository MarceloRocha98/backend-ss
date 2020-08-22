//const { default: api } = require("../../frontend/src/services/api")

module.exports = app => {
    const {  existsOrError, notExistsOrError} =app.api.validation
    const save = (req, res) => {
        const service = { ...req.body }

        if (!req.params.id) {
            
            try {
                existsOrError(service.name,'Nome não informado')
                existsOrError(service.description,'Descrição não informada')
                existsOrError(service.content,'Conteúdo não informado')
            } catch (msg) {
                return res.status(400).send(msg)
            }
        }

        if (req.params.id) {
            const serviceId = service.serviceId
            app.db('services')
                .where({ "id": serviceId })
                .update({ status: 1, userInProgress: req.params.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500))
        } else {
            app.db('services')
                .insert(service)
                .then(res.status(204).send())
                .catch(err=>res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
       // console.log('test',req.params.id)
        try {
            existsOrError(req.params.id, 'Serviço não informado')

        } catch (msg) {
            res.status(400).send(msg)
        }
        const id=req.params.id

        let payment=await app.db("payment")
            .select("id")
            .where({ serviceId: id })
        let existsInPayment=0
        if (payment.length !== 0) {
            existsInPayment=1
        }
        
        if (existsInPayment === 1) {
            await app.db('payment')
                .where({serviceId:id})
                .del()
        }

       await app.db('services')
           .where({ id})
            .delete()
            .then(_=>res.status(204).send())
            .catch(err=>res.status(500).send(err))
            
           
    }

    const get = async (req, res) => {
        const page = req.query.page || 1
        const limit = req.query.limit || 10   // 
        const condit = req.query.condit || false
        const condit2=req.query.condit2 || false
   
       const userId=req.user.id
    
        const result = await app.db('services')
            .whereNot({
                userId:userId,
            })
            .count('id')
            .first()
        const count = parseInt(result.count)

        if (!condit) {
            
            if (!condit2) { // pra arrumar problema em myservices
                app.db('services') 
                .select('id', 'name', 'description','content','userId','price','status','userInProgress','price')
                .whereNot({
                    userId:userId,
                })
                .limit(limit).offset(page * limit - limit)
                .then(services => res.json({ data: services, count, limit }))
                .catch(err => res.status(500).send(err))
            } else {
                app.db('services') 
                .select('id', 'name', 'description','content','userId','price','status','userInProgress','price')
                .limit(limit).offset(page * limit - limit)
                .then(services => res.json({ data: services, count, limit }))
                .catch(err => res.status(500).send(err))
            }
        }
        if (condit) {
            app.db('services') 
            .select('id', 'name', 'description','content','userId','price','status','userInProgress','price')
        //    .limit(limit).offset(page * limit - limit)
            .then(services => res.json({ data: services, count, limit }))
            .catch(err => res.status(500).send(err))
        }

    }


    
    const getById = async (req, res) => {   //pega os serviços do usuario pelo id do usuario
        const page = req.query.page || 1
        const result = await app.db('services').where({ userId: req.params.id }).count('id').first()
        const count = parseInt(result.count)
        const limit2=req.query.limit2 || 5
    
                 
            app.db('services') 
            .select('id', 'name', 'description', 'content','price','status','price','userId')
            .limit(limit2).offset(page*limit2-limit2)
            .where({ userId: req.params.id })
            // .first()
            .then(services => res.json({data:services,count,limit2}))
            .catch(err=>res.status(500).send(err))
       
     
        
    }

    const insertServicesInUser = async (req,res) => {
        const data = { ...req.body }
      //  console.log([data])
       // console.log(data)
       const response= await app.db("handleService")
            .insert(data)   
            .then(_=>res.status(204).send())
            .catch(err=>res.status(500).send(err))
       
         
    }

    const getServicesAccepts = async (req, res) => {
        const userId = req.query.userId 
        const serviceId=req.query.serviceId 
    
        if(userId){            
            await app.db("handleService")
            .select("service_Id")
            .where({ "user_Id": userId })
            .then(services=> res.json({data:services}))
            .catch(err=>res.status(500).send(err))
        }
        if (serviceId) {
            await app.db("handleService")
                .select("user_Id")
                .where({ "service_Id": serviceId })
                .then(services => res.json({ data: services }))
                .catch(err=>res.status(500).send(err))
        }

    }

    const getHandle = async (req, res) => {
        const user_Id = req.params.id
        const service_Id = req.query.serviceId 
        
        await app.db('handleService')
            .select('why')
            .where({
                user_Id,
                service_Id
            })
            .then(why => res.json({ data: why }))
            .catch(err=>res.status(500).send(err))
    }
    const deleteServicesAccepts = async (req, res) => {
 
        const serviceId = req.params.id
        const userId=req.query.userId
        console.log(serviceId)
        console.log(userId)
        console.log('test')
        if (!userId) {
            
            try {
            
             console.log(serviceId)
            const rowsDeleted= await app.db("handleService")
            .where({ "service_Id": serviceId })
            .del()
            existsOrError(rowsDeleted, 'serviço não encontrado')
            res.status(204).send()
        } catch(err) {
            res.status(500).send(err)
        } 
        } else {
            try { 
                console.log(userId)
                console.log(serviceId)
                const rowsDeleted= await app.db("handleService")
                .where({ "user_Id": userId, "service_Id": serviceId })
                .del()
                
                existsOrError(rowsDeleted, 'serviço não encontrado')
                res.status(204).send()
            } catch (err) {
                res.status(500).send(err)
            }
    }
    }

    const getUserById = async (req, res) => {
        const userId = req.params.id
    
        await app.db("users")
              .select('id', 'name', 'email','location','url','picUploaded')
            .where({ id: userId })
            .first()
            .then(user => res.json({ data: user }))
            .catch(err=>res.status(500).send(err))
    }

    const removeFromHandleService = async (req, res) => {
     
        const userId=req.params.userId
        const serviceId = req.query.serviceId
        console.log(userId)
       
        console.log(req)
        try {
            
            const rowsDeleted= await app.db("handleService")
            .where({ "user_Id": userId, "service_Id": serviceId })
            .del()
            
            existsOrError(rowsDeleted, 'serviço não encontrado')
            res.status(204).send()
        } catch (err) {
            res.status(500).send(err)
        }
    }

    return {save,remove,get,getById,insertServicesInUser ,getServicesAccepts,deleteServicesAccepts,getUserById,removeFromHandleService,getHandle}
}