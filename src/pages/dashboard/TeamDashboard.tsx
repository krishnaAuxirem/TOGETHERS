import { useEffect, useState } from 'react';
import { Calendar, CheckSquare, Image, FileText, Users, Plus, Check } from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import StatCard from '@/components/ui-custom/StatCard';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const INITIAL_TASKS = [
  { id: '1', title: 'Review Q2 project plan', done: false, priority: 'high' },
  { id: '2', title: 'Schedule weekly team standup', done: true, priority: 'medium' },
  { id: '3', title: 'Share vacation photos album', done: false, priority: 'low' },
  { id: '4', title: 'Update team calendar for June', done: false, priority: 'high' },
  { id: '5', title: 'Prepare birthday party plan', done: true, priority: 'medium' },
];

const CALENDAR_EVENTS = [
  { day: 'Mon 02', event: 'Team Standup', time: '10:00 AM', color: 'bg-coral-100 text-coral-700' },
  { day: 'Wed 04', event: 'Product Review', time: '2:00 PM', color: 'bg-indigo-100 text-indigo-700' },
  { day: 'Fri 06', event: 'Family Dinner', time: '7:00 PM', color: 'bg-emerald-100 text-emerald-700' },
  { day: 'Sat 07', event: 'Outdoor Trip', time: '9:00 AM', color: 'bg-amber-100 text-amber-700' },
];

const PRIORITY_COLORS: Record<string, string> = {
  high: 'bg-red-50 text-red-500 border-red-200',
  medium: 'bg-amber-50 text-amber-600 border-amber-200',
  low: 'bg-green-50 text-green-600 border-green-200',
};

export default function TeamDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTask, setNewTask] = useState('');

  if (!isAuthenticated || user?.role !== 'team') return <Navigate to="/login" replace />;

  const toggleTask = (id: string) => {
    setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks(ts => [...ts, { id: Date.now().toString(), title: newTask, done: false, priority: 'medium' }]);
    setNewTask('');
    toast.success('Task added!');
  };

  const completedCount = tasks.filter(t => t.done).length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Team & Family Hub</h1>
            <p className="text-gray-500 mt-1">Your private collaboration space.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatCard title="Team Members" value="8" icon={<Users size={20} />} color="text-emerald-500" bg="bg-emerald-50" />
            <StatCard title="Tasks Completed" value={`${completedCount}/${tasks.length}`} icon={<CheckSquare size={20} />} color="text-coral-500" bg="bg-coral-50" />
            <StatCard title="Events This Week" value="4" icon={<Calendar size={20} />} color="text-indigo-500" bg="bg-indigo-50" />
            <StatCard title="Shared Albums" value="12" icon={<Image size={20} />} color="text-amber-500" bg="bg-amber-50" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Task Board */}
            <div className="glass-card rounded-2xl border border-gray-100">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Shared Task Board</h2>
                <div className="h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
                  <div className="h-full gradient-primary rounded-full transition-all" style={{ width: `${(completedCount / tasks.length) * 100}%` }} />
                </div>
                <p className="text-xs text-gray-400 mt-1">{completedCount} of {tasks.length} tasks complete</p>
              </div>

              <div className="p-5">
                <form onSubmit={addTask} className="flex gap-2 mb-4">
                  <input value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Add a new task..." className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-coral-400" />
                  <button type="submit" className="px-4 py-2.5 bg-coral-500 text-white rounded-xl hover:bg-coral-600 transition-all">
                    <Plus size={16} />
                  </button>
                </form>

                <div className="space-y-2">
                  {tasks.map(task => (
                    <div key={task.id} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${task.done ? 'bg-gray-50 opacity-60' : 'bg-white border border-gray-100 hover:border-coral-200'}`}>
                      <button onClick={() => toggleTask(task.id)} className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${task.done ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 hover:border-coral-400'}`}>
                        {task.done && <Check size={12} className="text-white" />}
                      </button>
                      <span className={`flex-1 text-sm ${task.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{task.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${PRIORITY_COLORS[task.priority]}`}>{task.priority}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Calendar & Team */}
            <div className="space-y-5">
              {/* Calendar */}
              <div className="glass-card rounded-2xl p-5 border border-gray-100">
                <h2 className="font-bold text-gray-900 mb-4">This Week's Schedule</h2>
                <div className="space-y-2">
                  {CALENDAR_EVENTS.map(e => (
                    <div key={e.day} className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-gray-400 w-16 flex-shrink-0">{e.day}</span>
                      <div className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold ${e.color}`}>
                        {e.event} · {e.time}
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => toast.success('Opening full calendar...')} className="mt-4 w-full py-2.5 border border-gray-200 hover:border-coral-400 text-gray-600 hover:text-coral-600 rounded-xl text-sm font-semibold transition-all">
                  View Full Calendar
                </button>
              </div>

              {/* Team Members */}
              <div className="glass-card rounded-2xl p-5 border border-gray-100">
                <h2 className="font-bold text-gray-900 mb-4">Team Members</h2>
                <div className="space-y-3">
                  {[
                    { name: 'Kavita Singh', status: 'online', role: 'Team Lead', avatar: 'https://i.pravatar.cc/150?img=25' },
                    { name: 'Ravi Kumar', status: 'online', role: 'Engineer', avatar: 'https://i.pravatar.cc/150?img=33' },
                    { name: 'Sneha Patel', status: 'away', role: 'Designer', avatar: 'https://i.pravatar.cc/150?img=29' },
                    { name: 'Priya Sharma', status: 'offline', role: 'Manager', avatar: 'https://i.pravatar.cc/150?img=47' },
                  ].map(m => (
                    <div key={m.name} className="flex items-center gap-3">
                      <div className="relative">
                        <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-full object-cover" />
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${m.status === 'online' ? 'bg-emerald-400' : m.status === 'away' ? 'bg-amber-400' : 'bg-gray-300'}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">{m.name}</p>
                        <p className="text-xs text-gray-400">{m.role} · {m.status}</p>
                      </div>
                      <button onClick={() => toast.success(`Opening chat with ${m.name}`)} className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-coral-50 hover:text-coral-600 rounded-lg transition-all font-medium text-gray-600">
                        Chat
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
