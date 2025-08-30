export interface SpotifyUser {
    id: string;
    display_name: string;
    email: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
    followers: {
      total: number;
    };
    country: string;
  }
  
  export interface SpotifyArtist {
    id:string;
    name: string;
    genres: string[];
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
    popularity: number;
    followers: {
      total: number;
    };
    external_urls: {
      spotify: string;
    };
  }
  
  export interface SpotifyTrack {
    id: string;
    name: string;
    artists: Array<{
      id: string;
      name: string;
      external_urls: {
        spotify: string;
      };
    }>;
    album: {
      id: string;
      name: string;
      images: Array<{
        url: string;
        height: number;
        width: number;
      }>;
    };
    duration_ms: number;
    popularity: number;
    external_urls: {
      spotify: string;
    };
  }