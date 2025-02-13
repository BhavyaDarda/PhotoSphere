import { useState } from "react";
import { motion } from "framer-motion";
import ImageGallery from "@/components/ImageGallery";
import ThreeScene from "@/components/ThreeScene";
import GlowingButton from "@/components/GlowingButton";
import { View, Grid2x2 } from "lucide-react"; 

const categories = [
  "All",
  "Travel",
  "Nature",
  "Portraits",
  "Architecture",
  "Street",
];

type ViewMode = "2D" | "3D";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<ViewMode>("2D");
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-playfair text-4xl md:text-5xl text-center mb-12"
        >
          Portfolio Gallery
        </motion.h1>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="glass-effect rounded-full p-1 flex gap-2">
            <button
              onClick={() => setViewMode("2D")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                viewMode === "2D"
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-white/5"
              }`}
            >
              <Grid2x2 className="w-4 h-4" />
              <span>2D View</span>
            </button>
            <button
              onClick={() => setViewMode("3D")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                viewMode === "3D"
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-white/5"
              }`}
            >
              <View className="w-4 h-4" />
              <span>3D Gallery</span>
            </button>
          </div>
        </div>

        {viewMode === "2D" && (
          <>
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full border ${
                    selectedCategory === category
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-gray-700 hover:border-primary/50"
                  } transition-colors`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            <ImageGallery category={selectedCategory} />
          </>
        )}

        {viewMode === "3D" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 glass-effect px-6 py-3 rounded-full">
              <p className="text-sm text-gray-300">
                Click and drag to explore the gallery in 3D
              </p>
            </div>
            <ThreeScene
              photos={[
                {
                  id: 1,
                  src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
                  title: "Mountain Vista"
                },
                {
                  id: 2,
                  src: "https://images.unsplash.com/photo-1447678523326-1360892abab8",
                  title: "Forest Path"
                },
                {
                  id: 3,
                  src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
                  title: "Urban Geometry"
                }
              ]}
              onPhotoSelect={(photoId) => setSelectedPhotoId(photoId)}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}