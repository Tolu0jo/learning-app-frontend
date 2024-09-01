"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CreateSubjectModal from "./SubjectModal";
import ConfirmationModal from "../ConfirmationModal";
import { useAppDispatch } from "@/redux/utils";
import { deleteSubject } from "@/redux/features/subject/subjectThunk";

interface SubjectCardProps {
  subjectName: string;
  topicCount: number;
  subjectId: string;
  userCount: number;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  subjectName,
  topicCount,
  subjectId,
  userCount,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleDeleteSubject = () => {
    dispatch(deleteSubject(subjectId));
    setIsOpen(false);
  };

  const handleCardClick = () => {
    router.push(`subject/${subjectId}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
      <div className="p-6 flex flex-col gap-3">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold text-gray-800">{subjectName}</h3>
          <div className="flex gap-5">
            <button
              className="text-blue-600 hover:text-blue-700"
              onClick={() => setIsModalOpen(true)}
            >
              <FaEdit size={20} />
            </button>
            <button
              className="text-red-600 hover:text-red-700"
              onClick={() => setIsOpen(true)}
            >
              {" "}
              <FaTrashAlt size={20} />
            </button>
          </div>
        </div>

        <p className="text-gray-600">
          {topicCount} {topicCount === 1 ? "Topic" : "Topics"}
        </p>

        <p className="text-gray-600">
          {userCount}{" "}
          {userCount === 1 ? " student erolled" : " students enrolled"}
        </p>
        <div className="flex justify-end ">
          {" "}
          <button
            onClick={handleCardClick}
            className="py-2 px-4 bg-blue-600 text-white w-full rounded-lg hover:bg-blue-700"
          >
            View
          </button>
          <CreateSubjectModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            subjectToEdit={{ title: subjectName, id: subjectId }}
          />
          <ConfirmationModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onConfirm={handleDeleteSubject}
            subjectName={subjectName}
          />
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
