'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Typewriter from './Typewriter'

interface AIAnalysisProps {
  analysis: string
  isLoading: boolean
  onAnalyze: () => void
}

// Custom, sleek SVG Icon for the AI
const AI_Icon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fillOpacity="0.4"/>
        <path d="M12 4c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm0 4.5c-1.86 0-3.49-.92-4.4-2.33C8.5 15.35 10.15 15 12 15s3.5.35 4.4 1.17c-.91 1.41-2.54 2.33-4.4 2.33z"/>
    </svg>
);

// Custom, sleek SVG Icon for the "magic" sparkle
const SparkleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l2.36 6.95h7.28l-5.89 4.29 2.24 6.95L12 15.86l-5.99 4.33 2.24-6.95-5.89-4.29h7.28L12 2z"/>
    </svg>
);


export default function AIAnalysis({ analysis, isLoading, onAnalyze }: AIAnalysisProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      className="bg-spotify-gray/80 backdrop-blur-xl border border-spotify-gray-border rounded-2xl p-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-6 text-spotify-text-gray"
        >
          <motion.div
            animate={{ rotate: isLoading ? 360 : 0 }}
            transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" }}
          >
            <AI_Icon />
          </motion.div>
          <h3 className="text-2xl font-bold text-spotify-white">
            AI Music Analysis
          </h3>
        </motion.div>
        <AnimatePresence mode="wait">
          {!analysis && !isLoading && (
            <motion.div
              key="initial"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              <p className="text-spotify-text-gray text-lg leading-relaxed">
                Go beyond the algorithm. Uncover the unique narrative of your sound.
              </p>
              <motion.button
                onClick={onAnalyze}
                whileHover={{ scale: 1.03, boxShadow: "0 8px 15px rgba(29, 185, 84, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="self-start relative overflow-hidden
                           bg-spotify-green/20 text-spotify-green backdrop-blur-md border border-spotify-green/40
                           font-medium px-6 py-3 rounded-full text-base
                           transition-all duration-300
                           shadow-md hover:shadow-spotify-green/20 flex items-center gap-3 group"
              >
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, -15, 0, 15, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <SparkleIcon />
                  </motion.div>
                  {/* --- THIS IS THE RESPONSIVE TEXT --- */}
                  <span className="hidden sm:inline">Analyze My Music Taste</span>
                  <span className="sm:hidden">Analyze My Taste</span>
                </span>
              </motion.button>
            </motion.div>
          )}
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="py-8"
            >
              <div className="flex flex-col items-center gap-6">
                <motion.div className="flex items-center gap-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scaleY: [1, 2, 1],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeInOut"
                      }}
                      className="w-1 h-8 bg-spotify-green rounded-full"
                    />
                  ))}
                </motion.div>
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-spotify-text-gray text-center"
                >
                  Composing your analysis...
                </motion.p>
              </div>
            </motion.div>
          )}
          {analysis && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <Typewriter
                text={analysis}
                speed={25}
                className="text-spotify-text-gray text-lg leading-relaxed whitespace-pre-wrap"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}