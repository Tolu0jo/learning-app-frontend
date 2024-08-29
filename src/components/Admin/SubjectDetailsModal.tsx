"use client"

import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface Topic {
  id: string;
  name: string;
  videoUrl?: string; // Added video URL
}

interface Ranking {
  user: {
    id: string;
    name: string;
  };
  completedTopicsCount: number;
}

interface SubjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectId: string;
}

const SubjectDetailModal: React.FC<SubjectDetailModalProps> = ({ isOpen, onClose, subjectId }) => {
  const [subject, setSubject] = useState<{ name: string; topics: Topic[] } | null>(null);
  const [rankings, setRankings] = useState<Ranking[]>([]);

  useEffect(() => {
    if (isOpen && subjectId) {
      // Use dummy data instead of fetching from API
      fetchSubjectDetails();
      fetchSubjectRankings();
    }
  }, [isOpen, subjectId]);

  // Dummy data for subject details
  const fetchSubjectDetails = () => {
    const dummySubject = {
      name: 'Mathematics',
      topics: [
        { id: '1', name: 'Algebra', videoUrl: 'https://www.example.com/algebra.mp4' },
        { id: '2', name: 'Calculus', videoUrl: 'https://www.example.com/calculus.mp4' },
      ],
    };
    setSubject(dummySubject);
  };

  // Dummy data for subject rankings
  const fetchSubjectRankings = () => {
    const dummyRankings = [
      { user: { id: '1', name: 'Alice' }, completedTopicsCount: 5 },
      { user: { id: '2', name: 'Bob' }, completedTopicsCount: 3 },
    ];
    setRankings(dummyRankings);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Subject Details</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <FaTimes size={20} />
          </button>
        </div>
        {subject ? (
          <>
            <h3 className="text-xl font-semibold mb-2">{subject.name}</h3>
            <div className="mb-4">
              <h4 className="text-lg font-medium">Topics</h4>
              <ul className="list-disc ml-5">
                {subject.topics.map((topic) => (
                  <li key={topic.id} className="mb-4">
                    <div className="text-lg font-medium">{topic.name}</div>
                    {topic.videoUrl && (
                      <div className="mt-2">
                        <video controls className="w-full">
                          <source src={topic.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-2">Student Rankings</h4>
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Student Name</th>
                    <th className="py-2 px-4 border-b">Completed Topics</th>
                  </tr>
                </thead>
                <tbody>
                  {rankings.map((ranking) => (
                    <tr key={ranking.user.id}>
                      <td className="py-2 px-4 border-b">{ranking.user.name}</td>
                      <td className="py-2 px-4 border-b">{ranking.completedTopicsCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SubjectDetailModal;
