"use client";
import TopicModal from "@/components/Admin/TopicModal";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { getLearnerRankings } from "@/redux/features/completion/completionThunk";
import { getSubjectApi } from "@/redux/features/subject/subjectApi";
import { fetchSubjectById } from "@/redux/features/subject/subjectThunk";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/utils";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";

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
  name: "Mathematics",
  topics: [
    {
      id: "1",
      title: "Algebra Basics",
      description: "Introduction to Algebra",
      videoUrl: "https://www.example.com/video1.mp4",
    },
    {
      id: "2",
      title: "Geometry Fundamentals",
      description: "Understanding Shapes and Angles",
      videoUrl: "https://www.example.com/video2.mp4",
    },
  ],
};

const dummyRankings = [
  {
    user: { id: "1", name: "John Doe" },
    completedTopicsCount: 5,
    totalTopics: 10,
  },
  {
    user: { id: "2", name: "Jane Smith" },
    completedTopicsCount: 3,
    totalTopics: 10,
  },
];

const SubjectDetailsPage = () => {
  const { id } = useParams();
  const subjectId = Array.isArray(id) ? id[0] : id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState<typeof dummySubject | null>(null);
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const dispatch = useAppDispatch();
  const { selectedSubject } = useSelector((state: RootState) => state.subject);
  const { rankings: studentRanking } = useSelector(
    (state: RootState) => state.completion
  );
  console.log(selectedSubject);
  console.log(studentRanking);
  useEffect(() => {
    if (subjectId) {
      dispatch(fetchSubjectById(subjectId));
      dispatch(getLearnerRankings(subjectId));
      setSubject(dummySubject); // Replace with API call
      setRankings(dummyRankings);
    } // Replace with API call
  }, [subjectId, dispatch]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-blue-50 p-6">
        <div className="container mx-auto">
          <header className="mb-6 flex  items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              <IoMdArrowRoundBack size={20} />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Topic
            </button>
          </header>
          {selectedSubject ? (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-2/3">
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {selectedSubject.title}
                  </h2>
                  <h3 className="text-xl font-semibold mb-2">Topics</h3>
                  <div className="space-y-4">
                    {selectedSubject.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className="bg-gray-50 p-4 rounded-lg shadow-sm"
                      >
                        <h4 className="text-xl font-semibold  text-gray-800">
                          {topic.title}
                        </h4>
                        <p className="text-gray-700 mb-2">
                          {topic.description}
                        </p>
                        {topic.videoUrl && (
                          <div>
                            <video
                              controls
                              preload="auto"
                              className="w-full rounded-lg"
                            >
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
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    Student Rankings
                  </h3>
                  {studentRanking && studentRanking.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-200">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border-b text-left text-gray-800">
                            Student Name
                          </th>
                          <th className="py-2 px-4 border-b text-left text-gray-800">
                            Completed/Total Topics
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentRanking.map((ranking) => (
                          <tr key={ranking.name}>
                            <td className="py-2 px-4 border-b text-gray-700">
                              {ranking.name}
                            </td>
                            <td className="py-2 px-4 border-b text-gray-500">
                              {ranking.completedTopics} /{" "}
                              {ranking.totalTopics}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-gray-600 text-lg">
                      No students have enrolled in this subject yet
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Spinner />
          )}
        </div>
        <TopicModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
};

export default SubjectDetailsPage;
