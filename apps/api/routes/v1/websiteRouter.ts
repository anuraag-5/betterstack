import { Router } from "express";
import client from "store/client";

const websiteRouter = Router();

websiteRouter.get("/", (req, res) => {
  res.send("Welcome to the website router");
});

websiteRouter.get("/:websiteID/status", (req, res) => {
  const websiteID = req.params.websiteID;
  res.json({
    websiteID,
    status: "Online",
  });
});

export default websiteRouter;