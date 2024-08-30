"use client";
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import { FaBackward } from 'react-icons/fa';

interface Topic {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
}

interface Ranking {
  user: {
    id: string;
    name: string;
  };
  completedTopicsCount: number;
  totalTopics: number; // Added total topics for ranking
}

const dummySubject = {
  name: 'Mathematics',
  topics: [
    { id: '1', title: 'Algebra Basics', description: 'Introduction to Algebra', videoUrl: 'https://www.example.com/video1.mp4' },
    { id: '2', title: 'Geometry Fundamentals', description: 'Understanding Shapes and Angles', videoUrl: 'https://www.example.com/video2.mp4' },
  ],
};

const dummyRankings = [
  { user: { id: '1', name: 'John Doe' }, completedTopicsCount: 5, totalTopics: 10 },
  { user: { id: '2', name: 'Jane Smith' }, completedTopicsCount: 3, totalTopics: 10 },
];

const SubjectDetailsPage: React.FC<{ subjectId: string }> = ({ subjectId }) => {
  const [subject, setSubject] = useState<typeof dummySubject | null>(null);
  const [rankings, setRankings] = useState<Ranking[]>([]);

  useEffect(() => {
    // Fetch subject details and rankings
    setSubject(dummySubject); // Replace with API call
    setRankings(dummyRankings); // Replace with API call
  }, [subjectId]);

  return (
    <>
<Header/>
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="container mx-auto">
        <header className="mb-6 flex flex-col items-center justify-between">
        <button
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            <FaBackward size={20} />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Subject Details</h1>
     
        </header>
        {subject ? (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{subject.name}</h2>
                <h3 className="text-xl font-semibold mb-2">Topics</h3>
                <div className="space-y-4">
                  {subject.topics.map((topic) => (
                    <div key={topic.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <h4 className="text-lg font-semibold">{topic.title}</h4>
                      <p className="text-gray-700 mb-2">{topic.description}</p>
                      {topic.videoUrl && (
                        <div>
                          <video controls className="w-full rounded-lg">
                            <source src={topic.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Student Rankings</h3>
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left text-gray-800">Student Name</th>
                      <th className="py-2 px-4 border-b text-left text-gray-800">Completed/Total Topics</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankings.map((ranking) => (
                      <tr key={ranking.user.id}>
                        <td className="py-2 px-4 border-b text-gray-700">{ranking.user.name}</td>
                        <td className="py-2 px-4 border-b text-gray-500">
                          {ranking.completedTopicsCount} / {ranking.totalTopics}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
    </>
  );
};

export default SubjectDetailsPage;
