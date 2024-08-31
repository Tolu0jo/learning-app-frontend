"use client";
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import { FaTimes, FaCheck,FaBackward } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';


interface Topic {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  completed: boolean;
}

const dummySubject = {
  name: 'Mathematics',
  topics: [
    { id: '1', title: 'Algebra Basics', description: 'Introduction to Algebra', videoUrl: 'https://www.example.com/video1.mp4', completed: false },
    { id: '2', title: 'Geometry Fundamentals', description: 'Understanding Shapes and Angles', videoUrl: 'https://www.example.com/video2.mp4', completed: false },
  ],
};

const SubjectDetailsPage: React.FC<{ subjectId: string }> = ({ subjectId }) => {
  const [subject, setSubject] = useState<typeof dummySubject | null>(null);
  const [currentTopicIndex, setCurrentTopicIndex] = useState<number>(0);

  useEffect(() => {
    // Fetch subject details
    setSubject(dummySubject); // Replace with API call
  }, [subjectId]);

  const handleMarkAsCompleted = () => {
    if (subject && currentTopicIndex < subject.topics.length - 1) {
      const updatedTopics = [...subject.topics];
      updatedTopics[currentTopicIndex].completed = true;
      setSubject({ ...subject, topics: updatedTopics });
      
      if (currentTopicIndex < subject.topics.length - 1) {
        setCurrentTopicIndex(currentTopicIndex + 1);
      }
    }
  };

  const handlePreviousTopic = () => {
    if (subject && currentTopicIndex > 0) {
      setCurrentTopicIndex(currentTopicIndex - 1);
    }
  };

  return (
    <>
<Header/>
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="container mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Subject Details</h1>
          <button
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            <IoMdArrowRoundBack size={20} />
          </button>
        </header>
        {subject ? (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar with completed topics */}
            <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-semibold mb-4">Completed Topics</h3>
              <ul className="space-y-2">
                {subject.topics.map(topic => (
                  <li key={topic.id} className="flex items-center space-x-2">
                    {topic.completed ? (
                      <FaCheck className="text-green-600" />
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                    <span className={`font-semibold ${topic.completed ? 'text-gray-600 line-through' : 'text-gray-800'}`}>
                      {topic.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main content */}
            <div className="lg:w-3/4">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{subject.name}</h2>
                {subject.topics.length > 0 && (
                  <div>
                    <div className="text-gray-600 mb-4">
                      <span className="font-semibold">Topic {currentTopicIndex + 1} of {subject.topics.length}</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      {subject.topics[currentTopicIndex] && (
                        <div key={subject.topics[currentTopicIndex].id}>
                          <h4 className="text-gray-900 text-lg font-semibold">{subject.topics[currentTopicIndex].title}</h4>
                          <p className="text-gray-700 mb-2">{subject.topics[currentTopicIndex].description}</p>
                          {subject.topics[currentTopicIndex].videoUrl && (
                            <div>
                              <video controls className="w-full rounded-lg">
                                <source src={subject.topics[currentTopicIndex].videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex gap-4">
                      <button
                        onClick={handlePreviousTopic}
                        disabled={currentTopicIndex === 0}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={handleMarkAsCompleted}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Mark as Completed
                      </button>
                    </div>
                  </div>
                )}
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
