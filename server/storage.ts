import { 
  photos, categories, contactMessages,
  type Photo, type InsertPhoto,
  type Category, type InsertCategory,
  type Contact, type InsertContact
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Photos
  getPhotos(): Promise<Photo[]>;
  getPhotosByCategory(categoryId: number): Promise<Photo[]>;
  createPhoto(photo: InsertPhoto): Promise<Photo>;

  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Contact Messages
  getContactMessages(): Promise<Contact[]>;
  createContactMessage(message: InsertContact): Promise<Contact>;
}

export class DatabaseStorage implements IStorage {
  // Photos
  async getPhotos(): Promise<Photo[]> {
    return await db.select().from(photos);
  }

  async getPhotosByCategory(categoryId: number): Promise<Photo[]> {
    return await db.select()
      .from(photos)
      .where(eq(photos.categoryId, categoryId));
  }

  async createPhoto(photo: InsertPhoto): Promise<Photo> {
    const [newPhoto] = await db.insert(photos)
      .values({
        ...photo,
        aiTags: [],
        aiDescription: null,
      })
      .returning();
    return newPhoto;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select()
      .from(categories)
      .where(eq(categories.slug, slug));
    return category;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories)
      .values(category)
      .returning();
    return newCategory;
  }

  // Contact Messages
  async getContactMessages(): Promise<Contact[]> {
    return await db.select().from(contactMessages);
  }

  async createContactMessage(message: InsertContact): Promise<Contact> {
    const [newMessage] = await db.insert(contactMessages)
      .values(message)
      .returning();
    return newMessage;
  }
}

export const storage = new DatabaseStorage();