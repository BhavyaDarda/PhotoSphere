import { motion } from "framer-motion";
import { Camera, MapPin, Calendar } from "lucide-react";

interface PhotoMetadata {
  camera: string;
  lens: string;
  aperture: string;
  shutterSpeed: string;
  iso: string;
  location: string;
  date: string;
}

interface PhotoDetailsProps {
  metadata: PhotoMetadata;
  story: string;
}

export default function PhotoDetails({ metadata, story }: PhotoDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Camera Settings */}
      <div className="glass-effect rounded-lg p-6 space-y-4">
        <h3 className="font-playfair text-xl text-primary mb-4">Camera Settings</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Camera</p>
            <p className="font-montserrat">{metadata.camera}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Lens</p>
            <p className="font-montserrat">{metadata.lens}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Aperture</p>
            <p className="font-montserrat">{metadata.aperture}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Shutter Speed</p>
            <p className="font-montserrat">{metadata.shutterSpeed}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">ISO</p>
            <p className="font-montserrat">{metadata.iso}</p>
          </div>
        </div>
      </div>

      {/* Location and Date */}
      <div className="flex flex-wrap gap-4">
        <div className="glass-effect rounded-lg p-4 flex items-center gap-3">
          <MapPin className="text-primary h-5 w-5" />
          <span className="font-montserrat">{metadata.location}</span>
        </div>
        <div className="glass-effect rounded-lg p-4 flex items-center gap-3">
          <Calendar className="text-primary h-5 w-5" />
          <span className="font-montserrat">{metadata.date}</span>
        </div>
      </div>

      {/* Story */}
      <div className="glass-effect rounded-lg p-6">
        <h3 className="font-playfair text-xl text-primary mb-4">Behind the Shot</h3>
        <p className="font-montserrat leading-relaxed text-gray-300">{story}</p>
      </div>
    </motion.div>
  );
}
