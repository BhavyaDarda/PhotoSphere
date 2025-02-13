import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Photo {
  id: number;
  src: string;
  title: string;
  description: string;
}

interface LightboxProps {
  photo: Photo;
  photos: Photo[];
  onClose: () => void;
  onNavigate: (photo: Photo) => void;
  extraContent?: React.ReactNode;
}

export default function Lightbox({
  photo,
  photos,
  onClose,
  onNavigate,
  extraContent
}: LightboxProps) {
  const currentIndex = photos.findIndex(p => p.id === photo.id);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        onNavigate(photos[currentIndex - 1]);
      }
      if (e.key === "ArrowRight" && currentIndex < photos.length - 1) {
        onNavigate(photos[currentIndex + 1]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, photos, onClose, onNavigate]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-y-auto"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          className="fixed top-4 right-4 text-white/80 hover:text-white z-50"
          onClick={onClose}
        >
          <X className="h-8 w-8" />
        </button>

        {/* Navigation Buttons */}
        {currentIndex > 0 && (
          <button
            className="fixed left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-50"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(photos[currentIndex - 1]);
            }}
          >
            <ChevronLeft className="h-12 w-12" />
          </button>
        )}

        {currentIndex < photos.length - 1 && (
          <button
            className="fixed right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-50"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(photos[currentIndex + 1]);
            }}
          >
            <ChevronRight className="h-12 w-12" />
          </button>
        )}

        {/* Content */}
        <div
          className="relative max-w-7xl mx-auto px-4 py-12"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Main Image */}
            <div className="relative">
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full max-h-[70vh] object-contain rounded-lg"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg"
              >
                <h2 className="text-2xl font-playfair text-primary">
                  {photo.title}
                </h2>
                <p className="text-gray-300 mt-2 font-montserrat">
                  {photo.description}
                </p>
              </motion.div>
            </div>

            {/* Extra Content */}
            {extraContent}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}