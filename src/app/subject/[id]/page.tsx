"use client";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { createCompletion } from "@/redux/features/completion/completionThunk";
import { SubjectWithTopic } from "@/redux/features/subject/subjectSlice";
import { fetchSubjectById } from "@/redux/features/subject/subjectThunk";
import { getCompletedSubjectTopics } from "@/redux/features/topic/topicThunk";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/utils";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";

interface Topic {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
}

const SubjectDetailsPage: React.FC = () => {
  const { id } = useParams();
  const subjectId = Array.isArray(id) ? id[0] : id;
  const { selectedSubject } = useSelector((state: RootState) => state.subject);
  const { completedTopics } = useSelector((state: RootState) => state.topic);
  const [currentTopicIndex, setCurrentTopicIndex] = useState<number>(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (subjectId) {
      dispatch(fetchSubjectById(subjectId));
      dispatch(getCompletedSubjectTopics(subjectId));
    }
  }, [subjectId, dispatch]);

  const handleMarkAsCompleted = async (topicId: string) => {
    await dispatch(createCompletion({ topicId, subjectId }));
    dispatch(getCompletedSubjectTopics(subjectId));
    navigateToNextTopic();
  };

  const navigateToNextTopic = () => {
    const subject = selectedSubject as SubjectWithTopic;
    if (currentTopicIndex < subject.topics.length - 1) {
      setCurrentTopicIndex(currentTopicIndex + 1);
    }
  };

  const navigateToPreviousTopic = () => {
    if (currentTopicIndex > 0) {
      setCurrentTopicIndex(currentTopicIndex - 1);
    }
  };

  const isCurrentTopicCompleted = completedTopics.some(
    (completedTopic) =>
      completedTopic.id === selectedSubject?.topics[currentTopicIndex]?.id
  );

  const handleButtonClick = () => {
    if (isCurrentTopicCompleted) {
      navigateToNextTopic();
    } else {
      const subject = selectedSubject as SubjectWithTopic;
      handleMarkAsCompleted(subject.topics[currentTopicIndex].id);
      dispatch(getCompletedSubjectTopics(subjectId));
    }
  };

  const getButtonLabel = () => {
    const subject = selectedSubject as SubjectWithTopic;
    if (
      currentTopicIndex === subject.topics.length - 1 &&
      isCurrentTopicCompleted
    ) {
      return "Completed";
    }
    return isCurrentTopicCompleted ? "Next" : "Mark as Completed";
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-blue-50 p-6">
        <div className="container mx-auto">
          <header className="mb-6 flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              <IoMdArrowRoundBack size={30} />
            </button>
          </header>
          {selectedSubject ? (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar with completed topics */}
              <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-600">Topics</h3>
                <ul className="space-y-2">
                  {selectedSubject.topics.map((topic) => {
                    const isCompleted = completedTopics.some(
                      (completedTopic) => completedTopic.id === topic.id
                    );

                    return (
                      <li
                        key={topic.id}
                        className="flex items-center space-x-2"
                      >
                        {isCompleted ? (
                          <FaCheck className="text-green-600" />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                        <span
                          className={`font-semibold ${
                            isCompleted
                              ? "text-gray-600"
                              : "text-gray-800"
                          }`}
                        >
                          {topic.title}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Main content */}
              <div className="lg:w-3/4">
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {selectedSubject.title}
                  </h2>
                  {selectedSubject.topics.length > 0 && (
                    <div>
                      <div className="text-gray-600 mb-4">
                        <span className="font-semibold">
                          Topic {currentTopicIndex + 1} of{" "}
                          {selectedSubject.topics.length}
                        </span>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        {selectedSubject.topics[currentTopicIndex] && (
                          <div
                            key={selectedSubject.topics[currentTopicIndex].id}
                          >
                            <h4 className="text-gray-900 text-lg font-semibold">
                              {selectedSubject.topics[currentTopicIndex].title}
                            </h4>
                            <p className="text-gray-700 mb-2">
                              {
                                selectedSubject.topics[currentTopicIndex]
                                  .description
                              }
                            </p>
                            {selectedSubject.topics[currentTopicIndex]
                              .videoUrl && (
                              <div>
                                <video controls className="w-full rounded-lg">
                                  <source
                                    src={
                                      selectedSubject.topics[currentTopicIndex]
                                        .videoUrl
                                    }
                                    type="video/mp4"
                                  />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="mt-4 flex gap-4">
                        <button
                          onClick={navigateToPreviousTopic}
                          disabled={currentTopicIndex === 0}
                          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <button
                          onClick={handleButtonClick}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                          {getButtonLabel()}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </>
  );
};

export default SubjectDetailsPage;
