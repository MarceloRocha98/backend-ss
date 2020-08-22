const bcrypt = require('bcrypt-nodejs') 
const textEncoding = require('text-encoding')
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError, containsNumber } = app.api.validation
    
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password,salt)
    }

    const save = async(req, res) => {
        let user = { ...req.body } // faz uma copia do corpo da requisição
        if (req.params.id) user.id = req.params.id
        
        try {
            existsOrError(user.name, 'Nome não informado') 
            existsOrError(user.sobrenome, 'Sobrenome não informado') 
            containsNumber(user.sobrenome, 'Nome/Sobrenome não pode conter números') 
            containsNumber(user.name, 'Nome/Sobrenome não pode conter números') 
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não informado')
            // existsOrError(user.location, 'Localização não informada')
            existsOrError(user.confirmPassword, 'Confirmação de senha errada')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')
            
            const userFromDB = await app.db('users') // acessa a tabela users pra ver se o email passado confere com o de algum usuario
                .where({ email: user.email }).first()
            if (!user.id) {
                notExistsOrError(userFromDB,'Usuario ja cadastrado')
            }
        } catch (msg) {
            
                return res.status(400).send(msg)
        }

        user.name= user.name + " " + user.sobrenome
        delete user.sobrenome

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if (user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(_ => res.status(204).send())
                .catch(err=>res.status(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(res.status(204).send())
                .catch(err=>res.status(500).send(err))
        }
            
    }

    const updateProfile = async (req, res) => {
        const userId = parseInt (req.params.id)
        const { name,data }=req.files.pic
        console.log(name, data)   
        

        
        if (name && data) {   


            const file = req.files.pic
            await app.db('users')
                .update({ picUploaded: 1 })
                .where({ id: userId })
            

            file.mv(`${__dirname}/public/uploads/${userId}.jpg`, err => {
                if (err) {
                    console.log(err)
                    return res.status(500).send();
                } else {
                    return res.status(204).send()
                }
            });
        } else {
            res.status(400).send('No such Files')
        }
        
    }

    
    const getImg = async (req, res) => {
        const userId = req.params.id
    
        await app.db('users')
            .select('picUploaded')
            .where({ id: userId })
            .then(picUploaded => res.json({data:picUploaded}))
            .catch(err=>res.status(500).send(err))
    }
    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email','location','picUploaded')
            .then(users => res.json(users))
            .catch(err=>{res.status(500).send(err)})
    }

    const getById = (req, res) => {
        app.db('users')
            
            
            .where({ id: req.params.id })
            .first()
            .then(users => res.json(users))
            .catch(err=>res.status(500).send(err))
    }

    return {save,get,getById,updateProfile,getImg}
}