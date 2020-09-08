module.exports = app => {
    
    const save = async (req, res) => {
        const id = req.params.id
        const aboutMe = req.body.aboutMe
        
        console.log(id)
        console.log(aboutMe) 
        // console.log('test')

        await app.db('profile')
            .insert({userId:id,aboutMe})
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
       
        
        
    }

    const get = async (req, res) => {
        const userId = req.params.id
        
        await app.db('profile')
            .select('aboutMe','avaliationsPoints','totalAvaliations')
            .where({ userId })
            .then(info => res.json({ data: info }))
            .catch(err=>res.status(500).send(err))
    }

    const update = async (req, res) => {
        const userId = req.params.id
        const aboutMe = req.body.aboutMe
        const condit=req.body.condit
        // console.log(condit)
        // console.log(userId)
        // console.log(aboutMe)
        if (!condit) {
            
            await app.db('profile')
            .where({ userId })
            .update({ aboutMe })
            .then(_ => res.status(204).send())
            .catch(err=>res.status(500).send())
        } else {
            
            let avaliationsPoints = req.body.avaliationsPoints
            let totalAvaliations = req.body.totalAvaliations
            let avaliation = req.body.avaliation
            
            avaliationsPoints += avaliationsPoints + avaliation
            totalAvaliations += totalAvaliations + 1

            await app.db('profile')
                .where({ userId })
                .update({avaliationsPoints,totalAvaliations
                })
                .then(_ => res.status(204).send())
                .catch(err=>res.status(500).send(err))
           
    
           
            // console.log('entrou')
   
        }

            
    }

    return { save, get,update }
} 