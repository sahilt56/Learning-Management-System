import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import {
  LayoutDashboard, Users, BookOpen, ShoppingCart, LogOut,
  TrendingUp, Search, Trash2, Shield, UserCheck, ChevronLeft,
  ChevronRight, RefreshCw, X, Check, Menu, GraduationCap,
  AlertTriangle, BarChart2, Clock
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────
interface Stats {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  students: number;
  instructors: number;
  recentEnrollments: number;
}
interface UserRow {
  _id: string; name: string; email: string; role: string;
  profilePicture?: string; createdAt: string;
}
interface CourseRow {
  _id: string; title: string; category: string; price: number;
  studentsCount: number; thumbnailUrl?: string; teacherNames?: string[];
  customTeacherName?: string; createdAt: string;
}
interface EnrollmentRow {
  _id: string;
  user?: { name: string; email: string; profilePicture?: string };
  course?: { title: string; price: number; category: string; thumbnailUrl?: string };
  enrolledEmail?: string; enrolledName?: string;
  createdAt: string; progress: number;
}

type Tab = 'overview' | 'users' | 'courses' | 'enrollments';

// ─── API Helper ──────────────────────────────────────────────
const getAuthHeader = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const token = await user.getIdToken();
  return { Authorization: `Bearer ${token}` };
};

const API = 'http://localhost:5000/api/admin';

// ─── Confirm Dialog ──────────────────────────────────────────
function ConfirmDialog({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full space-y-4">
        <div className="flex items-center gap-3 text-red-600">
          <AlertTriangle className="w-6 h-6 shrink-0" />
          <p className="font-bold text-slate-800">{message}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2 rounded-xl border-2 border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}

// ─── Stat Card ───────────────────────────────────────────────
function StatCard({ icon, label, value, color, sub }: { icon: React.ReactNode; label: string; value: number | string; color: string; sub?: string }) {
  return (
    <div className={`rounded-2xl p-5 border border-white/10 bg-gradient-to-br ${color} text-white flex items-start justify-between`}>
      <div>
        <p className="text-white/70 text-sm font-semibold uppercase tracking-wide">{label}</p>
        <p className="text-4xl font-black mt-1">{value}</p>
        {sub && <p className="text-white/60 text-xs mt-1">{sub}</p>}
      </div>
      <div className="bg-white/20 rounded-xl p-3">{icon}</div>
    </div>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────
function OverviewTab({ stats }: { stats: Stats | null }) {
  if (!stats) return <div className="text-slate-400 text-center py-20">Loading stats...</div>;
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <StatCard icon={<Users className="w-6 h-6" />} label="Total Users" value={stats.totalUsers} color="from-indigo-600 to-indigo-800" sub={`${stats.students} students · ${stats.instructors} instructors`} />
        <StatCard icon={<BookOpen className="w-6 h-6" />} label="Total Courses" value={stats.totalCourses} color="from-violet-600 to-violet-800" />
        <StatCard icon={<ShoppingCart className="w-6 h-6" />} label="Total Enrollments" value={stats.totalEnrollments} color="from-emerald-600 to-emerald-800" sub={`${stats.recentEnrollments} in last 30 days`} />
        <StatCard icon={<GraduationCap className="w-6 h-6" />} label="Students" value={stats.students} color="from-sky-600 to-sky-800" />
        <StatCard icon={<Shield className="w-6 h-6" />} label="Instructors" value={stats.instructors} color="from-orange-600 to-orange-800" />
        <StatCard icon={<TrendingUp className="w-6 h-6" />} label="Recent Enrollments" value={stats.recentEnrollments} color="from-pink-600 to-pink-800" sub="Last 30 days" />
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-white font-black uppercase tracking-wide mb-4 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-indigo-400" /> Quick Summary
        </h3>
        <div className="space-y-4">
          {[
            { label: 'Students / Total Users', value: stats.totalUsers ? Math.round((stats.students / stats.totalUsers) * 100) : 0, color: 'bg-sky-500' },
            { label: 'Instructors / Total Users', value: stats.totalUsers ? Math.round((stats.instructors / stats.totalUsers) * 100) : 0, color: 'bg-orange-500' },
            { label: 'Recent Enrollments / Total', value: stats.totalEnrollments ? Math.round((stats.recentEnrollments / stats.totalEnrollments) * 100) : 0, color: 'bg-emerald-500' },
          ].map(({ label, value, color }) => (
            <div key={label}>
              <div className="flex justify-between text-sm text-slate-400 mb-1">
                <span>{label}</span><span className="font-bold text-white">{value}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Users Tab ───────────────────────────────────────────────
function UsersTab() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const headers = await getAuthHeader();
      const res = await axios.get(`${API}/users`, { headers, params: { page, limit: 15, search, role: roleFilter } });
      setUsers(res.data.users);
      setTotal(res.data.total);
      setPages(res.data.pages);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }, [page, search, roleFilter]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const changeRole = async (id: string, role: string) => {
    try {
      const headers = await getAuthHeader();
      await axios.put(`${API}/users/${id}/role`, { role }, { headers });
      fetchUsers();
    } catch (e) { console.error(e); }
  };

  const deleteUser = async (id: string) => {
    try {
      const headers = await getAuthHeader();
      await axios.delete(`${API}/users/${id}`, { headers });
      setConfirm(null);
      fetchUsers();
    } catch (e) { console.error(e); }
  };

  const roleBadge: Record<string, string> = {
    admin: 'bg-red-500/20 text-red-400 border-red-500/30',
    instructor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    student: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  };

  return (
    <div className="space-y-5">
      {confirm && <ConfirmDialog message="Delete this user? This cannot be undone." onConfirm={() => deleteUser(confirm)} onCancel={() => setConfirm(null)} />}

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search users..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors" />
        </div>
        <select value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPage(1); }}
          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors">
          <option value="">All Roles</option>
          <option value="student">Students</option>
          <option value="instructor">Instructors</option>
          <option value="admin">Admins</option>
        </select>
        <button onClick={fetchUsers} className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="text-slate-400 text-sm">{total} users found</div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80">
                <th className="text-left px-4 py-3 text-slate-400 font-semibold">User</th>
                <th className="text-left px-4 py-3 text-slate-400 font-semibold">Email</th>
                <th className="text-left px-4 py-3 text-slate-400 font-semibold">Role</th>
                <th className="text-left px-4 py-3 text-slate-400 font-semibold">Joined</th>
                <th className="text-left px-4 py-3 text-slate-400 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-slate-800/50 animate-pulse">
                    <td className="px-4 py-3"><div className="h-4 bg-slate-800 rounded w-32" /></td>
                    <td className="px-4 py-3"><div className="h-4 bg-slate-800 rounded w-40" /></td>
                    <td className="px-4 py-3"><div className="h-6 bg-slate-800 rounded w-16" /></td>
                    <td className="px-4 py-3"><div className="h-4 bg-slate-800 rounded w-20" /></td>
                    <td className="px-4 py-3"><div className="h-4 bg-slate-800 rounded w-16" /></td>
                  </tr>
                ))
              ) : users.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-12 text-slate-500">No users found</td></tr>
              ) : (
                users.map(u => (
                  <tr key={u._id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img src={u.profilePicture || `https://api.dicebear.com/7.x/initials/svg?seed=${u.name}`}
                          alt={u.name} className="w-8 h-8 rounded-full object-cover border border-slate-700 shrink-0" />
                        <span className="text-white font-semibold truncate max-w-[140px]">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-300 truncate max-w-[180px]">{u.email}</td>
                    <td className="px-4 py-3">
                      <select value={u.role} onChange={e => changeRole(u._id, e.target.value)}
                        className={`border rounded-lg px-2 py-1 text-xs font-bold bg-transparent cursor-pointer ${roleBadge[u.role] || 'text-slate-400 border-slate-600'}`}>
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => setConfirm(u._id)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1.5 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">Page {page} of {pages}</span>
        <div className="flex gap-2">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white disabled:opacity-40 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button disabled={page === pages} onClick={() => setPage(p => p + 1)}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white disabled:opacity-40 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Courses Tab ──────────────────────────────────────────────
function CoursesTab() {
  const [courses, setCourses] = useState<CourseRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const headers = await getAuthHeader();
      const res = await axios.get(`${API}/courses`, { headers, params: { page, limit: 12, search } });
      setCourses(res.data.courses);
      setTotal(res.data.total);
      setPages(res.data.pages);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }, [page, search]);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  const deleteCourse = async (id: string) => {
    try {
      const headers = await getAuthHeader();
      await axios.delete(`${API}/courses/${id}`, { headers });
      setConfirm(null);
      fetchCourses();
    } catch (e) { console.error(e); }
  };

  return (
    <div className="space-y-5">
      {confirm && <ConfirmDialog message="Delete this course? All enrollments will also be removed." onConfirm={() => deleteCourse(confirm)} onCancel={() => setConfirm(null)} />}

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search courses..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors" />
        </div>
        <button onClick={fetchCourses} className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="text-slate-400 text-sm">{total} courses found</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden animate-pulse">
              <div className="aspect-video bg-slate-800" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-slate-800 rounded w-3/4" />
                <div className="h-3 bg-slate-800 rounded w-1/2" />
              </div>
            </div>
          ))
        ) : courses.length === 0 ? (
          <div className="col-span-3 text-center py-16 text-slate-500">No courses found</div>
        ) : (
          courses.map(c => (
            <div key={c._id} className="bg-slate-900/50 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-colors group">
              <div className="relative aspect-video overflow-hidden">
                <img src={c.thumbnailUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80'}
                  alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-2 left-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">{c.category}</span>
              </div>
              <div className="p-4">
                <h4 className="text-white font-bold leading-tight line-clamp-2 mb-1">{c.title}</h4>
                <p className="text-slate-400 text-xs mb-3">
                  {c.teacherNames?.join(', ') || c.customTeacherName || 'Unknown'} · {c.studentsCount} students
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-indigo-400 font-black">${c.price}</span>
                  <div className="flex gap-2">
                    <a href={`/courses/${c._id}`} target="_blank" rel="noreferrer"
                      className="text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 px-3 py-1.5 rounded-lg transition-colors">
                      View
                    </a>
                    <button onClick={() => setConfirm(c._id)}
                      className="text-xs text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/60 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">Page {page} of {pages}</span>
        <div className="flex gap-2">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white disabled:opacity-40 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button disabled={page === pages} onClick={() => setPage(p => p + 1)}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white disabled:opacity-40 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Enrollments Tab ─────────────────────────────────────────
function EnrollmentsTab() {
  const [enrollments, setEnrollments] = useState<EnrollmentRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchEnrollments = useCallback(async () => {
    setLoading(true);
    try {
      const headers = await getAuthHeader();
      const res = await axios.get(`${API}/enrollments`, { headers, params: { page, limit: 15 } });
      setEnrollments(res.data.enrollments);
      setTotal(res.data.total);
      setPages(res.data.pages);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }, [page]);

  useEffect(() => { fetchEnrollments(); }, [fetchEnrollments]);

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div className="text-slate-400 text-sm">{total} active enrollments</div>
        <button onClick={fetchEnrollments} className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80">
                <th className="text-left px-4 py-3 text-slate-400 font-semibold">Student</th>
                <th className="text-left px-4 py-3 text-slate-400 font-semibold">Course</th>
                <th className="text-left px-4 py-3 text-slate-400 font-semibold">Progress</th>
                <th className="text-left px-4 py-3 text-slate-400 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="border-b border-slate-800/50 animate-pulse">
                    <td className="px-4 py-3"><div className="h-4 bg-slate-800 rounded w-36" /></td>
                    <td className="px-4 py-3"><div className="h-4 bg-slate-800 rounded w-48" /></td>
                    <td className="px-4 py-3"><div className="h-3 bg-slate-800 rounded w-24" /></td>
                    <td className="px-4 py-3"><div className="h-4 bg-slate-800 rounded w-20" /></td>
                  </tr>
                ))
              ) : enrollments.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-12 text-slate-500">No enrollments found</td></tr>
              ) : (
                enrollments.map(e => (
                  <tr key={e._id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img src={e.user?.profilePicture || `https://api.dicebear.com/7.x/initials/svg?seed=${e.user?.name || e.enrolledName}`}
                          alt="" className="w-7 h-7 rounded-full object-cover border border-slate-700 shrink-0" />
                        <div>
                          <div className="text-white font-semibold text-xs">{e.user?.name || e.enrolledName || '—'}</div>
                          <div className="text-slate-500 text-[10px]">{e.user?.email || e.enrolledEmail || '—'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img src={e.course?.thumbnailUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=60&q=60'}
                          alt="" className="w-8 h-8 rounded-lg object-cover border border-slate-700 shrink-0" />
                        <div>
                          <div className="text-white text-xs font-semibold line-clamp-1 max-w-[160px]">{e.course?.title || 'Course Deleted'}</div>
                          <div className="text-indigo-400 text-[10px] font-bold">${e.course?.price ?? '—'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${e.progress}%` }} />
                        </div>
                        <span className="text-slate-400 text-xs">{e.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(e.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">Page {page} of {pages}</span>
        <div className="flex gap-2">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white disabled:opacity-40 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button disabled={page === pages} onClick={() => setPage(p => p + 1)}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white disabled:opacity-40 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Panel ─────────────────────────────────────────
export default function AdminPanel() {
  const [tab, setTab] = useState<Tab>('overview');
  const [stats, setStats] = useState<Stats | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notAdmin, setNotAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchStats = async () => {
      try {
        const headers = await getAuthHeader();
        const res = await axios.get(`${API}/stats`, { headers });
        setStats(res.data);
      } catch (e: any) {
        if (e?.response?.status === 403) setNotAdmin(true);
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'users', label: 'Users', icon: <Users className="w-5 h-5" /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'enrollments', label: 'Enrollments', icon: <ShoppingCart className="w-5 h-5" /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Loading Admin Panel...</div>
      </div>
    );
  }

  if (notAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
          <Shield className="w-10 h-10 text-red-400" />
        </div>
        <h1 className="text-3xl font-black text-white uppercase">Access Denied</h1>
        <p className="text-slate-400 max-w-sm">You don't have admin privileges. Contact the system administrator.</p>
        <a href="/" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors">Go Home</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full z-50 bg-slate-900 border-r border-slate-800 w-64 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:flex`}>
        {/* Logo */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-600 p-2 rounded-xl">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-black text-white text-sm">Admin Panel</div>
              <div className="text-indigo-400 text-[10px] font-semibold uppercase tracking-wide">SikshaStack</div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                tab === item.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}>
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800">
          <a href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 font-semibold text-sm transition-all">
            <LogOut className="w-5 h-5" /> Back to Site
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-slate-900/80 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-black text-lg uppercase tracking-wide">
              {navItems.find(n => n.id === tab)?.label}
            </h1>
          </div>
          {stats && (
            <div className="hidden sm:flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-sky-400" />{stats.totalUsers} users</span>
              <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 text-violet-400" />{stats.totalCourses} courses</span>
            </div>
          )}
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {tab === 'overview' && <OverviewTab stats={stats} />}
          {tab === 'users' && <UsersTab />}
          {tab === 'courses' && <CoursesTab />}
          {tab === 'enrollments' && <EnrollmentsTab />}
        </main>
      </div>
    </div>
  );
}
