"use client";
import {
  resetSubjectError,
  resetSubjectSuccess,
} from "@/redux/features/subject/subjectSlice";
import { createSubject } from "@/redux/features/subject/subjectThunk";
import { createTopic } from "@/redux/features/topic/topicThunk";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface CreateSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

const CreateSubjectModal: React.FC<CreateSubjectModalProps> = ({
  isOpen,
  onClose,
  id,
}) => {
  const [subjectName, setSubjectName] = useState("");
  const router = useRouter();
  const { loading, error, success, subject } = useSelector(
    (state: RootState) => state.subject
  );

  const dispatch = useAppDispatch();
 console.log(subject);
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetSubjectSuccess());
    }
    if (error) {
      toast.error(error);
      dispatch(resetSubjectError());
    }
    if (subject && subject.id) {
      router.push(`/admin/subject/${subject.id}`);
    }
  }, [success, error]);

  const handleSubmitSubject = () => {
    dispatch(createSubject({ title: subjectName }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[600px] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Create New Subject
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
           Title
          </label>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 text-gray-900"
            placeholder="Enter subject title"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 bg-gray-500 text-white rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmitSubject}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg"
          >
            {loading ? "Loading..." : "Create Subject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSubjectModal;
