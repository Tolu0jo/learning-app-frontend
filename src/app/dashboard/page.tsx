"use client";
import SubjectCard from "@/components/Admin/SubjectCard";
import CreateSubjectModal from "@/components/Admin/SubjectModal";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import StudentSubjectCard from "@/components/StudentSubjectCard";
import { fetchStudentSubjects } from "@/redux/features/subject/subjectThunk";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/utils";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const dummySubjects = [
  { id: "1", name: "Mathematics", topicCount: 5 },
  { id: "2", name: "Science", topicCount: 8 },
  { id: "3", name: "History", topicCount: 3 },
];

const TeacherDashboard: React.FC = () => {
  const { loading, success, studentSubjects } = useSelector(
    (state: RootState) => state.subject
  );

  const { user } = useSelector((state: RootState) => state.auth);


  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStudentSubjects());
  }, [dispatch]);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 p-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Student's Dashboard
            </h1>
          </div>
        {studentSubjects?<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentSubjects &&
            studentSubjects.map((subject) => (
              <StudentSubjectCard
                key={subject.id}
                subjectId={subject.id}
                subjectName={subject.title}
                topicCount={subject.topicCount}
                completedTopicCount={subject.completedTopicCount}
              />
            ))}
        </div>:
        <Spinner/>
        }
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
