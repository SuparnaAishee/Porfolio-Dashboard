export interface IProject {
  id?: string; // Matches the backend's TProject
  title: string;
  description: string;
  subDescription?: string; // Optional since TProject doesn't explicitly require it
  techStack: string[]; // Array for technologies
  category: string; // Matches the category definition
  demoUrl?: string; // Optional
  repoUrl?: string[]; // Array of repository URLs, optional
  imageUrls: string[]; // Array for multiple image URLs
  createdAt?: Date; // Optional for timestamps
  updatedAt?: Date; // Optional for timestamps
}
