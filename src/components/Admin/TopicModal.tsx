import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/utils";
import { createTopic } from "@/redux/features/topic/topicThunk";
import { useParams } from "next/navigation";
import config from "@/utils/config";
import { fetchSubjectById } from "@/redux/features/subject/subjectThunk";
import { getLearnerRankings } from "@/redux/features/completion/completionThunk";
import {
  resetSubjectError,
  resetSubjectSuccess,
} from "@/redux/features/subject/subjectSlice";

interface CreateSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

const TopicModal: React.FC<CreateSubjectModalProps> = ({ isOpen, onClose }) => {
  const { id } = useParams();
  const [topic, setTopic] = useState({
    title: "",
    description: "",
    videoUrl: "",
  });
  const subjectId = Array.isArray(id) ? id[0] : id;
  const { loading, error, success } = useSelector(
    (state: RootState) => state.topic
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetSubjectSuccess());
      dispatch(fetchSubjectById(subjectId));
      dispatch(getLearnerRankings(subjectId));
      onClose();
    } else if (error) {
      toast.error(error);
      dispatch(resetSubjectError());
    }
  }, [success, error]);

  const handleTopicChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTopic((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [upload, setUpload] = useState<boolean>(false);

  useEffect(() => {
    // Load the Cloudinary script
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    script.onload = () => {
      // Confirm that window.cloudinary is available
      if (!window.cloudinary) {
        toast.error("Failed to load Cloudinary widget");
      }
    };
    document.body.appendChild(script);

    // Clean up the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleVideoUpload = () => {
    if (window.cloudinary) {
      window.cloudinary.openUploadWidget(
        {
          cloudName: config.cloudinary.cloud_name,
          uploadPreset: config.cloudinary.upload_preset,
          sources: ["local", "url"],
          resourceType: "video",
          multiple: false,
        },
        (error: any, result: { event: string; info: { secure_url: any } }) => {
          if (result.event === "success") {
            const videoUrl = result.info.secure_url;
            setTopic((prevData) => ({
              ...prevData,
              videoUrl,
            }));
          } else if (error) {
            toast.error("Failed to upload video");
          }
        }
      );
    } else {
      toast.error("Cloudinary widget not available");
    }
    setUpload(true);
  };

  const handleSubmitSubject = async () => {
    if (topic.videoUrl && topic.title && topic.description) {
      dispatch(createTopic({ ...topic, subjectId: subjectId as string }));
      onClose();
    } else {
      toast.error("Kindly fill all fields");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[600px] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Create New Topic
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Topic Title
          </label>
          <input
            type="text"
            name="title"
            value={topic.title}
            onChange={handleTopicChange}
            className="w-full p-2 border border-gray-300 rounded-lg mb-2 text-gray-900"
            placeholder={`Enter title for topic `}
          />
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={topic.description}
            onChange={handleTopicChange}
            className="w-full p-2 border border-gray-300 rounded-lg mb-2  text-gray-900"
            placeholder={`Enter description for topic `}
          />
          <label className="block text-sm font-medium text-gray-700">
            Video File
          </label>
          <button
            type="button"
            onClick={handleVideoUpload}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg"
          >
            {upload ? "Video Uploaded" : "Upload Video"}
          </button>
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
            Create Topic
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicModal;
