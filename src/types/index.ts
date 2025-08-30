export interface IArtist {
    id: string;
    name: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
    // Add any other artist properties you might need
  }