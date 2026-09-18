export type UserRole = 'guest' | 'member' | 'manager' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  memberId?: string;
  phone?: string;
  plan?: 'Standard' | 'Pro' | 'VIP Elite';
  joinDate?: string;
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM AM/PM
  type: 'Gym Floor' | 'Class' | 'Pool & Sauna' | 'Personal Training';
  durationMinutes: number;
}

export interface WorkoutExercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weightLbs: number;
  pr?: boolean;
}

export interface WorkoutSession {
  id: string;
  memberId: string;
  date: string;
  title: string;
  category: 'Chest & Triceps' | 'Back & Biceps' | 'Legs & Core' | 'Shoulders & Arms' | 'Full Body' | 'Cardio & HIIT';
  durationMinutes: number;
  caloriesBurned: number;
  exercises: WorkoutExercise[];
  notes?: string;
}

export interface PersonalRecord {
  exercise: string;
  weightLbs: number;
  date: string;
  previousWeightLbs?: number;
}

export interface GymClass {
  id: string;
  name: string;
  instructor: string;
  instructorAvatar: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string;
  durationMinutes: number;
  room: string;
  category: 'HIIT' | 'CrossFit' | 'Spin' | 'Yoga' | 'Boxing' | 'Pilates';
  capacity: number;
  enrolledMemberIds: string[];
  level: 'All Levels' | 'Intermediate' | 'Advanced';
}

export interface MemberProfile {
  id: string;
  memberCode: string;
  name: string;
  email: string;
  phone: string;
  tier: 'Standard' | 'Pro' | 'VIP Elite';
  status: 'Active' | 'Pending Renewal' | 'Frozen' | 'Expired';
  joinDate: string;
  expiryDate: string;
  emergencyContact: string;
  totalCheckIns: number;
  streakDays: number;
  lastCheckIn?: string;
  notes?: string;
  avatarBg: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'Head Coach' | 'Personal Trainer' | 'Group Instructor' | 'Floor Supervisor' | 'Front Desk';
  email: string;
  phone: string;
  specialty: string;
  shifts: string;
  activeClients: number;
  rating: number;
  status: 'On Duty' | 'Off Duty' | 'On Leave';
  avatarBg: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: 'Cardio' | 'Free Weights' | 'Cable Machines' | 'Racks & Benches' | 'Recovery';
  location: string;
  status: 'Operational' | 'Requires Service' | 'Out of Order';
  lastServiceDate: string;
  nextInspection: string;
  reportedIssue?: string;
}

export interface NewsPost {
  id: string;
  title: string;
  category: 'Facility' | 'Community' | 'Challenge' | 'Milestone';
  snippet: string;
  content: string;
  date: string;
  imageTag: string;
  likes: number;
  isLiked?: boolean;
}

export interface PromoOffer {
  id: string;
  code: string;
  title: string;
  discount: string;
  description: string;
  expiresIn: string;
  badge: string;
  tagColor: string;
}

export interface GymEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: 'Workshop' | 'Competition' | 'Social' | 'Masterclass';
  attendeesCount: number;
  userRsvp?: boolean;
  maxSpots?: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Supplements' | 'Beverages' | 'Merchandise' | 'Accessories';
  stock: number;
  minAlert: number;
  price: number;
  unit: string;
}

export interface TransactionRecord {
  id: string;
  date: string;
  memberId: string;
  memberName: string;
  item: string;
  amount: number;
  category: 'Membership' | 'Personal Training' | 'Pro-Shop' | 'Day Pass';
  status: 'Completed' | 'Pending' | 'Refunded';
}
