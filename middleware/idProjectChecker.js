const db = require('../data/dbConfig.js');
module.exports = async (req, res, next) => {
    const { id } = req.params;

    try {
        console.log("IM HERE")
        let query= db('projects');
        let projects= query.where('id', Number(id)).first();
        if (!projects) {
            res.status(404).json({ message: "The project with the specified ID does not exist." });
        }
        next();
    }
    catch (err) {
        res.status(500).json({ message: "couldn't get project." });
      };
    
        // continue to the next middleware 
  };