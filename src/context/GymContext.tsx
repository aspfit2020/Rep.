import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
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
import {
  INITIAL_MEMBERS,
  INITIAL_STAFF,
  INITIAL_CLASSES,
  INITIAL_NEWS,
  INITIAL_PROMOS,
  INITIAL_EVENTS,
  INITIAL_EQUIPMENT,
  INITIAL_INVENTORY,
  INITIAL_TRANSACTIONS,
  INITIAL_ATTENDANCE,
  INITIAL_WORKOUTS,
  INITIAL_PRS
} from '../data/mockData';

interface GymContextType {
  currentUser: User | null;
  activeRole: UserRole;
  currentView: 'home' | 'login' | 'member' | 'manager' | 'admin';
  isMobileDeviceView: boolean;
  toggleMobileDeviceView: () => void;
  members: MemberProfile[];
  staff: StaffMember[];
  classes: GymClass[];
  news: NewsPost[];
  promos: PromoOffer[];
  events: GymEvent[];
  equipment: EquipmentItem[];
  inventory: InventoryItem[];
  transactions: TransactionRecord[];
  attendance: AttendanceRecord[];
  workouts: WorkoutSession[];
  prs: PersonalRecord[];
  login: (role: UserRole, identifier?: string) => boolean;
  logout: () => void;
  switchView: (view: 'home' | 'login' | 'member' | 'manager' | 'admin') => void;
  checkInMember: (memberId: string, type?: AttendanceRecord['type']) => { success: boolean; message: string };
  addMember: (memberData: {
    name: string;
    email: string;
    phone: string;
    tier: 'Standard' | 'Pro' | 'VIP Elite';
    emergencyContact: string;
    notes?: string;
  }) => MemberProfile;
  updateMemberStatus: (memberId: string, status: MemberProfile['status']) => void;
  deleteMember: (memberId: string) => void;
  bookClass: (classId: string, memberId?: string) => { success: boolean; message: string };
  cancelClassBooking: (classId: string, memberId?: string) => { success: boolean; message: string };
  addClass: (classData: Omit<GymClass, 'id' | 'enrolledMemberIds'>) => void;
  deleteClass: (classId: string) => void;
  logWorkout: (workout: Omit<WorkoutSession, 'id'>) => void;
  updateEquipmentStatus: (equipmentId: string, status: EquipmentItem['status'], issueNotes?: string) => void;
  updateInventoryStock: (itemId: string, change: number) => void;
  toggleLikeNews: (newsId: string) => void;
  rsvpEvent: (eventId: string) => void;
  addNewsPost: (post: { title: string; category: NewsPost['category']; snippet: string; content: string }) => void;
  addPromoOffer: (promo: Omit<PromoOffer, 'id'>) => void;
  addStaff: (staffData: Omit<StaffMember, 'id' | 'avatarBg'>) => void;
  selectedLoginTab: 'member' | 'manager' | 'admin';
  setSelectedLoginTab: (tab: 'member' | 'manager' | 'admin') => void;
}

const GymContext = createContext<GymContextType | undefined>(undefined);

export const GymProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence helpers
  const getStored = <T,>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(`aspire_gym_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  const setStored = (key: string, value: unknown) => {
    try {
      localStorage.setItem(`aspire_gym_${key}`, JSON.stringify(value));
    } catch {
      // ignore
    }
  };

  const [members, setMembers] = useState<MemberProfile[]>(() => getStored('members', INITIAL_MEMBERS));
  const [staff, setStaff] = useState<StaffMember[]>(() => getStored('staff', INITIAL_STAFF));
  const [classes, setClasses] = useState<GymClass[]>(() => getStored('classes', INITIAL_CLASSES));
  const [news, setNews] = useState<NewsPost[]>(() => getStored('news', INITIAL_NEWS));
  const [promos, setPromos] = useState<PromoOffer[]>(() => getStored('promos', INITIAL_PROMOS));
  const [events, setEvents] = useState<GymEvent[]>(() => getStored('events', INITIAL_EVENTS));
  const [equipment, setEquipment] = useState<EquipmentItem[]>(() => getStored('equipment', INITIAL_EQUIPMENT));
  const [inventory, setInventory] = useState<InventoryItem[]>(() => getStored('inventory', INITIAL_INVENTORY));
  const [transactions, setTransactions] = useState<TransactionRecord[]>(() => getStored('transactions', INITIAL_TRANSACTIONS));
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => getStored('attendance', INITIAL_ATTENDANCE));
  const [workouts, setWorkouts] = useState<WorkoutSession[]>(() => getStored('workouts', INITIAL_WORKOUTS));
  const [prs, setPrs] = useState<PersonalRecord[]>(() => getStored('prs', INITIAL_PRS));

  // Navigation and Auth
  const [currentUser, setCurrentUser] = useState<User | null>(() => getStored('currentUser', null));
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'member' | 'manager' | 'admin'>('home');
  const [selectedLoginTab, setSelectedLoginTab] = useState<'member' | 'manager' | 'admin'>('member');
  const [isMobileDeviceView, setIsMobileDeviceView] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => setStored('members', members), [members]);
  useEffect(() => setStored('classes', classes), [classes]);
  useEffect(() => setStored('staff', staff), [staff]);
  useEffect(() => setStored('news', news), [news]);
  useEffect(() => setStored('promos', promos), [promos]);
  useEffect(() => setStored('events', events), [events]);
  useEffect(() => setStored('equipment', equipment), [equipment]);
  useEffect(() => setStored('inventory', inventory), [inventory]);
  useEffect(() => setStored('transactions', transactions), [transactions]);
  useEffect(() => setStored('attendance', attendance), [attendance]);
  useEffect(() => setStored('workouts', workouts), [workouts]);
  useEffect(() => setStored('prs', prs), [prs]);
  useEffect(() => setStored('currentUser', currentUser), [currentUser]);

  const activeRole: UserRole = currentUser ? currentUser.role : 'guest';

  const toggleMobileDeviceView = () => setIsMobileDeviceView(prev => !prev);

  const switchView = (view: 'home' | 'login' | 'member' | 'manager' | 'admin') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const login = (role: UserRole, _identifier?: string): boolean => {
    if (role === 'member') {
      const alex = members[0] || INITIAL_MEMBERS[0];
      const memberUser: User = {
        id: alex.id,
        name: alex.name,
        email: alex.email,
        role: 'member',
        memberId: alex.memberCode,
        phone: alex.phone,
        plan: alex.tier,
        joinDate: alex.joinDate
      };
      setCurrentUser(memberUser);
      setCurrentView('member');
      return true;
    } else if (role === 'manager') {
      const managerUser: User = {
        id: 'mgr-1',
        name: 'Marcus Vance',
        email: 'marcus.vance@aspirefitness.com',
        role: 'manager'
      };
      setCurrentUser(managerUser);
      setCurrentView('manager');
      return true;
    } else if (role === 'admin') {
      const adminUser: User = {
        id: 'adm-1',
        name: 'Sarah Chen',
        email: 'sarah.admin@aspirefitness.com',
        role: 'admin'
      };
      setCurrentUser(adminUser);
      setCurrentView('admin');
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  const checkInMember = (memberId: string, type: AttendanceRecord['type'] = 'Gym Floor') => {
    const member = members.find(m => m.id === memberId || m.memberCode === memberId);
    if (!member) {
      return { success: false, message: 'Member record not found.' };
    }
    if (member.status === 'Expired' || member.status === 'Frozen') {
      return { success: false, message: `Check-in denied: Membership is currently ${member.status}.` };
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toISOString().split('T')[0];

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      memberId: member.id,
      memberName: member.name,
      date: dateStr,
      time: timeStr,
      type,
      durationMinutes: 60
    };

    setAttendance(prev => [newRecord, ...prev]);
    setMembers(prev =>
      prev.map(m =>
        m.id === member.id
          ? {
              ...m,
              totalCheckIns: m.totalCheckIns + 1,
              streakDays: m.streakDays + 1,
              lastCheckIn: `Today at ${timeStr}`
            }
          : m
      )
    );

    return { success: true, message: `Access granted! Welcome, ${member.name}. Have a great session.` };
  };

  const addMember = (data: {
    name: string;
    email: string;
    phone: string;
    tier: 'Standard' | 'Pro' | 'VIP Elite';
    emergencyContact: string;
    notes?: string;
  }): MemberProfile => {
    const randomCode = `ASP-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const joinDate = now.toISOString().split('T')[0];
    const expiry = new Date(now.setFullYear(now.getFullYear() + 1)).toISOString().split('T')[0];
    const colors = ['bg-emerald-600', 'bg-blue-600', 'bg-purple-600', 'bg-amber-600', 'bg-rose-600', 'bg-cyan-600'];
    const avatarBg = colors[Math.floor(Math.random() * colors.length)];

    const newMember: MemberProfile = {
      id: `mem-${Date.now()}`,
      memberCode: randomCode,
      name: data.name,
      email: data.email,
      phone: data.phone,
      tier: data.tier,
      status: 'Active',
      joinDate,
      expiryDate: expiry,
      emergencyContact: data.emergencyContact || 'Not specified',
      totalCheckIns: 0,
      streakDays: 0,
      notes: data.notes || '',
      avatarBg
    };

    setMembers(prev => [newMember, ...prev]);

    // Record initial transaction
    const priceMap = { 'Standard': 69, 'Pro': 99, 'VIP Elite': 149 };
    const tx: TransactionRecord = {
      id: `tx-${Date.now()}`,
      date: 'Just now',
      memberId: newMember.id,
      memberName: newMember.name,
      item: `${newMember.tier} Membership Registration`,
      amount: priceMap[newMember.tier],
      category: 'Membership',
      status: 'Completed'
    };
    setTransactions(prev => [tx, ...prev]);

    return newMember;
  };

  const updateMemberStatus = (memberId: string, status: MemberProfile['status']) => {
    setMembers(prev => prev.map(m => (m.id === memberId ? { ...m, status } : m)));
  };

  const deleteMember = (memberId: string) => {
    setMembers(prev => prev.filter(m => m.id !== memberId));
  };

  const bookClass = (classId: string, targetMemberId?: string) => {
    const memberIdToBook = targetMemberId || (currentUser?.role === 'member' ? currentUser.id : 'mem-1');
    const targetClass = classes.find(c => c.id === classId);

    if (!targetClass) return { success: false, message: 'Class not found.' };

    if (targetClass.enrolledMemberIds.includes(memberIdToBook)) {
      return { success: false, message: 'You are already booked for this class.' };
    }

    if (targetClass.enrolledMemberIds.length >= targetClass.capacity) {
      return { success: false, message: 'Class is currently at full capacity.' };
    }

    setClasses(prev =>
      prev.map(c =>
        c.id === classId
          ? { ...c, enrolledMemberIds: [...c.enrolledMemberIds, memberIdToBook] }
          : c
      )
    );

    return { success: true, message: `Spot reserved! See you in ${targetClass.name}.` };
  };

  const cancelClassBooking = (classId: string, targetMemberId?: string) => {
    const memberIdToCancel = targetMemberId || (currentUser?.role === 'member' ? currentUser.id : 'mem-1');
    setClasses(prev =>
      prev.map(c =>
        c.id === classId
          ? { ...c, enrolledMemberIds: c.enrolledMemberIds.filter(id => id !== memberIdToCancel) }
          : c
      )
    );
    return { success: true, message: 'Class booking cancelled.' };
  };

  const addClass = (classData: Omit<GymClass, 'id' | 'enrolledMemberIds'>) => {
    const newClass: GymClass = {
      ...classData,
      id: `cls-${Date.now()}`,
      enrolledMemberIds: []
    };
    setClasses(prev => [...prev, newClass]);
  };

  const deleteClass = (classId: string) => {
    setClasses(prev => prev.filter(c => c.id !== classId));
  };

  const logWorkout = (workoutData: Omit<WorkoutSession, 'id'>) => {
    const newWorkout: WorkoutSession = {
      ...workoutData,
      id: `wo-${Date.now()}`
    };
    setWorkouts(prev => [newWorkout, ...prev]);

    // Check PRs
    workoutData.exercises.forEach(ex => {
      if (ex.pr || ex.weightLbs > 0) {
        setPrs(prev => {
          const existing = prev.find(p => p.exercise.toLowerCase() === ex.name.toLowerCase());
          if (!existing || ex.weightLbs > existing.weightLbs) {
            const filtered = prev.filter(p => p.exercise.toLowerCase() !== ex.name.toLowerCase());
            return [
              {
                exercise: ex.name,
                weightLbs: ex.weightLbs,
                date: 'Today',
                previousWeightLbs: existing ? existing.weightLbs : undefined
              },
              ...filtered
            ];
          }
          return prev;
        });
      }
    });
  };

  const updateEquipmentStatus = (equipmentId: string, status: EquipmentItem['status'], issueNotes?: string) => {
    setEquipment(prev =>
      prev.map(eq =>
        eq.id === equipmentId
          ? {
              ...eq,
              status,
              reportedIssue: issueNotes !== undefined ? issueNotes : eq.reportedIssue
            }
          : eq
      )
    );
  };

  const updateInventoryStock = (itemId: string, change: number) => {
    setInventory(prev =>
      prev.map(inv =>
        inv.id === itemId
          ? { ...inv, stock: Math.max(0, inv.stock + change) }
          : inv
      )
    );
  };

  const toggleLikeNews = (newsId: string) => {
    setNews(prev =>
      prev.map(n =>
        n.id === newsId
          ? {
              ...n,
              isLiked: !n.isLiked,
              likes: n.isLiked ? n.likes - 1 : n.likes + 1
            }
          : n
      )
    );
  };

  const rsvpEvent = (eventId: string) => {
    setEvents(prev =>
      prev.map(ev =>
        ev.id === eventId
          ? {
              ...ev,
              userRsvp: !ev.userRsvp,
              attendeesCount: ev.userRsvp ? ev.attendeesCount - 1 : ev.attendeesCount + 1
            }
          : ev
      )
    );
  };

  const addNewsPost = (post: { title: string; category: NewsPost['category']; snippet: string; content: string }) => {
    const newPost: NewsPost = {
      id: `news-${Date.now()}`,
      title: post.title,
      category: post.category,
      snippet: post.snippet,
      content: post.content,
      date: 'Just now',
      imageTag: 'news',
      likes: 0,
      isLiked: false
    };
    setNews(prev => [newPost, ...prev]);
  };

  const addPromoOffer = (promo: Omit<PromoOffer, 'id'>) => {
    const newPromo: PromoOffer = {
      ...promo,
      id: `pro-${Date.now()}`
    };
    setPromos(prev => [newPromo, ...prev]);
  };

  const addStaff = (staffData: Omit<StaffMember, 'id' | 'avatarBg'>) => {
    const colors = ['bg-red-700', 'bg-indigo-700', 'bg-teal-700', 'bg-fuchsia-700', 'bg-sky-700'];
    const newStaff: StaffMember = {
      ...staffData,
      id: `st-${Date.now()}`,
      avatarBg: colors[Math.floor(Math.random() * colors.length)]
    };
    setStaff(prev => [...prev, newStaff]);
  };

  return (
    <GymContext.Provider
      value={{
        currentUser,
        activeRole,
        currentView,
        isMobileDeviceView,
        toggleMobileDeviceView,
        members,
        staff,
        classes,
        news,
        promos,
        events,
        equipment,
        inventory,
        transactions,
        attendance,
        workouts,
        prs,
        login,
        logout,
        switchView,
        checkInMember,
        addMember,
        updateMemberStatus,
        deleteMember,
        bookClass,
        cancelClassBooking,
        addClass,
        deleteClass,
        logWorkout,
        updateEquipmentStatus,
        updateInventoryStock,
        toggleLikeNews,
        rsvpEvent,
        addNewsPost,
        addPromoOffer,
        addStaff,
        selectedLoginTab,
        setSelectedLoginTab
      }}
    >
      {children}
    </GymContext.Provider>
  );
};

export const useGym = () => {
  const context = useContext(GymContext);
  if (!context) {
    throw new Error('useGym must be used within a GymProvider');
  }
  return context;
};
