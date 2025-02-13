import { pgTable, text, serial, json, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

export const photos = pgTable("photos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  metadata: json("metadata").$type<{
    camera?: string;
    lens?: string;
    aperture?: string;
    shutterSpeed?: string;
    iso?: string;
    location?: string;
    date?: string;
  }>(),
  aiTags: json("ai_tags").$type<string[]>(),
  aiDescription: text("ai_description"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

// Define relations
export const photosRelations = relations(photos, ({ one }) => ({
  category: one(categories, {
    fields: [photos.categoryId],
    references: [categories.id],
  }),
}));

// Create insert schemas with proper validation
export const insertContactSchema = createInsertSchema(contactMessages).omit({ 
  id: true,
  createdAt: true 
});

export const insertPhotoSchema = createInsertSchema(photos)
  .omit({
    id: true,
    createdAt: true,
    aiTags: true,
    aiDescription: true
  })
  .extend({
    categoryId: z.string().transform(val => val ? parseInt(val) : undefined),
    metadata: z.object({
      camera: z.string().optional(),
      lens: z.string().optional(),
      aperture: z.string().optional(),
      shutterSpeed: z.string().optional(),
      iso: z.string().optional(),
      location: z.string().optional(),
      date: z.string().optional(),
    }).optional(),
  });

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
  createdAt: true
});

// Export types
export type Contact = typeof contactMessages.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;

export type Photo = typeof photos.$inferSelect;
export type InsertPhoto = z.infer<typeof insertPhotoSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;