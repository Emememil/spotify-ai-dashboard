'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { SpotifyUser } from '@/types/spotify'
import { signOut } from 'next-auth/react'

interface UserProfileProps {
  user: SpotifyUser
}

export default function UserProfile({ user }: UserProfileProps) {
  const profileImage = user.images?.[1]?.url || user.images?.[0]?.url || '/default-avatar.png'
    
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-spotify-gray backdrop-blur-sm border border-spotify-gray-border rounded-2xl p-6 h-full flex flex-col items-center text-center"
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative mb-4"
        >
          <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-spotify-green/30">
            <Image
              src={profileImage}
              alt={user.display_name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
        <h2 className="text-2xl font-bold text-spotify-white mb-2">
          {user.display_name}
        </h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-center gap-2 text-spotify-text-gray">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/></svg>
            <span>{user.followers?.total?.toLocaleString() || 0} followers</span>
          </div>
          {user.country && (
            <div className="flex items-center justify-center gap-2 text-spotify-text-gray">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.058.058-.142-.058-.468-.363a4.908 4.908 0 0 0-.962-.872C3.12 5.923 2.32 4.933 2.04 4.326Z"/></svg>
              <span>{user.country}</span>
            </div>
          )}
        </div>
        <motion.div
           whileHover={{ scale: 1.02 }}
           className="mt-4 px-4 py-2 bg-spotify-green/10 border border-spotify-green/30 rounded-full"
        >
          <span className="text-spotify-green text-sm font-medium">Premium User</span>
        </motion.div>
      </div>
      <motion.button
         onClick={() => signOut({ callbackUrl: '/' })}
         whileHover={{ scale: 1.05, color: '#FFFFFF' }}
         whileTap={{ scale: 0.95 }}
         className="mt-6 text-sm text-spotify-text-muted hover:text-spotify-white transition-colors"
      >
        Sign Out
      </motion.button>
    </motion.div>
  )
}