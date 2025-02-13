import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen pt-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Profile Image */}
          <div className="relative">
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              src="https://images.unsplash.com/photo-1554151228-14d9def656e4"
              alt="Photographer Portrait"
              className="w-full rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-playfair text-4xl md:text-5xl"
            >
              About Me
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-300"
            >
              With over a decade of experience in photography, I've developed a 
              passion for capturing the extraordinary in ordinary moments. My journey
              began with a simple point-and-shoot camera and has evolved into a 
              lifelong pursuit of visual storytelling.
            </motion.p>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-4 mt-8"
            >
              <div className="flex gap-4">
                <div className="w-24 font-playfair text-primary">2012</div>
                <div className="flex-1">Started professional photography</div>
              </div>
              <div className="flex gap-4">
                <div className="w-24 font-playfair text-primary">2015</div>
                <div className="flex-1">First international exhibition</div>
              </div>
              <div className="flex gap-4">
                <div className="w-24 font-playfair text-primary">2018</div>
                <div className="flex-1">Published photography book</div>
              </div>
              <div className="flex gap-4">
                <div className="w-24 font-playfair text-primary">2023</div>
                <div className="flex-1">National Geographic feature</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
