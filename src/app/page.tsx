'use client'
import { signIn, useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (session) {
      redirect('/dashboard')
    }
  }, [session])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-spotify-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-spotify-green"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-spotify-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold text-spotify-white mb-4">
            Your Music,
            <span className="text-spotify-green"> Visualized</span>
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-spotify-text-gray text-lg mb-12 leading-relaxed"
        >
          The definitive story of your sound. Powered by AI.
        </motion.p>
        <motion.button
          onClick={() => signIn('spotify', { callbackUrl: '/dashboard' })}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(29, 185, 84, 0.3)"
          }}
          whileTap={{ scale: 0.98 }}
          className="group relative overflow-hidden bg-spotify-green hover:bg-spotify-green-hover text-spotify-black font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 backdrop-blur-sm border border-spotify-green/20"
        >
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
          <span className="relative z-10 flex items-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.48.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Continue with Spotify
          </span>
        </motion.button>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 text-xs text-spotify-text-muted"
        >
          Secure authentication powered by Spotify OAuth
        </motion.div>
      </motion.div>
    </div>
  )
}