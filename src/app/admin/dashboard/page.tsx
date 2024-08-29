import SubjectDetailModal from '@/components/Admin/SubjectDetailsModal';
import CreateSubjectModal from '@/components/Admin/SubjectModal';
import React, { useState } from 'react';


const TeacherDashboard = () => {
  const [subjects, setSubjects] = useState([
    {
      id: '1',
      name: 'Mathematics',
      topics: 10,
      imageUrl: '/math.jpg',
      topicsDetails: [
        { id: 't1', name: 'Algebra', videoUrl: '/videos/algebra.mp4' },
        { id: 't2', name: 'Geometry', videoUrl: '/videos/geometry.mp4' },
      ],
    },
    {
      id: '2',
      name: 'Science',
      topics: 8,
      imageUrl: '/science.jpg',
      topicsDetails: [
        { id: 't3', name: 'Physics', videoUrl: '/videos/physics.mp4' },
        { id: 't4', name: 'Chemistry', videoUrl: '/videos/chemistry.mp4' },
      ],
    },
  ]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleCreateSubject = (subjectName: string, topics: string[], image: File | null) => {
    // Logic to save the subject and topics (e.g., call to an API)
    const newSubject = {
      id: (subjects.length + 1).toString(),
      name: subjectName,
      topics: topics.length,
      imageUrl: image ? URL.createObjectURL(image) : '/default.jpg',
      topicsDetails: topics.map((topic, index) => ({
        id: `t${index + 1}`,
        name: topic,
        videoUrl: '',
      })),
    };
    setSubjects([...subjects, newSubject]);
  };

  const handleSubjectClick = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create Subject
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <div key={subject.id} onClick={() => handleSubjectClick(subject.id)}>
            <SubjectCard
              subjectName={subject.name}
              topicCount={subject.topics}
              imageUrl={subject.imageUrl}
            />
          </div>
        ))}
      </div>
      <CreateSubjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateSubject}
      />
      {selectedSubjectId && (
        <SubjectDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          subjectId={selectedSubjectId}
        />
      )}
    </div>
  );
};

export default TeacherDashboard;
