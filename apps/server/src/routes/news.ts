import axios from "axios";
import express, { Request, Response } from "express";
import config from "../config/index.js";

const router = express.Router();

router.get("/news/:type", async (req: Request, res: Response) => {
    const response = await axios.get(`https://newsapi.org/v2/${req.params.type}`, {
        params: { ...req.query, apiKey: config.news_api_key },
        timeout: 60000,
    });

    res.send({ articles: response.data.articles, totalPage: Math.ceil(response.data.totalResults / 6) });
});

export const NewsRoutes = router;
