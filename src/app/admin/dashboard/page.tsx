"use client";
import SubjectCard from "@/components/Admin/SubjectCard";
import CreateSubjectModal from "@/components/Admin/SubjectModal";
import Header from "@/components/Header";
import React, { useState } from "react";

const dummySubjects = [
  { id: "1", name: "Mathematics", topicCount: 5 },
  { id: "2", name: "Science", topicCount: 8 },
  { id: "3", name: "History", topicCount: 3 },
];

const TeacherDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateSubject = (
    subjectName: string,
    topics: { title: string; description: string; videoUrl: string }[]
  ) => {
    console.log("Subject Name:", subjectName);
    console.log("Topics:", topics);

    // Add your logic to handle subject creation
  };

  return (
    <>
    <Header/>
  
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Teacher Dashboard
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Subject
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummySubjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subjectName={subject.name}
              topicCount={subject.topicCount}
              subjectId={subject.id}
            />
          ))}
        </div>
        <CreateSubjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateSubject}
        />
      </div>
    </div>
    </>
  );
};

export default TeacherDashboard;
