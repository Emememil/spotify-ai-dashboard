'use client';
import { redirect } from 'next/navigation'
import spotifyApi from "@/lib/spotify";
import UserProfile from "@/components/UserProfile";
import TopItems from "@/components/TopItems";
import AIAnalysis from "@/components/AIAnalysis";
import { SpotifyArtist, SpotifyTrack, SpotifyUser } from "@/types/spotify";
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
    
  const [userProfile, setUserProfile] = useState<SpotifyUser | null>(null);
  const [topArtists, setTopArtists] = useState<SpotifyArtist[]>([]);
  const [topTracks, setTopTracks] = useState<SpotifyTrack[]>([]);
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/');
    }
    if (status === 'authenticated' && session?.user?.accessToken) {
      const fetchData = async () => {
        try {
          spotifyApi.setAccessToken(session.user.accessToken!);
          const [userProfileRes, topArtistsRes, topTracksRes] = await Promise.all([
            spotifyApi.getMe(),
            spotifyApi.getMyTopArtists({ time_range: 'medium_term', limit: 5 }),
            spotifyApi.getMyTopTracks({ time_range: 'medium_term', limit: 5 }),
          ]);
                    
          setUserProfile(userProfileRes.body as SpotifyUser);
          setTopArtists(topArtistsRes.body?.items || []);
          setTopTracks(topTracksRes.body?.items || []);
        } catch (error) { 
           console.error('Error fetching data:', error);
          signOut();
        }
      };
      fetchData();
    }
  }, [session, status]);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setAnalysis('');
    const artistNames = topArtists.map(artist => artist.name);
        
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topArtists: artistNames }),
      });
            
      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error('Failed to get analysis:', error);
      setAnalysis('Sorry, we couldn\'t generate your analysis right now. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || !userProfile) {
    return (
      <div className="min-h-screen bg-spotify-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-spotify-green"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spotify-gradient p-4 md:p-6 text-spotify-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-spotify-white mb-2">
            Your Music, <span className="text-spotify-green">Visualized</span>
          </h1>
          <p className="text-spotify-text-gray text-base md:text-lg">
            Go beyond the algorithm. Uncover the unique narrative of your sound.
          </p>
        </div>

        {/* --- REFACTORED RESPONSIVE GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* User Profile: Full width on mobile, full width on tablet, 4 cols on desktop */}
          <div className="md:col-span-2 lg:col-span-4">
            <UserProfile user={userProfile} />
          </div>

          {/* Top Artists: Full width on mobile, half width on tablet, 4 cols on desktop */}
          <div className="md:col-span-1 lg:col-span-4">
            <TopItems title="Top Artists" items={topArtists} type="artists" />
          </div>

          {/* Top Tracks: Full width on mobile, half width on tablet, 4 cols on desktop */}
          <div className="md:col-span-1 lg:col-span-4">
            <TopItems title="Top Tracks" items={topTracks} type="tracks" />
          </div>

          {/* AI Analysis: Full width on mobile, full width on tablet, 12 cols on desktop */}
          <div className="md:col-span-2 lg:col-span-12">
            <AIAnalysis
              analysis={analysis}
              isLoading={isLoading}
              onAnalyze={handleAnalyze}
            />
          </div>
        </div>
      </div>
    </div>
  );
}