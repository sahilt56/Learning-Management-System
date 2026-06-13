import React from 'react';
import { FileText, FileVideo, FileArchive, Download, Folder } from 'lucide-react';

export default function Resources() {
  const folders: any[] = [];
  const files: any[] = [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-black uppercase mb-2">Resource Library</h1>
        <p className="font-bold text-gray-500">Download materials and study guides.</p>
      </div>

      <div>
        <h2 className="text-2xl font-black uppercase mb-4">Folders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {folders.map((folder, idx) => (
            <div key={idx} className={`${folder.color} border-4 ${folder.border} rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-4`}>
              <Folder className="w-12 h-12 fill-current opacity-80" />
              <div>
                <h3 className="font-black text-xl leading-tight">{folder.name}</h3>
                <p className="font-bold text-gray-700 text-sm">{folder.count} files</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-black uppercase mb-4">Recent Files</h2>
        <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          {files.map((file, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border-b-4 border-black last:border-b-0 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 border-2 border-black rounded-lg">
                  {file.icon}
                </div>
                <div>
                  <h4 className="font-black text-lg">{file.name}</h4>
                  <p className="font-bold text-gray-500 text-sm uppercase">{file.type} • {file.size}</p>
                </div>
              </div>
              <button className="p-3 bg-black text-white rounded-full hover:bg-blue-600 hover:scale-110 transition-all border-2 border-transparent hover:border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Download className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
