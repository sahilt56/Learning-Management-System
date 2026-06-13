import React, { useState } from 'react';
import { Plus, UploadCloud, CheckCircle2, Loader2, BookOpen, Clock, Tag, Edit2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

export default function CourseManager() {
  const { token } = useAuth();
  const [isPublished, setIsPublished] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  
  // Courses State
  const [courses, setCourses] = useState<any[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [editCourseId, setEditCourseId] = useState<string | null>(null);

  React.useEffect(() => {
    fetchCourses();
  }, [token]);

  const fetchCourses = async () => {
    if (!token) return;
    try {
      setLoadingCourses(true);
      const res = await axios.get('http://localhost:5000/api/instructor/courses', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(res.data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } finally {
      setLoadingCourses(false);
    }
  };
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [category, setCategory] = useState('Development');
  const [level, setLevel] = useState('Beginner to Pro');
  const [duration, setDuration] = useState('32 Weeks');
  const [badge, setBadge] = useState('New');
  const [batchStartDate, setBatchStartDate] = useState('');
  const [teacherNames, setTeacherNames] = useState<string[]>(['']);
  const [whatYouWillLearn, setWhatYouWillLearn] = useState<string[]>(['']);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [teacherPhoto, setTeacherPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [teacherPreviewUrl, setTeacherPreviewUrl] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState<number>(Date.now());

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setOriginalPrice('');
    setCategory('Development');
    setLevel('Beginner to Pro');
    setDuration('32 Weeks');
    setBadge('New');
    setBatchStartDate('');
    setTeacherNames(['']);
    setWhatYouWillLearn(['']);
    setCoverImage(null);
    setTeacherPhoto(null);
    setPreviewUrl(null);
    setTeacherPreviewUrl(null);
    setEditCourseId(null);
    setFileInputKey(Date.now());
  };

  const handleEditClick = (course: any) => {
    setEditCourseId(course._id);
    setTitle(course.title || '');
    setDescription(course.description || '');
    setPrice(course.price?.toString() || '');
    setOriginalPrice(course.originalPrice?.toString() || '');
    setCategory(course.category || 'Development');
    setLevel(course.level || 'Beginner to Pro');
    setDuration(course.duration || '32 Weeks');
    setBadge(course.badge || '');
    setBatchStartDate(course.batchStartDate ? new Date(course.batchStartDate).toISOString().split('T')[0] : '');
    setTeacherNames(course.teacherNames && course.teacherNames.length > 0 ? course.teacherNames : ['']);
    setWhatYouWillLearn(course.whatYouWillLearn && course.whatYouWillLearn.length > 0 ? course.whatYouWillLearn : ['']);
    setPreviewUrl(course.thumbnailUrl || null);
    setTeacherPreviewUrl(course.customTeacherPhoto || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>, previewSetter: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setter(file);
      previewSetter(URL.createObjectURL(file));
    }
  };

  const handleAddTeacher = () => {
    setTeacherNames([...teacherNames, '']);
  };

  const handleRemoveTeacher = (index: number) => {
    const newNames = [...teacherNames];
    newNames.splice(index, 1);
    setTeacherNames(newNames);
  };

  const handleTeacherNameChange = (index: number, value: string) => {
    const newNames = [...teacherNames];
    newNames[index] = value;
    setTeacherNames(newNames);
  };

  const handleAddLearningPoint = () => {
    setWhatYouWillLearn([...whatYouWillLearn, '']);
  };

  const handleRemoveLearningPoint = (index: number) => {
    const newPoints = [...whatYouWillLearn];
    newPoints.splice(index, 1);
    setWhatYouWillLearn(newPoints);
  };

  const handleLearningPointChange = (index: number, value: string) => {
    const newPoints = [...whatYouWillLearn];
    newPoints[index] = value;
    setWhatYouWillLearn(newPoints);
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return alert('Please log in first');
    if (!editCourseId && !teacherPhoto && !teacherPreviewUrl) return alert('Teacher photo is required');

    try {
      setIsPublishing(true);
      
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('originalPrice', originalPrice);
      formData.append('category', category);
      formData.append('level', level);
      formData.append('duration', duration);
      formData.append('badge', badge);
      if (batchStartDate) {
        formData.append('batchStartDate', batchStartDate);
      }
      
      const filledTeacherNames = teacherNames.filter(name => name.trim() !== '');
      if (filledTeacherNames.length > 0) {
        formData.append('teacherNames', JSON.stringify(filledTeacherNames));
      } else {
        return alert('At least one teacher name is required');
      }

      const filledLearningPoints = whatYouWillLearn.filter(point => point.trim() !== '');
      if (filledLearningPoints.length > 0) {
        formData.append('whatYouWillLearn', JSON.stringify(filledLearningPoints));
      }

      if (coverImage) {
        formData.append('coverImage', coverImage);
      }
      if (teacherPhoto) {
        formData.append('teacherPhoto', teacherPhoto);
      }

      if (editCourseId) {
        await axios.put(`http://localhost:5000/api/instructor/courses/${editCourseId}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.post('http://localhost:5000/api/instructor/courses', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      setIsPublished(true);
      resetForm();
      
      fetchCourses();

      setTimeout(() => setIsPublished(false), 3000);
    } catch (error) {
      console.error("Failed to publish course", error);
      alert("Failed to publish course. Have you set up your Cloudinary Keys in the backend .env?");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Course Manager</h1>
          <p className="text-sm text-slate-500 mt-1">Create and launch new courses to the home screen.</p>
        </div>
      </div>

      {/* Course Creator Form */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
        
        {isPublished && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
            <h2 className="text-xl font-semibold text-slate-900">{editCourseId ? 'Course Updated Successfully!' : 'Course Published Successfully!'}</h2>
            <p className="text-sm text-slate-500 mt-2">It is now visible on the main home screen.</p>
          </div>
        )}

        <h2 className="text-lg font-medium text-slate-900 mb-6 border-b border-gray-100 pb-4">
          {editCourseId ? 'Edit Course Details' : 'Launch a New Course'}
        </h2>
        
        <form onSubmit={handlePublish} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Course Title</label>
            <input 
              required
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Master React in 30 Days"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Course Description</label>
            <textarea 
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe what students will learn..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Price ($)</label>
              <input 
                required
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="49.99"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Original Price ($)</label>
              <input 
                required
                type="number" 
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="99.99"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm bg-white"
              >
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Marketing">Marketing</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Level</label>
              <select 
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm bg-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Beginner to Pro">Beginner to Pro</option>
                <option value="All Levels">All Levels</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Batch Start Date</label>
              <input 
                type="date" 
                value={batchStartDate}
                onChange={(e) => setBatchStartDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Duration</label>
              <input 
                required
                type="text" 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 12 Weeks"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Badge</label>
              <select 
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm bg-white"
              >
                <option value="">None</option>
                <option value="New">New</option>
                <option value="Bestseller">Bestseller</option>
                <option value="Trending">Trending</option>
                <option value="Updated">Updated</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Cover Image</label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-blue-300 transition-colors cursor-pointer overflow-hidden group h-40">
                <input 
                  key={`cover-${fileInputKey}`}
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setCoverImage, setPreviewUrl)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                {previewUrl ? (
                  <>
                    <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                    <div className="z-10 bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm">Change Image</div>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-8 h-8 mb-2" />
                    <p className="text-sm font-medium text-center">Upload cover</p>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Teacher Photo {!editCourseId && <span className="text-red-500">*</span>}</label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-blue-300 transition-colors cursor-pointer overflow-hidden group h-40">
                <input 
                  key={`teacher-${fileInputKey}`}
                  type="file" 
                  accept="image/*"
                  required={!editCourseId && !teacherPreviewUrl}
                  onChange={(e) => handleImageChange(e, setTeacherPhoto, setTeacherPreviewUrl)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                {teacherPreviewUrl ? (
                  <>
                    <img src={teacherPreviewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                    <div className="z-10 bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm text-center">Change Photo</div>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-8 h-8 mb-2" />
                    <p className="text-sm font-medium text-center">Upload teacher photo</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">Teacher Names <span className="text-red-500">*</span></label>
              <button type="button" onClick={handleAddTeacher} className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add Teacher
              </button>
            </div>
            {teacherNames.map((name, index) => (
              <div key={index} className="flex gap-4 items-center">
                <input 
                  required
                  type="text" 
                  value={name}
                  onChange={(e) => handleTeacherNameChange(index, e.target.value)}
                  placeholder="Enter teacher's name"
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm"
                />
                {teacherNames.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => handleRemoveTeacher(index)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">What You'll Learn</label>
              <button type="button" onClick={handleAddLearningPoint} className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add Point
              </button>
            </div>
            {whatYouWillLearn.map((point, index) => (
              <div key={index} className="flex gap-4 items-center">
                <input 
                  type="text" 
                  value={point}
                  onChange={(e) => handleLearningPointChange(index, e.target.value)}
                  placeholder="e.g. Build production-ready applications"
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm"
                />
                {whatYouWillLearn.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => handleRemoveLearningPoint(index)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="pt-6 flex justify-end gap-3">
            {editCourseId && (
              <button 
                type="button"
                onClick={resetForm}
                className="bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-slate-700 px-6 py-2.5 rounded-lg font-medium text-sm transition-colors"
              >
                Cancel Edit
              </button>
            )}
            <button 
              type="submit"
              disabled={isPublishing}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
            >
              {isPublishing ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> {editCourseId ? 'Updating...' : 'Publishing...'}</>
              ) : (
                <><Plus className="w-4 h-4" /> {editCourseId ? 'Update Course' : 'Publish Course'}</>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Courses List Section */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm mt-8">
        <h2 className="text-lg font-medium text-slate-900 mb-6 border-b border-gray-100 pb-4 flex items-center justify-between">
          <span>My Launched Courses</span>
          <span className="bg-blue-100 text-blue-700 text-sm py-1 px-3 rounded-full font-semibold">{courses.length} Courses</span>
        </h2>
        
        {loadingCourses ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-8 text-slate-500 font-medium">
            You haven't launched any courses yet. Use the form above to get started!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div key={course._id} className="border border-gray-200 rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-shadow bg-white">
                {course.thumbnailUrl ? (
                  <img src={course.thumbnailUrl} alt={course.title} className="h-40 w-full object-cover" />
                ) : (
                  <div className={`h-40 w-full flex items-center justify-center ${course.bg || 'bg-blue-100'}`}>
                    <BookOpen className="w-12 h-12 text-blue-500 opacity-50" />
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{course.title}</h3>
                    <span className="font-black text-emerald-600">${course.price}</span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{course.description}</p>
                  
                  {course.batchStartDate && (
                    <div className="mb-4 text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded inline-block self-start">
                      Starts: {new Date(course.batchStartDate).toLocaleDateString()}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                      <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" /> {course.category}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                    </div>
                    <button 
                      onClick={() => handleEditClick(course)}
                      className="text-blue-600 hover:text-blue-800 p-1.5 rounded-md hover:bg-blue-50 transition-colors"
                      title="Edit Course"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
