import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

export function FloatingCTAs() {
  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4">
      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/9660547341718"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-2xl cursor-pointer"
          animate={{
            boxShadow: [
              "0 0 20px rgba(34, 197, 94, 0.5)",
              "0 0 40px rgba(34, 197, 94, 0.8)",
              "0 0 20px rgba(34, 197, 94, 0.5)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </motion.div>

        {/* Pulsing Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-green-400"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white px-4 py-2 rounded-lg border border-green-400/50 shadow-lg pointer-events-none"
        >
          تواصل عبر واتساب
        </motion.div>
      </motion.a>

      {/* Phone Button */}
      <motion.a
        href="tel:+9660563207097"
        className="relative group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl cursor-pointer"
          animate={{
            boxShadow: [
              "0 0 20px rgba(0, 188, 212, 0.5)",
              "0 0 40px rgba(0, 188, 212, 0.8)",
              "0 0 20px rgba(0, 188, 212, 0.5)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Phone className="w-8 h-8 text-white" />
        </motion.div>

        {/* Pulsing Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyan-400"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 1,
          }}
        />

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white px-4 py-2 rounded-lg border border-cyan-400/50 shadow-lg pointer-events-none"
        >
          اتصل بنا الآن
        </motion.div>
      </motion.a>
    </div>
  );
}
