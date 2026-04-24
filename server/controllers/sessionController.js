const Session = require("../models/Session");

const createSession = async (req, res) => {
  try {
    const session = await Session.create(req.body);
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSessions = async (req, res) => {
  try {
    const filter = {};
    if(req.query.focusLevel){
      filter.focusLevel = Number(req.query.focusLevel);
    }
    
    if(req.query.duration){
      filter.duration = Number (req.query.duration);
    }

    if(req.query.userId){
      filter.userId = req.query.userId;
    }
    const sessions = await Session.find(filter);
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSession = async (req, res) => {
  try{
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );
    if (!session) {
      return res.status(404).json({error: "Session not found"});
    }
    res.json(session);
  } catch (error){
    res.status(500).json({error: error.message});
  }

};

const deleteSession = async (req, res) => {
  try{
    const session = await Session.findByIdAndDelete(req.params.id);

    if (!session){
      return res.status(404).json({error: "Session not found"});
    }
    res.json({message:"Session deleted"});
  }catch(error){
    return res.status(500).json({error: error.message});
  }

};

const getPopulatedSession = async (req,res) =>{
  try{
    const sessions = await Session.find()
    .populate("userId", "name email studyGoal")
    .populate("subjectId", "name difficultyLevel");

    res.json(sessions);
  }catch(error){
    res.status(500).json({error: error.message});
  }
}


module.exports = {
  createSession,
  getSessions,
  updateSession,
  deleteSession,
  getPopulatedSession,
};