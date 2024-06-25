const DBO = require('../db/conn.js') ;
const { ObjectId } = require('mongodb') ;
const uuidv4 = require('uuid').v4;


//This route will help you get a single Session by id
const getUserSession = async (req, res) => {
    let db_connect = DBO.getDb();
    try{
        const ID = { _id: new ObjectId(req.params.id) };

        const RESULT = await db_connect
        .collection("session")
        .findOne(ID);

        res.status(RESULT ? 200 : 404).send(RESULT || "Not found");  
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error"});
    }
};

//This route creates a new session for the given user.
const createSession = async (req,res) => {
    let db_connect = DBO.getDb();
    try {
        const COLLECTION = db_connect.collection("session");
        const { id } = req.params;
        const session_token = uuidv4();

        await COLLECTION.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 86400 });

        const NEW_SESSION = {
            session_token,
            session_date: new Date(),
            user: id
        };

        await COLLECTION.insertOne(NEW_SESSION);

        res.json({
            status: "ok",
            data: { token: session_token },
            message: "Session saved successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Error",
            message: "Error saving session",
        });
    }
  
};

// This route validates a session token and returns information about the associated user
const validateToken = async (req, res) => {
    const TOKEN = req.query.token;
    let db_connect = DBO.getDb();
    try{
        const SESSION = await db_connect.collection("session").findOne({ session_token: TOKEN});
        if (!SESSION) {return res.json({ status: 'error', data: null, message: 'Invalid session token'});}

        const USER = await db_connect.collection("users").findOne({_id: new ObjectId(SESSION.user) });
        if (!USER) {return res.json({status: 'error', data:null, message: 'Invalid user session' });}

        const {_id, email} = USER;

        console.log("TokenUUID valideated")
        res.json({
            status: 'ok',
            data: {
                valid: true,
                user: {id: _id, email},
                message: null
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Error",
            message: "Error validating session token",
            data: null
        });
    }
};

module.exports = { getUserSession,createSession,validateToken};