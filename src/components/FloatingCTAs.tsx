import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

export function FloatingCTAs() {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-40 flex flex-col gap-4">
      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/9660563207097"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل معنا عبر واتساب" 
        className="relative group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-2xl cursor-pointer"
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
          <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
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

        {/* Tooltip  */}
        <motion.div
          initial={{ opacity: 0, y: 10, x: 10 }}
          whileHover={{ opacity: 1, y: 0, x: 0 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 sm:left-auto sm:right-full sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:mr-4 whitespace-nowrap bg-gray-900 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-green-400/50 shadow-lg pointer-events-none text-sm sm:text-base"
        >
          تواصل عبر واتساب
        </motion.div>
      </motion.a>

      {/* Phone Button */}
      <motion.a
        href="tel:+9660547341718"
        aria-label="اتصل بنا مباشرة" 
        className="relative group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl cursor-pointer"
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
          <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
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

        {/* Tooltip ً */}
        <motion.div
          initial={{ opacity: 0, y: 10, x: 10 }}
          whileHover={{ opacity: 1, y: 0, x: 0 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 sm:left-auto sm:right-full sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:mr-4 whitespace-nowrap bg-gray-900 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-cyan-400/50 shadow-lg pointer-events-none text-sm sm:text-base"
        >
          اتصل بنا الآن
        </motion.div>
      </motion.a>
    </div>
  );
}