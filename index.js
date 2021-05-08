const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.post("/user", async (req, res) => {
  try {
    const { user } = req.body;
    const new_user = await pool.query(
      "INSERT INTO app_user (name, nick_name, discord, ts, live_url) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [user.name, user.nick_name, user.discord, user.ts, user.live_url]
    );
    res.json(new_user.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM app_user");
    res.json(users.rows);
  } catch (error) {
    console.error(error);
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM app_user WHERE user_id = $1", [
      id,
    ]);

    res.json(user.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

app.put("/user/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { user } = req.body;
      const updateUser = await pool.query(
        "UPDATE app_user SET name = $2, nick_name = $3, discord = $4, ts = $5, live_url = $6 WHERE user_id = $1 RETURNING *",
        [id, user.name, user.nick_name, user.discord, user.ts, user.live_url]
      );
  
      res.json(updateUser.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

app.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM app_user WHERE user_id = $1", [id]);
    res.json("User was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => console.log("Server has started on port 5000"));
