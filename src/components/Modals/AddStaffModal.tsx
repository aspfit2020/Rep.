import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { X, UserCheck } from 'lucide-react';
import { StaffMember } from '../../types';

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddStaffModal: React.FC<AddStaffModalProps> = ({ isOpen, onClose }) => {
  const { addStaff } = useGym();

  const [name, setName] = useState('');
  const [role, setRole] = useState<StaffMember['role']>('Personal Trainer');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [shifts, setShifts] = useState('Morning (06:00 AM - 02:00 PM)');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addStaff({
      name,
      role,
      email: email || `${name.toLowerCase().replace(' ', '.')}@aspiregym.com`,
      phone: phone || '+1 (555) 000-0000',
      specialty: specialty || 'Strength & Conditioning',
      shifts,
      activeClients: 12,
      rating: 4.9,
      status: 'On Duty'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        <div className="p-5 bg-gradient-to-r from-red-950/80 to-gray-950 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Add Staff / Trainer</h3>
              <p className="text-xs text-red-400 font-medium">Register coaching personnel to directory</p>
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
              Staff Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Liam Foster"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                Designated Role
              </label>
              <select
                value={role}
                onChange={e => setRole(e.target.value as StaffMember['role'])}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
              >
                <option value="Head Coach">Head Coach</option>
                <option value="Personal Trainer">Personal Trainer</option>
                <option value="Group Instructor">Group Instructor</option>
                <option value="Floor Supervisor">Floor Supervisor</option>
                <option value="Front Desk">Front Desk</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                Phone Contact
              </label>
              <input
                type="text"
                placeholder="+1 (555) 304-9812"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
              Athletic Specialty & Certifications
            </label>
            <input
              type="text"
              placeholder="e.g. CSCS, Hypertrophy, Mobility, Olympic Lifting"
              value={specialty}
              onChange={e => setSpecialty(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
              Primary Shift Timing
            </label>
            <input
              type="text"
              placeholder="Morning (05:30 AM - 01:30 PM)"
              value={shifts}
              onChange={e => setShifts(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-950/50 transition"
          >
            Save Staff Member
          </button>
        </form>

      </div>
    </div>
  );
};
