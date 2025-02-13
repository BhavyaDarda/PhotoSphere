import { motion } from "framer-motion";
import GlowingButton from "./GlowingButton";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen">
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
          poster="https://images.unsplash.com/photo-1452587925148-ce544e77e70d"
        >
          <source
            src="https://player.vimeo.com/external/459863408.hd.mp4?s=fae5fb7d8b39df7ccd22fb1bf7133555beb98b5e&profile_id=174"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative pt-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-playfair text-5xl md:text-7xl mb-6"
          >
            Discover the World
            <br />
            <span className="text-primary">Through My Lens</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-montserrat text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Capturing moments that tell stories, creating art that moves hearts
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link href="/gallery">
              <GlowingButton>
                Explore Portfolio
              </GlowingButton>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
