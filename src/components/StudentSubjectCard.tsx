"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface SubjectCardProps {
  subjectName: string;
  topicCount: number;
  subjectId: string;
  completedTopicCount: number;
}

const StudentSubjectCard: React.FC<SubjectCardProps> = ({
  subjectName,
  topicCount,
  subjectId,
  completedTopicCount,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`subject/${subjectId}`);
  };

  // Calculate percentage of completed topics
  const completionPercentage = Math.floor(
    (completedTopicCount / topicCount) * 100
  );

  // Determine background color based on the completion percentage
  const getBackgroundColor = () => {
    if (completionPercentage === 100) return "bg-green-600";
    if (completionPercentage >= 50) return "bg-yellow-500";
    return "bg-red-600";
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
      <div className="p-6 flex flex-col gap-3">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold text-gray-800">{subjectName}</h3>
        </div>

        <p className="text-gray-600">
          {topicCount} {topicCount <= 1 ? "Topic" : "Topics"}
        </p>

        <div className="w-1/3 bg-gray-200 rounded-full h-2">
          <div
            className={`${getBackgroundColor()} h-2 rounded-full`}
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>

        <p className="text-gray-600 mt-2">
          {completionPercentage}% completed
        </p>

        <div className="flex justify-end mt-3">
          <button
            onClick={handleCardClick}
            className="py-2 px-4 bg-blue-600 text-white w-full rounded-lg hover:bg-blue-700"
          >
            {completedTopicCount == 0
              ? "Enrol"
              : completedTopicCount < topicCount
              ? "In Progress"
              : "Completed"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentSubjectCard;
