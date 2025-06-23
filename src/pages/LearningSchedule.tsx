import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, BookOpen, Trash2, Edit2, Plus } from 'lucide-react';

interface ScheduleEntry {
  id: number;
  course: string;
  date: string;
  time: string;
  duration: string;
  notes: string;
}

const demoEntries: ScheduleEntry[] = [
  {
    id: 1,
    course: 'React Fundamentals',
    date: '2024-06-10',
    time: '10:00',
    duration: '2h',
    notes: 'Focus on hooks and state management.'
  },
  {
    id: 2,
    course: 'Machine Learning Basics',
    date: '2024-06-11',
    time: '14:00',
    duration: '1.5h',
    notes: 'Review supervised learning.'
  }
];

export default function LearningSchedule() {
  const [entries, setEntries] = useState<ScheduleEntry[]>([]);
  const [form, setForm] = useState<Omit<ScheduleEntry, 'id'>>({
    course: '',
    date: '',
    time: '',
    duration: '',
    notes: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    // Load demo data on first load
    setEntries(demoEntries);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrEdit = () => {
    if (editingId !== null) {
      setEntries(entries.map(entry => entry.id === editingId ? { ...entry, ...form } : entry));
      setEditingId(null);
    } else {
      setEntries([
        ...entries,
        { ...form, id: Date.now() },
      ]);
    }
    setForm({ course: '', date: '', time: '', duration: '', notes: '' });
  };

  const handleEdit = (id: number) => {
    const entry = entries.find(e => e.id === id);
    if (entry) {
      setForm({ ...entry });
      setEditingId(id);
    }
  };

  const handleDelete = (id: number) => {
    setEntries(entries.filter(e => e.id !== id));
    if (editingId === id) setEditingId(null);
  };

  return (
    <>
      <Card className="mb-8 p-6 bg-[#e3ffcd] rounded-2xl shadow-xl border-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="course" placeholder="Course Name" value={form.course} onChange={handleChange} className="bg-[#edf5ee] text-[#08272a] rounded-lg" />
          <Input name="date" type="date" value={form.date} onChange={handleChange} className="bg-[#edf5ee] text-[#08272a] rounded-lg" />
          <Input name="time" type="time" value={form.time} onChange={handleChange} className="bg-[#edf5ee] text-[#08272a] rounded-lg" />
          <Input name="duration" placeholder="Duration (e.g. 2h)" value={form.duration} onChange={handleChange} className="bg-[#edf5ee] text-[#08272a] rounded-lg" />
        </div>
        <Input name="notes" placeholder="Notes (optional)" className="mt-4 bg-[#edf5ee] text-[#08272a] rounded-lg" value={form.notes} onChange={handleChange} />
        <Button className="mt-4 w-full bg-[#08272a] text-[#e3ffcd] hover:bg-[#0a3a33] font-bold rounded-lg" onClick={handleAddOrEdit}>
          {editingId !== null ? 'Update Entry' : 'Add to Schedule'}
        </Button>
      </Card>
      <div className="space-y-4">
        {entries.length === 0 && <p className="text-gray-500">No schedule entries yet.</p>}
        {entries.map(entry => (
          <Card key={entry.id} className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#edf5ee] border-0 rounded-2xl shadow">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2 text-lg font-semibold text-[#08272a]">
                <BookOpen className="h-5 w-5" style={{ color: '#08272a' }} /> {entry.course}
              </div>
              <div className="flex items-center gap-4 text-sm text-[#08272a] mt-1">
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" style={{ color: '#08272a' }} /> {entry.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" style={{ color: '#08272a' }} /> {entry.time} ({entry.duration})</span>
              </div>
              {entry.notes && <div className="text-xs text-[#08272a] mt-1">Notes: {entry.notes}</div>}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="border-[#08272a] text-[#08272a] hover:bg-[#e3ffcd]" onClick={() => handleEdit(entry.id)}><Edit2 className="h-4 w-4" /></Button>
              <Button variant="destructive" size="icon" className="bg-[#08272a] text-[#e3ffcd] hover:bg-red-100" onClick={() => handleDelete(entry.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
} 