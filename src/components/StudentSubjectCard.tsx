"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

interface SubjectCardProps {
  subjectName: string;
  topicCount: number;
  subjectId: string;
}

const StudentSubjectCard: React.FC<SubjectCardProps> = ({
  subjectName,
  topicCount,
  subjectId,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`subject/${subjectId}`);
  };

  return (
    <div
     
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="p-6 flex flex-col gap-3">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold text-gray-800">{subjectName}</h3>
         
        </div>

        <p className="text-gray-600">
          {topicCount} {topicCount === 1 ? "Topic" : "Topics"}
        </p>

        <p className="text-gray-600">
          {topicCount} {topicCount === 1 ? " student erolled" :  " students enrolled"}
        </p>
        <div className="flex justify-end ">
          {" "}
          <button 
           onClick={handleCardClick}
          className="py-2 px-4 bg-blue-600 text-white w-full rounded-lg hover:bg-blue-700">
            Enrol
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentSubjectCard;
