import {
  MemberProfile,
  GymClass,
  StaffMember,
  EquipmentItem,
  NewsPost,
  PromoOffer,
  GymEvent,
  InventoryItem,
  TransactionRecord,
  AttendanceRecord,
  WorkoutSession,
  PersonalRecord
} from '../types';

export const INITIAL_MEMBERS: MemberProfile[] = [
  {
    id: 'mem-1',
    memberCode: 'ASP-7492',
    name: 'Alex Rivera',
    email: 'alex.rivera@gym.com',
    phone: '+1 (555) 234-8910',
    tier: 'VIP Elite',
    status: 'Active',
    joinDate: '2025-01-15',
    expiryDate: '2027-01-15',
    emergencyContact: 'Elena Rivera - (555) 345-6789',
    totalCheckIns: 142,
    streakDays: 4,
    lastCheckIn: 'Today at 7:15 AM',
    notes: 'Pre-season powerlifting prep; requires locker #14',
    avatarBg: 'bg-emerald-600'
  },
  {
    id: 'mem-2',
    memberCode: 'ASP-8921',
    name: 'Jonathan Davis',
    email: 'j.davis@example.com',
    phone: '+1 (555) 902-3341',
    tier: 'Pro',
    status: 'Active',
    joinDate: '2025-04-10',
    expiryDate: '2026-10-10',
    emergencyContact: 'Sarah Davis - (555) 902-3349',
    totalCheckIns: 88,
    streakDays: 2,
    lastCheckIn: 'Yesterday at 5:45 PM',
    notes: 'Cardio focus, rehab recovery left knee',
    avatarBg: 'bg-blue-600'
  },
  {
    id: 'mem-3',
    memberCode: 'ASP-4402',
    name: 'Samantha Miller',
    email: 'smiller@fitnesslife.io',
    phone: '+1 (555) 782-9011',
    tier: 'VIP Elite',
    status: 'Active',
    joinDate: '2024-11-20',
    expiryDate: '2026-11-20',
    emergencyContact: 'David Miller - (555) 782-9020',
    totalCheckIns: 210,
    streakDays: 6,
    lastCheckIn: 'Today at 6:30 AM',
    notes: 'CrossFit enthusiast, weekend morning sessions',
    avatarBg: 'bg-purple-600'
  },
  {
    id: 'mem-4',
    memberCode: 'ASP-1120',
    name: 'Robert Kennedy',
    email: 'rkennedy@outlook.com',
    phone: '+1 (555) 443-2219',
    tier: 'Standard',
    status: 'Pending Renewal',
    joinDate: '2025-03-01',
    expiryDate: '2026-03-01',
    emergencyContact: 'Maria Kennedy - (555) 443-9999',
    totalCheckIns: 45,
    streakDays: 0,
    lastCheckIn: '5 days ago',
    notes: 'Prefers evening off-peak hours',
    avatarBg: 'bg-amber-600'
  },
  {
    id: 'mem-5',
    memberCode: 'ASP-6531',
    name: 'Maya Lin',
    email: 'maya.lin@gmail.com',
    phone: '+1 (555) 873-1200',
    tier: 'Pro',
    status: 'Active',
    joinDate: '2025-06-12',
    expiryDate: '2026-12-12',
    emergencyContact: 'Chen Lin - (555) 873-9911',
    totalCheckIns: 79,
    streakDays: 3,
    lastCheckIn: 'Today at 8:00 AM',
    notes: 'Yoga and spin classes weekly regular',
    avatarBg: 'bg-rose-600'
  },
  {
    id: 'mem-6',
    memberCode: 'ASP-3091',
    name: 'Marcus Sterling',
    email: 'm.sterling@agency.com',
    phone: '+1 (555) 612-4450',
    tier: 'Standard',
    status: 'Frozen',
    joinDate: '2025-02-14',
    expiryDate: '2026-08-14',
    emergencyContact: 'Clara Sterling - (555) 612-0000',
    totalCheckIns: 32,
    streakDays: 0,
    lastCheckIn: '3 weeks ago',
    notes: 'Medical travel freeze requested for 30 days',
    avatarBg: 'bg-cyan-600'
  }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'st-1',
    name: 'Marcus Vance',
    role: 'Floor Supervisor',
    email: 'marcus.v@aspiregym.com',
    phone: '+1 (555) 123-0001',
    specialty: 'Operations, Safety & Olympic Lifting',
    shifts: 'Morning (05:30 AM - 01:30 PM)',
    activeClients: 14,
    rating: 4.9,
    status: 'On Duty',
    avatarBg: 'bg-red-700'
  },
  {
    id: 'st-2',
    name: 'Sarah Chen',
    role: 'Head Coach',
    email: 'sarah.c@aspiregym.com',
    phone: '+1 (555) 123-0002',
    specialty: 'Strength Conditioning & Biomechanics',
    shifts: 'Mid-Day (10:00 AM - 06:00 PM)',
    activeClients: 22,
    rating: 5.0,
    status: 'On Duty',
    avatarBg: 'bg-indigo-700'
  },
  {
    id: 'st-3',
    name: 'Tariq Al-Mansoor',
    role: 'Personal Trainer',
    email: 'tariq.m@aspiregym.com',
    phone: '+1 (555) 123-0003',
    specialty: 'Hypertrophy & Functional Bodybuilding',
    shifts: 'Evening (01:00 PM - 09:00 PM)',
    activeClients: 18,
    rating: 4.8,
    status: 'On Duty',
    avatarBg: 'bg-teal-700'
  },
  {
    id: 'st-4',
    name: 'Chloe Bennett',
    role: 'Group Instructor',
    email: 'chloe.b@aspiregym.com',
    phone: '+1 (555) 123-0004',
    specialty: 'High Intensity Spin & Mobility Yoga',
    shifts: 'Morning & Weekends',
    activeClients: 35,
    rating: 4.9,
    status: 'Off Duty',
    avatarBg: 'bg-fuchsia-700'
  }
];

export const INITIAL_CLASSES: GymClass[] = [
  {
    id: 'cls-1',
    name: 'Inferno HIIT Circuit',
    instructor: 'Chloe Bennett',
    instructorAvatar: 'CB',
    day: 'Monday',
    time: '07:00 AM - 08:00 AM',
    durationMinutes: 60,
    room: 'Studio Alpha',
    category: 'HIIT',
    capacity: 20,
    enrolledMemberIds: ['mem-1', 'mem-3', 'mem-5'],
    level: 'All Levels'
  },
  {
    id: 'cls-2',
    name: 'Power Iron Barbell Lab',
    instructor: 'Sarah Chen',
    instructorAvatar: 'SC',
    day: 'Monday',
    time: '05:30 PM - 06:45 PM',
    durationMinutes: 75,
    room: 'Olympic Turf Zone',
    category: 'CrossFit',
    capacity: 14,
    enrolledMemberIds: ['mem-1', 'mem-2'],
    level: 'Intermediate'
  },
  {
    id: 'cls-3',
    name: 'Rhythm Velocity Spin',
    instructor: 'Chloe Bennett',
    instructorAvatar: 'CB',
    day: 'Tuesday',
    time: '06:30 AM - 07:15 AM',
    durationMinutes: 45,
    room: 'Cycle Vault',
    category: 'Spin',
    capacity: 25,
    enrolledMemberIds: ['mem-3', 'mem-5'],
    level: 'All Levels'
  },
  {
    id: 'cls-4',
    name: 'Golden Hour Yoga Flow',
    instructor: 'Chloe Bennett',
    instructorAvatar: 'CB',
    day: 'Wednesday',
    time: '06:00 PM - 07:00 PM',
    durationMinutes: 60,
    room: 'Zen Studio 2',
    category: 'Yoga',
    capacity: 18,
    enrolledMemberIds: ['mem-5'],
    level: 'All Levels'
  },
  {
    id: 'cls-5',
    name: 'Heavyweight Boxing & Conditioning',
    instructor: 'Marcus Vance',
    instructorAvatar: 'MV',
    day: 'Thursday',
    time: '07:00 PM - 08:15 PM',
    durationMinutes: 75,
    room: 'Combat Ring B',
    category: 'Boxing',
    capacity: 16,
    enrolledMemberIds: ['mem-1', 'mem-4'],
    level: 'Advanced'
  },
  {
    id: 'cls-6',
    name: 'Core & Kinetic Pilates',
    instructor: 'Chloe Bennett',
    instructorAvatar: 'CB',
    day: 'Friday',
    time: '08:00 AM - 09:00 AM',
    durationMinutes: 60,
    room: 'Studio Alpha',
    category: 'Pilates',
    capacity: 16,
    enrolledMemberIds: ['mem-3'],
    level: 'All Levels'
  }
];

export const INITIAL_NEWS: NewsPost[] = [
  {
    id: 'news-1',
    title: 'Brand New Eleiko Olympic Lifting Platforms Installed!',
    category: 'Facility',
    snippet: 'We just upgraded our main weight room with four competition-grade Eleiko steel plates and calibrated bars.',
    content: 'Members asked, and we delivered! Our flagship lifting wing now features 4 state-of-the-art Eleiko platforms with vibration-dampening high-density rubber tiling. Perfect for Olympic cleans, snatches, and heavy deadlifts.',
    date: '2 hours ago',
    imageTag: 'platforms',
    likes: 48,
    isLiked: false
  },
  {
    id: 'news-2',
    title: 'Autumn 30-Day Hypertrophy & Fat Loss Challenge',
    category: 'Challenge',
    snippet: 'Sign up before Oct 1st. Over $1,500 in prizes, free InBody scans, and custom macro guides for all participants.',
    content: 'Test your grit across 4 weeks of programmed strength conditioning. Entry includes bi-weekly body composition scans, customized nutrition targets from Coach Sarah, and an exclusive finisher tee.',
    date: 'Yesterday',
    imageTag: 'challenge',
    likes: 92,
    isLiked: true
  },
  {
    id: 'news-3',
    title: 'Fuel Station: Cold-Pressed Juices & Whey Smoothies',
    category: 'Community',
    snippet: 'Recharge post-workout at our upgraded front desk juice bar with organic peanut butter, blueberries, and ISO-100 protein.',
    content: 'Starting this week, check in at the reception bar for our new artisanal post-workout recovery menu. VIP Elite members receive 20% off all smoothies during peak morning hours.',
    date: '3 days ago',
    imageTag: 'smoothies',
    likes: 64,
    isLiked: false
  }
];

export const INITIAL_PROMOS: PromoOffer[] = [
  {
    id: 'pro-1',
    code: 'SHRED2026',
    title: '30% Off Personal Training Packs',
    discount: '30% OFF',
    description: 'Book a 10-session package with any Tier 1 trainer before the end of the month.',
    expiresIn: '7 Days Left',
    badge: 'Popular',
    tagColor: 'border-red-500/30 bg-red-500/10 text-red-400'
  },
  {
    id: 'pro-2',
    code: 'BRINGAFRIEND',
    title: 'Free Weekend Guest Passes',
    discount: 'FREE PASS',
    description: 'Every VIP and Pro member can bring a training partner free of charge every Saturday and Sunday.',
    expiresIn: 'Ongoing',
    badge: 'Member Perk',
    tagColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
  },
  {
    id: 'pro-3',
    code: 'ELITEVIP',
    title: 'Annual Upgrade Bonus',
    discount: '+$100 CREDIT',
    description: 'Upgrade your monthly plan to the Annual VIP Membership and get $100 Pro-Shop store credit.',
    expiresIn: 'Ends in 12 Days',
    badge: 'Limited',
    tagColor: 'border-amber-500/30 bg-amber-500/10 text-amber-400'
  }
];

export const INITIAL_EVENTS: GymEvent[] = [
  {
    id: 'ev-1',
    title: 'Aspire Annual Deadlift & Bench Press Showdown',
    date: 'Saturday, Oct 11, 2026',
    time: '10:00 AM - 02:00 PM',
    location: 'Main Lifting Area',
    description: 'Friendly internal gym meet with 3 sanctioned weight classes, DJ set, and prizes from Rogue and Gymshark.',
    category: 'Competition',
    attendeesCount: 38,
    userRsvp: true,
    maxSpots: 50
  },
  {
    id: 'ev-2',
    title: 'Rooftop Sunset Sound Bath & Recovery Yoga',
    date: 'Wednesday, Oct 15, 2026',
    time: '06:30 PM - 08:00 PM',
    location: 'Skyline Terrace (Level 4)',
    description: 'Decompress with restorative stretching, Tibetan singing bowls, and herbal recovery teas under the stars.',
    category: 'Workshop',
    attendeesCount: 22,
    userRsvp: false,
    maxSpots: 25
  },
  {
    id: 'ev-3',
    title: 'Nutritional Periodization with Dr. Andrea Scott',
    date: 'Thursday, Oct 23, 2026',
    time: '07:00 PM - 08:30 PM',
    location: 'Seminar Lounge',
    description: 'Learn optimal carb cycling, hydration protocols, and supplementation for athletic longevity.',
    category: 'Masterclass',
    attendeesCount: 45,
    userRsvp: false,
    maxSpots: 60
  }
];

export const INITIAL_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'eq-1',
    name: 'Woodway Curve Treadmill #03',
    category: 'Cardio',
    location: 'Cardio Deck (North)',
    status: 'Operational',
    lastServiceDate: '2026-08-14',
    nextInspection: '2026-10-14'
  },
  {
    id: 'eq-2',
    name: 'Rogue Monster Power Rack #02',
    category: 'Racks & Benches',
    location: 'Strength Floor (Center)',
    status: 'Operational',
    lastServiceDate: '2026-09-01',
    nextInspection: '2026-12-01'
  },
  {
    id: 'eq-3',
    name: 'LifeFitness Dual Cable Cross',
    category: 'Cable Machines',
    location: 'Upper Body Annex',
    status: 'Requires Service',
    lastServiceDate: '2026-06-20',
    nextInspection: '2026-09-20',
    reportedIssue: 'Left cable sleeve fraying slightly; replacement pulley ordered.'
  },
  {
    id: 'eq-4',
    name: 'Concept2 RowErg #05',
    category: 'Cardio',
    location: 'Cardio Deck (South)',
    status: 'Operational',
    lastServiceDate: '2026-08-28',
    nextInspection: '2026-11-28'
  },
  {
    id: 'eq-5',
    name: 'StairMaster 8Gx Gauntlet',
    category: 'Cardio',
    location: 'Cardio Deck (East)',
    status: 'Out of Order',
    lastServiceDate: '2026-07-11',
    nextInspection: 'Today',
    reportedIssue: 'Drive belt slipped during peak hour. Technician scheduled for tomorrow 10am.'
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'inv-1', name: 'Optimum Nutrition Gold Whey (2 lb)', category: 'Supplements', stock: 14, minAlert: 8, price: 42.0, unit: 'Tubs' },
  { id: 'inv-2', name: 'C4 Ultimate Pre-Workout Fruit Punch', category: 'Supplements', stock: 6, minAlert: 10, price: 38.0, unit: 'Cans' },
  { id: 'inv-3', name: 'Monster Energy Ultra Zero 16oz', category: 'Beverages', stock: 48, minAlert: 24, price: 3.5, unit: 'Cans' },
  { id: 'inv-4', name: 'Aspire Microfiber Gym Towel', category: 'Merchandise', stock: 32, minAlert: 15, price: 14.0, unit: 'Items' },
  { id: 'inv-5', name: 'Harbinger Padded Weightlifting Straps', category: 'Accessories', stock: 18, minAlert: 8, price: 19.5, unit: 'Pairs' }
];

export const INITIAL_TRANSACTIONS: TransactionRecord[] = [
  { id: 'tx-101', date: 'Today at 08:30 AM', memberId: 'mem-1', memberName: 'Alex Rivera', item: 'VIP Elite Monthly Dues', amount: 149.0, category: 'Membership', status: 'Completed' },
  { id: 'tx-102', date: 'Today at 07:45 AM', memberId: 'mem-3', memberName: 'Samantha Miller', item: 'Cold Pressed Smoothie + Protein', amount: 12.5, category: 'Pro-Shop', status: 'Completed' },
  { id: 'tx-103', date: 'Yesterday at 04:15 PM', memberId: 'mem-2', memberName: 'Jonathan Davis', item: '5x PT Pack with Coach Tariq', amount: 350.0, category: 'Personal Training', status: 'Completed' },
  { id: 'tx-104', date: 'Yesterday at 01:10 PM', memberId: 'mem-5', memberName: 'Maya Lin', item: 'Pro Monthly Dues', amount: 99.0, category: 'Membership', status: 'Completed' },
  { id: 'tx-105', date: '2 days ago', memberId: 'mem-4', memberName: 'Robert Kennedy', item: 'Standard Access Renewal', amount: 69.0, category: 'Membership', status: 'Pending' }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'att-1', memberId: 'mem-1', memberName: 'Alex Rivera', date: '2026-09-18', time: '07:15 AM', type: 'Gym Floor', durationMinutes: 75 },
  { id: 'att-2', memberId: 'mem-3', memberName: 'Samantha Miller', date: '2026-09-18', time: '06:30 AM', type: 'Class', durationMinutes: 60 },
  { id: 'att-3', memberId: 'mem-5', memberName: 'Maya Lin', date: '2026-09-18', time: '08:00 AM', type: 'Class', durationMinutes: 45 },
  { id: 'att-4', memberId: 'mem-1', memberName: 'Alex Rivera', date: '2026-09-17', time: '07:30 AM', type: 'Gym Floor', durationMinutes: 80 },
  { id: 'att-5', memberId: 'mem-2', memberName: 'Jonathan Davis', date: '2026-09-17', time: '05:45 PM', type: 'Personal Training', durationMinutes: 60 },
  { id: 'att-6', memberId: 'mem-1', memberName: 'Alex Rivera', date: '2026-09-16', time: '07:00 AM', type: 'Gym Floor', durationMinutes: 90 },
  { id: 'att-7', memberId: 'mem-1', memberName: 'Alex Rivera', date: '2026-09-15', time: '08:10 AM', type: 'Pool & Sauna', durationMinutes: 45 }
];

export const INITIAL_WORKOUTS: WorkoutSession[] = [
  {
    id: 'wo-1',
    memberId: 'mem-1',
    date: '2026-09-18',
    title: 'Heavy Upper Body Push Day',
    category: 'Chest & Triceps',
    durationMinutes: 75,
    caloriesBurned: 520,
    exercises: [
      { id: 'ex-1', name: 'Barbell Flat Bench Press', sets: 4, reps: 6, weightLbs: 225, pr: true },
      { id: 'ex-2', name: 'Incline Dumbbell Press', sets: 3, reps: 10, weightLbs: 75 },
      { id: 'ex-3', name: 'Dips (Weighted)', sets: 3, reps: 8, weightLbs: 45 },
      { id: 'ex-4', name: 'Cable Tricep Pushdowns', sets: 4, reps: 12, weightLbs: 65 }
    ],
    notes: 'Hit new 6-rep PR on bench press! Felt smooth through the sticking point.'
  },
  {
    id: 'wo-2',
    memberId: 'mem-1',
    date: '2026-09-16',
    title: 'Squat & Posterior Chain Power',
    category: 'Legs & Core',
    durationMinutes: 80,
    caloriesBurned: 640,
    exercises: [
      { id: 'ex-5', name: 'Barbell Back Squat', sets: 5, reps: 5, weightLbs: 315 },
      { id: 'ex-6', name: 'Romanian Deadlift', sets: 4, reps: 8, weightLbs: 245 },
      { id: 'ex-7', name: 'Walking Dumbbell Lunges', sets: 3, reps: 12, weightLbs: 50 },
      { id: 'ex-8', name: 'Hanging Leg Raises', sets: 4, reps: 15, weightLbs: 0 }
    ],
    notes: 'Solid depth on squats, good hamstring tension on RDLs.'
  },
  {
    id: 'wo-3',
    memberId: 'mem-1',
    date: '2026-09-14',
    title: 'Deadlift & Back Volume',
    category: 'Back & Biceps',
    durationMinutes: 70,
    caloriesBurned: 580,
    exercises: [
      { id: 'ex-9', name: 'Conventional Deadlift', sets: 4, reps: 3, weightLbs: 405 },
      { id: 'ex-10', name: 'Neutral Grip Pull-ups', sets: 4, reps: 8, weightLbs: 25 },
      { id: 'ex-11', name: 'Chest Supported Row', sets: 3, reps: 10, weightLbs: 160 },
      { id: 'ex-12', name: 'Incline Bicep Curls', sets: 3, reps: 12, weightLbs: 35 }
    ]
  }
];

export const INITIAL_PRS: PersonalRecord[] = [
  { exercise: 'Barbell Flat Bench', weightLbs: 225, date: 'Sep 18, 2026', previousWeightLbs: 215 },
  { exercise: 'Barbell Back Squat', weightLbs: 315, date: 'Aug 24, 2026', previousWeightLbs: 295 },
  { exercise: 'Conventional Deadlift', weightLbs: 405, date: 'Sep 02, 2026', previousWeightLbs: 385 },
  { exercise: 'Overhead Barbell Press', weightLbs: 145, date: 'Aug 10, 2026', previousWeightLbs: 135 }
];
