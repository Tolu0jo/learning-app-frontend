"use client";
import {
  resetSubjectError,
  resetSubjectSuccess,
} from "@/redux/features/subject/subjectSlice";
import {
  createSubject,
  fetchTeacherSubjects,
  updateSubject,
} from "@/redux/features/subject/subjectThunk";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface CreateSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectToEdit?: { title: string; id: string };
}

const CreateSubjectModal: React.FC<CreateSubjectModalProps> = ({
  isOpen,
  onClose,
  subjectToEdit,
}) => {
  const [subjectName, setSubjectName] = useState(subjectToEdit?.title || "");
  const router = useRouter();
  const { loading, error, success, subject } = useSelector(
    (state: RootState) => state.subject
  );

  const dispatch = useAppDispatch();
  const prevSuccess = useRef<string | null>(null);
  const prevError = useRef<string | null>(null);

  useEffect(() => {
    if (success && prevSuccess.current !== success) {
      toast.success(success);
      dispatch(resetSubjectSuccess());
      dispatch(fetchTeacherSubjects());
    }
    if (error && prevError.current !== error) {
      toast.error(error);
      dispatch(resetSubjectError());
    }
    prevSuccess.current = success;
    prevError.current = error;

    if (subject && subject.id) {
      router.push(`/admin/subject/${subject.id}`);
    }
  }, [success, error, dispatch, subject, router]);

  const handleSubmitSubject = () => {
    if (subjectToEdit) {
      dispatch(updateSubject({ title: subjectName, id: subjectToEdit.id }));
    } else {
      dispatch(createSubject({ title: subjectName }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[600px] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {subjectToEdit ? "Edit Subject " : "Create New Subject"}
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
            {loading
              ? "Loading..."
              : subjectToEdit
              ? "Edit Subject"
              : "Create Subject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSubjectModal;
