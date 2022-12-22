const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
app.use(express.json());
const path = require("path");
const dbpath = path.join(__dirname, cricketTeam.db);
module.exports = app;

let db = null;
const IntialiseDatabaseandServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server running at localhost:3000");
    });
  } catch (e) {
    console.log(`DB Error Message is${e.message}`);
    process.exit(1);
  }
};
IntialiseDatabaseandServer();

// GET API ALL PLAYERS

app.get("/players/", async (request, response) => {
  const getallPlayersQuery = `SELECT
    *
    FROM
    cricket_team;`;
  const playerArray = await db.all(getallPlayersQuery);
  response.send(playerArray);
});

//POST API FOR CREATING NEW PLAYER

app.post("/players/", async (request, response) => {
  const playerdetails = request.body;
  const { playerName, jerseyNumber, role } = playerdetails;
  const createnewPlayer = `
    INSERT 
    INTO
    cricket_team(player_name,jersey_number,role)
    VALUES(${PlayerName},${jerseyNumber},${role});`;
  const dbresponse = await db.run(createnewPlayer);
  response.send("Player Added to Team");
});

// GET PLAYER WITH PLAYERID

app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const getplayerquery = `
    SELECT
    *
    FROM
    cricket_team
    WHERE playerId=${playerId};`;
  const player = await db.get(getplayerquery);
  response.send(player);
});
//PUT API TO UPDATE PLATER
app.put("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const playerdetails = request.body;
  const { playerName, jerseyNumber, role } = playerdetails;
  const updateplayerquery = `
    UPDATE
    cricket_team
    SET
    player_name=${playerName},
    jersey_number=${jerseyNumber},
    role=${role}
    WHERE playerId=${playerId};`;
  await db.run(updateplayerquery);
  response.send("Player Details Updated");
});
//DELETE API TO DELETE PLAYER

app.delete("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const deleteplayerquery = `
    DELETE
    FROM
    cricket_team
    WHERE playerId=${playerId}`;
  await db.get(deleteplayerquery);
  response.send("Player Removed");
});
