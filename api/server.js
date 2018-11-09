const actionModel = require('../data/helpers/actionModel.js');
const projectModel = require('../data/helpers/projectModel.js');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();
//----- MIDDLEWARE ---------

server.use(express.json());
server.use(helmet());
server.use(morgan('short')); 

/*
TASKS
---- perform CRUD operations on projects and actions.
----- retrieve the list of actions for a project.

* Actions requirements *

> project_id: number, required, must be the id of an existing project.

> description: string, up to 128 characters long, required.
> notes: string, no size limit, required. 
Used to record additional notes or requirements 
to complete the action.

*/

//********************** PROJECT CRUD **********************// 

//----- GET projects -----

 server.get('/api/projects', (req, res) => {
    projectModel.get() 
    .then(projects=> { 
      res.status(200).json(projects);
    }) 
    .catch(err => {
      res
        .status(500)
        .json({ error: "The project information could not be retrieved." });
    });
});

server.get('/api/projects/:id', (req, res) => {
    // !!! TEST ME AFTER COMPLETING POST AND ADDING PROJECTS
    const { id } = req.params; 
    projectModel.get(id)
      .then(project => { 
        console.log(project)
        if (!project) { 
        res.status(404).json({ message: "The user with the specified ID does not exist." });
        return  
        } else if (project){ 
        res.status(200).json(project);
        return  
        }
      })
      .catch(err => {
        res 
          .status(500)
          .json({ error: "The project information could not be retrieved." });
      });
  });

//----- POST projects -----

server.post('/api/projects', async (req, res) => {
    const projectData = req.body;
    const characterLimit = 128;
    let newProject;

    if (!projectData.name || projectData.name==="" || !projectData.description || projectData.description===""  ) {
        const errorMessage = "Please provide both a name and description for the project"; 
        res.status(400).json({ errorMessage});
        return
    }   
    if (projectData.name.length > characterLimit) {
        const errorMessage = "Please provide name under 128 characters"; 
        res.status(400).json({ errorMessage});
        return
    }  
    try {
        newProject = await projectModel.insert(projectData);
    } catch (error) {
            res.status(500).json({ error: "There was an error while saving the project to the database" });
            return      
    }
    console.log(newProject)
    res.status(201).json(newProject);
    return
});

//----- PUT projects -----

server.put('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
    const projectChanges = req.body;
    const characterLimit = 128;
    projectModel.get(id)
        .then(project => { 
        if (!project) { 
           res.status(404).json({ message: "The project with the specified ID does not exist." });
           return  
         }
         })
         .catch(err => {
          res
            .status(500)
            .json({ error: "The project information could not be retrieved." });
         });
          
        if (!projectChanges.name || projectChanges.name==="" || !projectChanges.description || projectChanges.description==="") {
          const errorMessage = "Please provide name and description for the project"; 
          res.status(400).json({ errorMessage });
          return
        } 
        if (projectChanges.name.length > characterLimit) {
            const errorMessage = "Please provide name under 128 characters"; 
            res.status(400).json({ errorMessage});
            return
        }   
        try {
          await projectModel.update(id, projectChanges)
          return
        } catch (error) {
        res.status(500).json({ error: "There was an error while saving the project to the database" });
        return      
      }
      console.log(req.body)
      res.status(201).json(req.body);
      return
      });

//----- DELETE projects -----

server.delete('/api/projects/:id', (req, res) => {
    const id = req.params.id;
   // userDb.get(id)
   projectModel.remove(id)
   .then(count => res.status(200).json(count))
   .catch(err => {
    res 
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

//**********************  ACTION CRUD ********************** // 

//----- GET actions -----

// !!!!! RETEST AFTER ADDING ACTIONS POST !!!!!!

server.get('/api/actions', (req, res) => {
    actionModel.get() 
    .then(actions=> { 
      res.status(200).json(actions);
    }) 
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

server.get('/api/projectactions/:id', (req, res) => {
    const { id } = req.params; 
    projectModel.getProjectActions(id)
      .then(project => { 
        console.log(project)
        if (!project) { 
        res.status(404).json({ message: "The project with the specified ID does not exist." });
        return  

        } else if (!project.length) { 
         res.status(404).json({ message: "The project with the specified ID does not have any actions yet." });
         return  

         } else if (project && project.length){ 
        res.status(200).json(project);
        return  
        }
      })
      .catch(err => {
        res 
          .status(500)
          .json({ error: "The post information could not be retrieved." });
      });
  });

server.get('/api/singleaction/:id', (req, res) => {
    const { id } = req.params; 
    actionModel.get(id)
      .then(action => { 
        console.log(action)
        if (!action) { 
        res.status(404).json({ message: "The action with the specified ID does not exist." });
        return  
        } else if (action){ 
        res.status(200).json(action);
        return  
        }
      })
      .catch(err => {
        res 
          .status(500)
          .json({ error: "The post information could not be retrieved." });
      });
  });

//----- POST actions -----

server.post('/api/projectactions/:id', async (req, res) => {
    const { id } = req.params; 
    const actionData = req.body;
    const characterLimit = 128;
    let newAction;

    if (!actionData.project_id || actionData.project_id !== id || actionData.project_id=== "" ) {
        const errorMessage = "Please provide the correct id number for  project"; 
        res.status(400).json({ errorMessage});
        return
    } 
  
    if (!actionData.description|| actionData.description==="" || !actionData.notes || actionData.notes===""  ) {
        const errorMessage = "Please provide both a note and description for the project"; 
        res.status(400).json({ errorMessage});
        return
    }  
    if (actionData.description.length > characterLimit) {
        const errorMessage = "Please provide description under 128 characters"; 
        res.status(400).json({ errorMessage});
        return
    }  
    try {
        newAction = await actionModel.insert(actionData);

    } catch (error) {
        console.log(error)
            res.status(500).json({ error: "There was an error while saving the project to the database" });
            return      
    }

    res.status(201).json(newAction);
        return
});


//----- PUT actions -----

server.put('/api/singleaction/:id', async (req, res) => {
   console.log("HI")
    const { id } = req.params;
    const postChanges = req.body;
    postDb.get(id)
        .then(post => { 
        if (!post) { 
           res.status(404).json({ message: "The post with the specified ID does not exist." });
           return  
         }
         })
         .catch(err => {
          res
            .status(500)
            .json({ error: "The post information could not be retrieved." });
            return
         });
        if (!postChanges.text || postChanges.text==="" || !postChanges.postedBy || userChanges.postedBy==="" ) {
          const errorMessage = "Please provide both posted by name and text for the post update"; 
          res.status(400).json({ errorMessage });
          return
        } 
        try {
          await postDb.update(id, postChanges)
        } catch (error) {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
        return      
      }
      res.status(201).json(post);
      return
      });

//----- DELETE actions -----

server.delete('/api/singleaction/:id', (req, res) => {
    const id = req.params.id;
   // userDb.get(id)
   userDb.remove(id)
   .then(count => res.status(200).json(count))
    // .then(user => { 
     // console.log("we're in then")
        //  if (!user) { 
        //  res.status(404).json({ message: "The post with the specified ID does not exist." });
        /*  return
       } else if (user){ // or oops - if we could retrieve it, we would but it's not here, status 404
        userDb.remove(user.id) 
         res.status(200).json({ message: "The post with the specified ID was deleted." });
         return
       }
        })*/
        .catch(err => {
          res //if data can't be retrieved ... 
            .status(500)
            .json({ error: "The post information could not be retrieved." });
        });
        //res.status(200).json({ message: "The post with the specified ID was deleted." });
      });
module.exports = server;
  
