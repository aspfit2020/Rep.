import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { X, Calendar } from 'lucide-react';
import { GymClass } from '../../types';

interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddClassModal: React.FC<AddClassModalProps> = ({ isOpen, onClose }) => {
  const { addClass, staff } = useGym();

  const [name, setName] = useState('');
  const [instructor, setInstructor] = useState(staff[0]?.name || 'Sarah Chen');
  const [day, setDay] = useState<GymClass['day']>('Monday');
  const [time, setTime] = useState('06:00 PM - 07:00 PM');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [room, setRoom] = useState('Studio Alpha');
  const [category, setCategory] = useState<GymClass['category']>('HIIT');
  const [capacity, setCapacity] = useState(20);
  const [level, setLevel] = useState<GymClass['level']>('All Levels');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const initials = instructor
      .split(' ')
      .map(p => p[0])
      .join('')
      .toUpperCase();

    addClass({
      name,
      instructor,
      instructorAvatar: initials || 'SC',
      day,
      time,
      durationMinutes: Number(durationMinutes),
      room,
      category,
      capacity: Number(capacity),
      level
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        <div className="p-5 bg-gradient-to-r from-red-950/80 to-gray-950 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Create Group Class</h3>
              <p className="text-xs text-red-400 font-medium">Add to master timetable and member booking roster</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
              Class Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Olympic Barbell Lab"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as GymClass['category'])}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
              >
                <option value="HIIT">HIIT</option>
                <option value="CrossFit">CrossFit</option>
                <option value="Spin">Spin</option>
                <option value="Yoga">Yoga</option>
                <option value="Boxing">Boxing</option>
                <option value="Pilates">Pilates</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                Day of Week
              </label>
              <select
                value={day}
                onChange={e => setDay(e.target.value as GymClass['day'])}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                Class Time
              </label>
              <input
                type="text"
                placeholder="06:30 PM - 07:30 PM"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                Max Capacity
              </label>
              <input
                type="number"
                min="5"
                max="60"
                value={capacity}
                onChange={e => setCapacity(Number(e.target.value))}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                Assigned Instructor
              </label>
              <select
                value={instructor}
                onChange={e => setInstructor(e.target.value)}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
              >
                {staff.map(s => (
                  <option key={s.id} value={s.name}>
                    {s.name} ({s.role})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                Studio / Facility Room
              </label>
              <input
                type="text"
                placeholder="Studio Alpha / Cycle Vault"
                value={room}
                onChange={e => setRoom(e.target.value)}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-950/50 transition"
          >
            Publish Class to Master Schedule
          </button>
        </form>

      </div>
    </div>
  );
};
