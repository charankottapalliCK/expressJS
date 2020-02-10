const express = require('express');

const router = express.Router();

module.exports = (param) => { // here param is recieved as the Feedback Service
    const{feedbackService} = param;

    router.get('/', async (req, res, next) => { // since we are using the await in line 10 for feedback service we need to use asyn for the callback
        try{
            const feedbacklist = await feedbackService.getList();
            return res.render('feedback',{
                page:'Feedback',
                feedbacklist, // passing the feedback to the template in order to be accessed in the html pages
                success : req.query.success, //passing the query parameter in form submit success = True/False
            });
        } 
        catch(err){
            return err;            
        }
        
    });

    router.post('/', async (req, res, next) => {
        try{
        const fbName = req.body.fbName.trim();
        const fbTitle = req.body.fbTitle.trim();
        const fbMessage = req.body.fbMessage.trim();
        const feedbacklist = await feedbackService.getList();

        if(!fbName || !fbTitle || !fbMessage){
            return res.render('feedback',{
                page: 'Feedback',
                error: true,
                fbName,
                fbTitle,
                fbMessage,
                feedbacklist,
            });
        }
        await feedbackService.addEntry(fbName, fbTitle, fbMessage); // send data to JSON file by calling the addEntry in feedbackSerivce class
        return res.redirect('/feedback?success=true');
        }

        catch(err){
            return res.send(err);
        }
        
    });
    
    return router;
};