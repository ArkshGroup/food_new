export interface IFoodInfluencerProgram {
  id: string;
  userId: string;
  title: string;
  category: string;
  description: string;
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    userName: string | null;
    email: string;
  };
}
