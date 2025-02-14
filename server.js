import "dotenv/config";
import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;
const API_KEY = process.env.API_KEY;
const CITY = process.env.CITY;

app.use(express.static("public"));

// 天気情報を取得するAPIエンドポイント
app.get("/weather", async (req, res) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&lang=ja&appid=${API_KEY}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "天気情報を取得できませんでした" });
    }
});

// 天気予報を取得するAPIエンドポイント
app.get("/forecast", async (req, res) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&lang=ja&appid=${API_KEY}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "天気予報を取得できませんでした" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
