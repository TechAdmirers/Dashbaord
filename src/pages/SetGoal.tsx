import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Calendar, Target, TrendingUp, Trash2, Edit2 } from 'lucide-react';

interface Goal {
  id: number;
  name: string;
  targetDate: string;
  progress: number;
  notes: string;
}

const demoGoals: Goal[] = [
  {
    id: 1,
    name: 'Complete React Course',
    targetDate: '2024-06-20',
    progress: 60,
    notes: 'Finish all advanced modules.'
  },
  {
    id: 2,
    name: 'Master Machine Learning',
    targetDate: '2024-07-10',
    progress: 30,
    notes: 'Focus on deep learning.'
  }
];

export default function SetGoal() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [form, setForm] = useState<Omit<Goal, 'id'>>({
    name: '',
    targetDate: '',
    progress: 0,
    notes: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    setGoals(demoGoals);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'progress' ? Number(value) : value });
  };

  const handleAddOrEdit = () => {
    if (editingId !== null) {
      setGoals(goals.map(goal => goal.id === editingId ? { ...goal, ...form } : goal));
      setEditingId(null);
    } else {
      setGoals([
        ...goals,
        { ...form, id: Date.now() },
      ]);
    }
    setForm({ name: '', targetDate: '', progress: 0, notes: '' });
  };

  const handleEdit = (id: number) => {
    const goal = goals.find(g => g.id === id);
    if (goal) {
      setForm({ ...goal });
      setEditingId(id);
    }
  };

  const handleDelete = (id: number) => {
    setGoals(goals.filter(g => g.id !== id));
    if (editingId === id) setEditingId(null);
  };

  return (
    <>
      <Card className="mb-8 p-6 bg-[#e3ffcd] rounded-2xl shadow-xl border-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="name" placeholder="Goal Name" value={form.name} onChange={handleChange} className="bg-[#edf5ee] text-[#08272a] rounded-lg" />
          <Input name="targetDate" type="date" value={form.targetDate} onChange={handleChange} className="bg-[#edf5ee] text-[#08272a] rounded-lg" />
          <Input name="progress" type="number" min={0} max={100} placeholder="Progress (%)" value={form.progress} onChange={handleChange} className="bg-[#edf5ee] text-[#08272a] rounded-lg" />
        </div>
        <Input name="notes" placeholder="Notes (optional)" className="mt-4 bg-[#edf5ee] text-[#08272a] rounded-lg" value={form.notes} onChange={handleChange} />
        <Button className="mt-4 w-full bg-[#08272a] text-[#e3ffcd] hover:bg-[#0a3a33] font-bold rounded-lg" onClick={handleAddOrEdit}>
          {editingId !== null ? 'Update Goal' : 'Add Goal'}
        </Button>
      </Card>
      <div className="space-y-4">
        {goals.length === 0 && <p className="text-gray-500">No goals set yet.</p>}
        {goals.map(goal => (
          <Card key={goal.id} className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#edf5ee] border-0 rounded-2xl shadow">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2 text-lg font-semibold text-[#08272a]">
                <TrendingUp className="h-5 w-5" style={{ color: '#08272a' }} /> {goal.name}
              </div>
              <div className="flex items-center gap-4 text-sm text-[#08272a] mt-1">
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" style={{ color: '#08272a' }} /> {goal.targetDate}</span>
                <span className="flex items-center gap-1"><Target className="h-4 w-4" style={{ color: '#08272a' }} /> {goal.progress}%</span>
              </div>
              {goal.notes && <div className="text-xs text-[#08272a] mt-1">Notes: {goal.notes}</div>}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="border-[#08272a] text-[#08272a] hover:bg-[#e3ffcd]" onClick={() => handleEdit(goal.id)}><Edit2 className="h-4 w-4" /></Button>
              <Button variant="destructive" size="icon" className="bg-[#08272a] text-[#e3ffcd] hover:bg-red-100" onClick={() => handleDelete(goal.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
} 