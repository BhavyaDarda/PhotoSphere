import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "./Lightbox";
import BeforeAfterSlider from "./BeforeAfterSlider";
import PhotoDetails from "./PhotoDetails";

interface PhotoMetadata {
  camera: string;
  lens: string;
  aperture: string;
  shutterSpeed: string;
  iso: string;
  location: string;
  date: string;
  story: string;
  beforeImage?: string;
}

interface Photo {
  id: number;
  src: string;
  category: string;
  title: string;
  description: string;
  metadata: PhotoMetadata;
}

const photos: Photo[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    category: "Nature",
    title: "Mountain Vista",
    description: "Sunrise over misty mountains in the Pacific Northwest",
    metadata: {
      camera: "Sony A7III",
      lens: "24-70mm f/2.8",
      aperture: "f/8",
      shutterSpeed: "1/125",
      iso: "100",
      location: "Mount Rainier, WA",
      date: "October 15, 2023",
      story: "I woke up at 3 AM to hike to this spot, hoping to catch the perfect morning light. The mist rolling through the valleys created an ethereal atmosphere I'll never forget.",
      beforeImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&q=80"
    }
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1447678523326-1360892abab8",
    category: "Nature",
    title: "Forest Path",
    description: "A serene walking trail through an ancient forest",
    metadata: {
      camera: "Canon R5",
      lens: "16-35mm f/2.8",
      aperture: "f/4",
      shutterSpeed: "1/60",
      iso: "400",
      location: "Olympic National Park, WA",
      date: "September 5, 2023",
      story: "The morning fog created a mystical atmosphere in the forest. I waited for hours for the perfect moment when the sun's rays pierced through the canopy."
    }
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    category: "Architecture",
    title: "Urban Geometry",
    description: "Modern architectural lines in downtown Chicago",
    metadata: {
      camera: "Nikon D850",
      lens: "24-120mm f/4",
      aperture: "f/5.6",
      shutterSpeed: "1/250",
      iso: "200",
      location: "Chicago, IL",
      date: "August 10, 2023",
      story: "I was drawn to the geometric patterns and contrasting textures of this modern building."
    }
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1504593811423-6dd665756598",
    category: "Portraits",
    title: "Window Light",
    description: "Natural light portrait study",
    metadata: {
      camera: "Fuji XT-4",
      lens: "56mm f/1.2",
      aperture: "f/2.8",
      shutterSpeed: "1/100",
      iso: "800",
      location: "Seattle, WA",
      date: "July 20, 2023",
      story: "I love the way the soft window light illuminates the subject's face."
    }
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1520443240718-fce21901db79",
    category: "Travel",
    title: "Venetian Canals",
    description: "Early morning in Venice, Italy",
    metadata: {
      camera: "Sony A7R IV",
      lens: "24mm f/1.4",
      aperture: "f/2.8",
      shutterSpeed: "1/80",
      iso: "200",
      location: "Venice, Italy",
      date: "June 1, 2023",
      story: "The peacefulness of the early morning in Venice was unforgettable."
    }
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1494548162494-384bba4ab999",
    category: "Nature",
    title: "Morning Calm",
    description: "Peaceful lake reflection at dawn",
    metadata: {
      camera: "Olympus OM-1",
      lens: "75mm f/1.8",
      aperture: "f/2.8",
      shutterSpeed: "1/100",
      iso: "100",
      location: "Lake Tahoe, CA",
      date: "May 12, 2023",
      story: "The stillness of the lake and the warm colors of the sunrise made for a breathtaking scene."
    }
  },
];

interface ImageGalleryProps {
  category: string;
}

export default function ImageGallery({ category }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredPhotos = category === "All"
    ? photos
    : photos.filter(photo => photo.category === category);

  return (
    <>
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredPhotos.map((photo) => (
          <motion.div
            key={photo.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ y: -5 }}
            className="relative group cursor-pointer neo-effect rounded-lg overflow-hidden"
            onClick={() => {
              setSelectedImage(photo);
              setShowDetails(false);
            }}
          >
            <div className="aspect-w-3 aspect-h-2">
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 glass-effect">
                  <h3 className="text-lg font-playfair text-primary">
                    {photo.title}
                  </h3>
                  <p className="text-sm text-gray-300 font-montserrat">
                    {photo.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {selectedImage && (
        <Lightbox
          photo={selectedImage}
          onClose={() => setSelectedImage(null)}
          photos={filteredPhotos}
          onNavigate={(photo) => setSelectedImage(photo)}
          extraContent={
            <>
              {selectedImage.metadata.beforeImage && (
                <div className="mt-8">
                  <BeforeAfterSlider
                    beforeImage={selectedImage.metadata.beforeImage}
                    afterImage={selectedImage.src}
                    title="Before & After"
                  />
                </div>
              )}
              <div className="mt-8">
                <PhotoDetails
                  metadata={selectedImage.metadata}
                  story={selectedImage.metadata.story}
                />
              </div>
            </>
          }
        />
      )}
    </>
  );
}