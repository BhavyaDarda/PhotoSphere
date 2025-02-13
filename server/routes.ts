import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertPhotoSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";
import { analyzePhoto } from "./services/openai";

// Configure multer for image uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Create uploads directory if it doesn't exist
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

export function registerRoutes(app: Express): Server {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const message = await storage.createContactMessage(contactData);
      res.json({ success: true, message });
    } catch (error) {
      res.status(400).json({ success: false, error: String(error) });
    }
  });

  // Photo upload endpoint
  app.post("/api/upload", upload.single("image"), (req, res) => {
    try {
      if (!req.file) {
        throw new Error("No file uploaded");
      }
      const imageUrl = `/uploads/${req.file.filename}`;
      res.json({ success: true, url: imageUrl });
    } catch (error) {
      res.status(400).json({ success: false, error: String(error) });
    }
  });

  // Photo management endpoints
  app.post("/api/photos", async (req, res) => {
    try {
      const photoData = insertPhotoSchema.parse(req.body);
      const photo = await storage.createPhoto(photoData);

      // Trigger AI analysis in the background
      analyzePhoto(photoData.imageUrl, photo.id)
        .catch(error => console.error('Background AI analysis failed:', error));

      res.json({ success: true, photo });
    } catch (error) {
      res.status(400).json({ success: false, error: String(error) });
    }
  });

  app.get("/api/photos", async (req, res) => {
    try {
      const photos = await storage.getPhotos();
      res.json({ success: true, photos });
    } catch (error) {
      res.status(500).json({ success: false, error: String(error) });
    }
  });

  app.get("/api/photos/category/:categoryId", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      const photos = await storage.getPhotosByCategory(categoryId);
      res.json({ success: true, photos });
    } catch (error) {
      res.status(500).json({ success: false, error: String(error) });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}