import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { X, UserPlus } from 'lucide-react';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose }) => {
  const { addMember } = useGym();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tier, setTier] = useState<'Standard' | 'Pro' | 'VIP Elite'>('Pro');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    addMember({
      name,
      email,
      phone: phone || '+1 (555) 000-0000',
      tier,
      emergencyContact: emergencyContact || 'Not provided',
      notes
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-red-950/80 to-gray-950 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center font-bold">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Register New Member</h3>
              <p className="text-xs text-red-400 font-medium">Issue digital pass & assign tier plan</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
              Full Legal Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Jordan Mitchell"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="jordan@gym.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+1 (555) 019-2831"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
              Membership Tier Plan
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Standard', 'Pro', 'VIP Elite'] as const).map(t => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTier(t)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold border transition ${
                    tier === t
                      ? 'bg-red-600 text-white border-red-500 shadow-xs'
                      : 'bg-gray-950 text-gray-400 border-gray-800 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              {tier === 'Standard' && '$69/mo: Full gym floor access off-peak & peak'}
              {tier === 'Pro' && '$99/mo: Gym floor + unlimited group fitness classes'}
              {tier === 'VIP Elite' && '$149/mo: All-inclusive + Sauna, Smoothie discounts & guest passes'}
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
              Emergency Contact & Phone
            </label>
            <input
              type="text"
              placeholder="e.g. Taylor Mitchell - (555) 918-2231"
              value={emergencyContact}
              onChange={e => setEmergencyContact(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
              Medical / Goal Notes
            </label>
            <textarea
              rows={2}
              placeholder="Health restrictions, fitness goals, assigned locker..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-950/50 transition"
          >
            Create Membership Account
          </button>
        </form>

      </div>
    </div>
  );
};
