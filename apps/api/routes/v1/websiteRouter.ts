import { Router } from "express";
import client from "store/client";
import express from "express";
import { authMiddleware } from "../../middleware";

const websiteRouter = Router();

websiteRouter.use(express.json());
websiteRouter.use(authMiddleware);

websiteRouter.post("/", async (req, res) => {
  const newWebsite = await client.website.create({
    data: {
      timeAdded: new Date(),
      url: req.body.url,
      user_id: req.userId,
    },
  });

  res.json({
    id: newWebsite.id,
  });
});

//@ts-ignore
websiteRouter.get("/:websiteID/status", async (req, res) => {
  const websiteID = req.params.websiteID;
  const user_id = req.userId;

  try {

    let website = client.website.findFirst({
      where: {
        id: websiteID,
        user_id,
      },
      include: {
        ticks: {
          orderBy: [{
            createdAt: 'desc'
          }],
          take: 1
        }
      }
    });

    if (!website)
      return res
        .status(409)
        .json({ message: "You have not created this website" });
    
    res.json({
      website
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    })
  }
});

export default websiteRouter;
