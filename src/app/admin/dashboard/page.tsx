"use client";
import SubjectCard from "@/components/Admin/SubjectCard";
import CreateSubjectModal from "@/components/Admin/SubjectModal";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { fetchTeacherSubjects } from "@/redux/features/subject/subjectThunk";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/utils";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";



const TeacherDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);



  const { loading,success,teacherSubjects } = useSelector(
    (state: RootState) => state.subject
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTeacherSubjects());
  }, [dispatch]);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 p-6">

        {loading?<Spinner />:
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
            {teacherSubjects && teacherSubjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subjectName={subject.title}
                topicCount={subject.topicCount}
                userCount={subject.userCount}
                subjectId={subject.id}
              />
            ))}
          </div>
          <CreateSubjectModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
       
          />
        </div>
        }
      </div>
    </>
  );
};

export default TeacherDashboard;
