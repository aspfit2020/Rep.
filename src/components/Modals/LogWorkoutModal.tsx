import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { X, Plus, Trash2, Dumbbell, Sparkles } from 'lucide-react';
import { WorkoutExercise } from '../../types';

interface LogWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogWorkoutModal: React.FC<LogWorkoutModalProps> = ({ isOpen, onClose }) => {
  const { logWorkout, currentUser } = useGym();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Chest & Triceps' | 'Back & Biceps' | 'Legs & Core' | 'Shoulders & Arms' | 'Full Body' | 'Cardio & HIIT'>('Chest & Triceps');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [caloriesBurned, setCaloriesBurned] = useState(480);
  const [notes, setNotes] = useState('');

  const [exercises, setExercises] = useState<WorkoutExercise[]>([
    { id: '1', name: 'Barbell Bench Press', sets: 4, reps: 8, weightLbs: 205, pr: false },
    { id: '2', name: 'Incline Dumbbell Press', sets: 3, reps: 10, weightLbs: 70, pr: false }
  ]);

  if (!isOpen) return null;

  const handleAddExercise = () => {
    setExercises(prev => [
      ...prev,
      {
        id: String(Date.now()),
        name: '',
        sets: 3,
        reps: 10,
        weightLbs: 50,
        pr: false
      }
    ]);
  };

  const handleRemoveExercise = (id: string) => {
    setExercises(prev => prev.filter(e => e.id !== id));
  };

  const handleExerciseChange = (id: string, field: keyof WorkoutExercise, value: unknown) => {
    setExercises(prev =>
      prev.map(e => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    logWorkout({
      memberId: currentUser?.id || 'mem-1',
      date: new Date().toISOString().split('T')[0],
      title,
      category,
      durationMinutes: Number(durationMinutes),
      caloriesBurned: Number(caloriesBurned),
      exercises: exercises.filter(ex => ex.name.trim() !== ''),
      notes
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-emerald-800/60 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950/80 to-gray-950 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Log Workout Session</h3>
              <p className="text-xs text-emerald-400 font-medium">Record exercises, reps & Personal Records</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
              Session Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Heavy Push Day & Tricep Burnout"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                Target Muscle Split
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as unknown as typeof category)}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Chest & Triceps">Chest & Triceps</option>
                <option value="Back & Biceps">Back & Biceps</option>
                <option value="Legs & Core">Legs & Core</option>
                <option value="Shoulders & Arms">Shoulders & Arms</option>
                <option value="Full Body">Full Body</option>
                <option value="Cardio & HIIT">Cardio & HIIT</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                Duration (Mins)
              </label>
              <input
                type="number"
                min="10"
                max="240"
                value={durationMinutes}
                onChange={e => setDurationMinutes(Number(e.target.value))}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Exercise Items List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                Exercises Performed
              </label>
              <button
                type="button"
                onClick={handleAddExercise}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Movement</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {exercises.map((ex, idx) => (
                <div
                  key={ex.id}
                  className="p-3 bg-gray-950 border border-gray-800 rounded-xl space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      placeholder={`Exercise #${idx + 1} Name`}
                      value={ex.name}
                      onChange={e => handleExerciseChange(ex.id, 'name', e.target.value)}
                      className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white flex-1 focus:outline-none focus:border-emerald-500"
                    />
                    {exercises.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveExercise(ex.id)}
                        className="text-gray-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-[10px] text-gray-400 block mb-0.5">Sets</span>
                      <input
                        type="number"
                        min="1"
                        value={ex.sets}
                        onChange={e => handleExerciseChange(ex.id, 'sets', Number(e.target.value))}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-2.5 py-1 text-xs text-white"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block mb-0.5">Reps</span>
                      <input
                        type="number"
                        min="1"
                        value={ex.reps}
                        onChange={e => handleExerciseChange(ex.id, 'reps', Number(e.target.value))}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-2.5 py-1 text-xs text-white"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block mb-0.5">Weight (lbs)</span>
                      <input
                        type="number"
                        min="0"
                        step="5"
                        value={ex.weightLbs}
                        onChange={e => handleExerciseChange(ex.id, 'weightLbs', Number(e.target.value))}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-2.5 py-1 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id={`pr-${ex.id}`}
                      checked={ex.pr || false}
                      onChange={e => handleExerciseChange(ex.id, 'pr', e.target.checked)}
                      className="rounded text-emerald-500 focus:ring-emerald-500"
                    />
                    <label htmlFor={`pr-${ex.id}`} className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 cursor-pointer">
                      <Sparkles className="w-3 h-3" /> New Personal Record (PR)
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
              Athlete Notes / Fatigue Feedback
            </label>
            <textarea
              rows={2}
              placeholder="Felt great, smooth explosive reps on bench..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 transition"
          >
            Save Workout & Update Records
          </button>
        </form>

      </div>
    </div>
  );
};
