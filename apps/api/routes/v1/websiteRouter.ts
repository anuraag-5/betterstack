import { Router } from "express";
import client from "store/client";
import express from "express";

const websiteRouter = Router();

websiteRouter.use(express.json());

websiteRouter.post("/", async (req, res) => {
  const newWebsite = await client.website.create({
    data: {
      timeAdded: new Date(),
      url: req.body.url,
      user: req.cookies.user
    }
  });

  res.json({
    id: newWebsite.id
  });
});

websiteRouter.get("/:websiteID/status", (req, res) => {
  const websiteID = req.params.websiteID;
  res.json({
    websiteID,
    status: "Online",
  });
});

export default websiteRouter;