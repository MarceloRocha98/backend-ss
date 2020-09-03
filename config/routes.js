module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)


    app.route('/upload/:id')
        .all(app.config.passport.authenticate())
        .post(app.api.user.updateProfile)
        .get(app.api.user.getImg) 
    
    app.route('/users/:id')
        .all(app.config.passport.authenticate())  
        .get(app.api.services.getUserById)
    
    app.route('/users')
        .all(app.config.passport.authenticate()) 
        .post(app.api.user.save)
        .get(app.api.user.get)
    
    

    app.route('/services/:id') 
        .all(app.config.passport.authenticate()) 
        .put(app.api.services.save)
        .get(app.api.services.getById) 
        .delete(app.api.services.remove)

    app.route('/services')
         .all(app.config.passport.authenticate())  
        .post(app.api.services.save)
        .get(app.api.services.get)

    
    app.route('/handleService/:id') // o id é acessado por req.params.id no backend e enviado por `handleService/${id}` no frontend
        .all(app.config.passport.authenticate())  
        .get(app.api.services.getHandle)
        .delete(app.api.services.deleteServicesAccepts)
    
    
    app.route('/handleService')
        .all(app.config.passport.authenticate())  
        .post(app.api.services.insertServicesInUser)
        .get(app.api.services.getServicesAccepts)
 
    
    app.route('/contact/:userTo/:userFrom')
        .all(app.config.passport.authenticate())
        .post(app.api.contact.save)
        .delete(app.api.contact.remove)
        .get(app.api.contact.get)
    


    app.route('/serviceArea/:serviceId')
        .all(app.config.passport.authenticate())
        .put(app.api.serviceArea.handleFinish)
    
    app.route('/serviceArea/:id/:serviceId')
        .all(app.config.passport.authenticate())
        .get(app.api.serviceArea.get)
    
    app.route('/serviceArea/:id/:chekingLocal')
        .all(app.config.passport.authenticate())
        .put(app.api.serviceArea.modify)

       
        
    app.route('/serviceArea')
        .all(app.config.passport.authenticate())
        .post(app.api.serviceArea.save)
      
    app.route('/payment/:userId/:serviceId') 
        .all(app.config.passport.authenticate())
        .get(app.api.payment.get)
        .delete(app.api.payment.remove)
        .put(app.api.payment.update)
       
    
    app.route('/payment') 
        .all(app.config.passport.authenticate())
        .post(app.api.payment.save)
      
    
    app.route('/profile')
        .all(app.config.passport.authenticate())
        .post(app.api.profile.save)

}