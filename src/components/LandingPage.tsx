import React, { useState } from 'react';
import { useGym } from '../context/GymContext';
import {
  Flame,
  Calendar,
  Tag,
  Clock,
  MapPin,
  Heart,
  ChevronRight,
  Sparkles,
  Users,
  Copy,
  Check,
  Dumbbell,
  ArrowUpRight,
  TrendingUp,
  Award
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const {
    currentUser,
    news,
    promos,
    events,
    classes,
    switchView,
    toggleLikeNews,
    rsvpEvent,
    bookClass
  } = useGym();

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'All' | 'Facility' | 'Challenge' | 'Community'>('All');
  const [bookingToast, setBookingToast] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleQuickBook = (classId: string, className: string) => {
    const result = bookClass(classId);
    setBookingToast(result.message);
    setTimeout(() => setBookingToast(null), 3000);
  };

  const filteredNews = activeCategoryFilter === 'All'
    ? news
    : news.filter(n => n.category === activeCategoryFilter);

  return (
    <div className="space-y-10 pb-16">
      
      {/* Toast Notification */}
      {bookingToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white font-bold text-sm px-4 py-3 rounded-2xl shadow-xl border border-emerald-400/40 flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <Check className="w-4 h-4" />
          <span>{bookingToast}</span>
        </div>
      )}

      {/* Hero Section: Community & Facility Overview */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 border border-gray-800 shadow-xl p-6 sm:p-10">
        
        {/* Subtle Background Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          
          {/* Status Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800/60 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Club Open • 42% Capacity
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-gray-300 bg-gray-800/80 border border-gray-700/60">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              Hours Today: 05:00 AM – 11:00 PM
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-gray-300 bg-gray-800/80 border border-gray-700/60">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              Metro West Performance Annex
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Elevate Your Training at <span className="text-red-500">Aspire Athletics</span>.
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
            Welcome to your active fitness community. Browse member announcements, reserve group training slots, unlock exclusive club promotions, and celebrate athletic milestones.
          </p>

          {/* Member Quick-Action Callout */}
          <div className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-2xl bg-gray-950/80 border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-950/50 shrink-0">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white">
                  {currentUser?.role === 'member' ? `Welcome back, ${currentUser.name}` : 'Member Training Portal'}
                </h2>
                <p className="text-xs text-gray-400">
                  Track your check-in streaks, barbell PRs, and today's class schedule.
                </p>
              </div>
            </div>

            <button
              id="hero-member-portal-cta"
              onClick={() => switchView(currentUser?.role === 'member' ? 'member' : 'login')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-900/40 transition flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>{currentUser?.role === 'member' ? 'Open Member Dashboard' : 'Member Login & Pass'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-gray-950/50 p-3 rounded-xl border border-gray-800/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                <Users className="w-3 h-3 text-red-400" /> Active Members
              </span>
              <p className="text-lg sm:text-xl font-black text-white mt-0.5">1,428</p>
            </div>
            <div className="bg-gray-950/50 p-3 rounded-xl border border-gray-800/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-400" /> Check-ins Today
              </span>
              <p className="text-lg sm:text-xl font-black text-white mt-0.5">246</p>
            </div>
            <div className="bg-gray-950/50 p-3 rounded-xl border border-gray-800/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                <Award className="w-3 h-3 text-amber-400" /> Group Classes
              </span>
              <p className="text-lg sm:text-xl font-black text-white mt-0.5">12 Today</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 1: PROMOTIONAL OFFERS & PERKS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Exclusive Member Promotions
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              Limited-time discounts, friend passes, and performance upgrades.
            </p>
          </div>
          <span className="text-xs font-bold text-red-400 hidden sm:inline">
            Active Club Deals
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {promos.map(promo => (
            <div
              key={promo.id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition flex flex-col justify-between relative overflow-hidden group shadow-md"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-bl-full pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${promo.tagColor}`}>
                    {promo.discount}
                  </span>
                  <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {promo.expiresIn}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                  {promo.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                  {promo.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Promo Code
                  </span>
                  <span className="font-mono text-xs font-black text-white tracking-wider">
                    {promo.code}
                  </span>
                </div>
                <button
                  id={`copy-promo-${promo.code}`}
                  onClick={() => handleCopyCode(promo.code)}
                  className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-bold text-gray-200 transition flex items-center gap-1.5"
                >
                  {copiedCode === promo.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: COMMUNITY NEWS & FACILITY UPDATES */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Gym Community News & Updates
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              Equipment installs, nutrition tips, challenges, and member spotlights.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 bg-gray-900 p-1 rounded-xl border border-gray-800 self-start sm:self-auto">
            {(['All', 'Facility', 'Challenge', 'Community'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  activeCategoryFilter === cat
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredNews.map(item => (
            <article
              key={item.id}
              className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition flex flex-col justify-between shadow-md group"
            >
              {/* Card Header Tag */}
              <div className="p-5 pb-3">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/60">
                    {item.category}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {item.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  {item.snippet}
                </p>
                <div className="mt-3 p-3 rounded-xl bg-gray-950 border border-gray-800/60 text-xs text-gray-300 leading-normal">
                  {item.content}
                </div>
              </div>

              {/* Card Footer: Interaction & Likes */}
              <div className="px-5 py-3.5 border-t border-gray-800 bg-gray-950/50 flex items-center justify-between">
                <button
                  id={`like-news-${item.id}`}
                  onClick={() => toggleLikeNews(item.id)}
                  className={`flex items-center gap-1.5 text-xs font-bold transition ${
                    item.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${item.isLiked ? 'fill-red-500' : ''}`} />
                  <span>{item.likes} Members Liked</span>
                </button>

                <span className="text-[11px] text-gray-400 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Official Club Post
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 3: UPCOMING GYM EVENTS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Upcoming Community Events
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              Workshops, athletic competitions, and social recovery sessions.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-400 hidden sm:inline">
            RSVP Open to All Members
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {events.map(ev => (
            <div
              key={ev.id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition flex flex-col justify-between shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-950 text-blue-400 border border-blue-800/60">
                    {ev.category}
                  </span>
                  <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-blue-400" />
                    {ev.attendeesCount} / {ev.maxSpots || 50} Attending
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">
                  {ev.title}
                </h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  {ev.description}
                </p>

                <div className="mt-4 space-y-1.5 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{ev.location}</span>
                  </div>
                </div>
              </div>

              {/* RSVP Action Button */}
              <div className="mt-5 pt-4 border-t border-gray-800 flex items-center justify-between">
                <span className="text-[11px] text-gray-400 font-medium">
                  {ev.userRsvp ? 'Spot confirmed' : 'Registration free for members'}
                </span>
                <button
                  id={`rsvp-event-${ev.id}`}
                  onClick={() => rsvpEvent(ev.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    ev.userRsvp
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-900/30'
                  }`}
                >
                  {ev.userRsvp ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>RSVP Confirmed</span>
                    </>
                  ) : (
                    <>
                      <span>RSVP Now</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: TODAY'S CLASS SCHEDULE TEASER */}
      <section id="classes-section" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Today's Featured Group Training
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              High intensity circuits, cycling, barbell strength, and mobility flows.
            </p>
          </div>
          <button
            id="open-full-schedule-cta"
            onClick={() => switchView(currentUser?.role === 'member' ? 'member' : 'login')}
            className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1"
          >
            <span>Full Schedule & Booking</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.slice(0, 3).map(cls => {
            const spotsRemaining = cls.capacity - cls.enrolledMemberIds.length;
            const isBooked = currentUser && cls.enrolledMemberIds.includes(currentUser.id);

            return (
              <div
                key={cls.id}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-950/80 text-amber-400 border border-amber-800/60">
                      {cls.category}
                    </span>
                    <span className={`text-[11px] font-bold ${spotsRemaining <= 3 ? 'text-red-400' : 'text-gray-400'}`}>
                      {spotsRemaining > 0 ? `${spotsRemaining} spots left` : 'Waitlist only'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-tight">
                    {cls.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {cls.time} ({cls.durationMinutes} mins)
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-300">
                    <div className="w-6 h-6 rounded-full bg-red-600/30 text-red-400 font-bold text-[10px] flex items-center justify-center border border-red-500/30">
                      {cls.instructorAvatar}
                    </div>
                    <span>Coach {cls.instructor}</span>
                    <span className="text-gray-400">• {cls.room}</span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-800 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 font-medium">{cls.level}</span>
                  <button
                    id={`quick-book-${cls.id}`}
                    onClick={() => handleQuickBook(cls.id, cls.name)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      isBooked
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-red-600 hover:bg-red-500 text-white shadow-xs'
                    }`}
                  >
                    {isBooked ? 'Booked ✓' : 'Reserve Spot'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
