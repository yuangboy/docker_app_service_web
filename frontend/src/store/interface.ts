export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  isOauth?: boolean;
  profilePicture?: string;
  googleId?: string;
  phoneNumber?: string;
  isVerified?: boolean;
  role: string;
  agreeTerms?: boolean;
  isBlocked?: boolean;
  verificationCode?: string | null;
  verificationToken?: string | null;
  tokenExpiresAt?: Date | null;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
  verificationAttempts: number;
  comparePassword: (password: string) => Promise<boolean>;
  signAccessToken: () => string;
  signRefreshToken: () => string;
}

export interface IService {
  _id?: string;
  title: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  priceRange?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
  agreeTerms: boolean;
}

export interface IResponseRegister {
  success: boolean;
  data: IUser;
}

export interface IResponseApi<T> {
  success: boolean;
  message?: string;
  data: T | null;
}

export interface IProject {
  _id?: string;
  title: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  clientName?: string;
  completionDate?: Date; // Date d'achèvement du Projet
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBlogPost {
  _id?: string;
  userId: string;
  title: string;
  content?: string;
  excrept?: string;
  imageUrl?: string;
  author?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IQuoteRequest {
  _id?: string;
  userId: string;
  serviceId: string;
  name: string;
  email: string;
  phone?: string;
  type: "Individual" | "Entreprise";
  companyName?: string;
  description: string;
  budget?: string;
  status?: "accepted" | "cancel" | "pending" | "rejected";
}

export interface IContact {
  _id?: string;
  idUser?: string;
  name: string;
  email: string;
  subject: string;
  content: string;
  isRead?: boolean;
}

interface IParticipantsByType {
  hybrid: number;
  online: number;
  onsite: number;
}

export interface IFormation {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  totalPrice: string;
  currency?: string;
  duration?: string;
  startDate?: string;
  participantsCount: number;
  participantsByType: IParticipantsByType;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type ContractType = "CDI" | "CDD" | "Stage" | "Freelance";
export interface ICareerInfo {
  _id: string;
  title: string;
  content: string;
  year: string;
  competence: string[];
  contractType: ContractType;
  createdAt?: string;
  updatedAt?: string;
}

export type CareerStatus = "approved" | "rejected" | "pending" | "cancel";

export interface ICareer {
  _id: string;
  userId: string;
  careerInfoId: string;
  fullName: string;
  email: string;
  phone?: string;
  position?: string;
  experience?: string;
  coverLetter?: string;
  cvUrl?: string;
  status?: CareerStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface IVideo {
  _id?: string;
  title: string;
  url: string;
}

export interface IModule {
  _id: string;
  formationId: IFormation;
  title: string;
  videos: IVideo[];
  price: string;
  nbreTranche: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IInsriptionModule {
  _id?: string;
  userId: string;
  moduleId: string;
  type: "hybrid" | "online" | "onsite";
  phone: string;
  fullName: string;
  isFullyPaid?: boolean;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IEvent {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  price: number;
  currency?: string;
  eventDate?: string; // Date en string côté frontend
  location?: string;
  maxParticipants: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}


export interface IEventEnrollment {
  userId: string;
  eventId: string;
  type: "hybrid" | "online" | "onsite";
  fullName: string;
  email: string;
  phone: string;
  description?: string;
}