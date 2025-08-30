'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { SpotifyArtist, SpotifyTrack } from '@/types/spotify'

// Note: No longer need useState

interface TopItemsProps {
  title: string
  items: SpotifyArtist[] | SpotifyTrack[]
  type: 'artists' | 'tracks'
}

const ArtistIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const TrackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
  </svg>
);

export default function TopItems({ title, items, type }: TopItemsProps) {
  const handleItemClick = (item: SpotifyArtist | SpotifyTrack) => {
    window.open(item.external_urls.spotify, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      className="bg-spotify-gray backdrop-blur-sm border border-spotify-gray-border rounded-2xl p-6 flex flex-col"
    >
      <h3 className="text-xl font-semibold text-spotify-white mb-4 flex items-center gap-3 text-spotify-text-gray flex-shrink-0">
        {type === 'artists' ? <ArtistIcon /> : <TrackIcon />}
        <span className="text-spotify-white">{title}</span>
      </h3>
      
      {/* Simplified list container with no scrolling */}
      <div className="space-y-1">
        {(items || []).map((item, index) => {
          const isArtist = type === 'artists';
          const artist = isArtist ? item as SpotifyArtist : null;
          const track = !isArtist ? item as SpotifyTrack : null;
          
          let imageUrl: string | undefined;
          if (isArtist) {
              imageUrl = artist.images?.[0]?.url;
          } else if (track) {
              imageUrl = track.album?.images?.[0]?.url;
          }

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group flex items-center gap-3 p-3 rounded-lg hover:bg-spotify-gray-light cursor-pointer transition-all duration-200"
              onClick={() => handleItemClick(item)}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-spotify-gray-light">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                   <div className={`w-12 h-12 bg-spotify-gray-light flex items-center justify-center ${type === 'artists' ? 'rounded-full' : 'rounded-md'}`}>
                    {type === 'artists' ? <ArtistIcon /> : <TrackIcon />}
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-spotify-white text-sm font-medium truncate group-hover:text-spotify-green transition-colors duration-200">
                  {item.name}
                </div>
                {track && (
                  <div className="text-spotify-text-gray text-xs truncate mt-0.5">
                    {track.artists.map(a => a.name).join(', ')}
                  </div>
                )}
                {artist && artist.genres && artist.genres.length > 0 && (
                  <div className="text-spotify-text-gray text-xs truncate mt-0.5">
                    {artist.genres.slice(0, 2).join(', ')}
                  </div>
                )}
              </div>
              
              <div className="flex-shrink-0 text-xs text-spotify-text-gray font-mono opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                #{(index + 1).toString().padStart(2, '0')}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

