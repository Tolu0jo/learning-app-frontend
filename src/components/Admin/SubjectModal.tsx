"use client"

import React, { useState } from 'react';

interface CreateSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (subjectName: string, topics: string[]) => void;
}

const CreateSubjectModal: React.FC<CreateSubjectModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [subjectName, setSubjectName] = useState('');
  const [topics, setTopics] = useState<string[]>(['']);

  const handleAddTopic = () => {
    setTopics([...topics, '']);
  };

  const handleTopicChange = (index: number, value: string) => {
    const newTopics = [...topics];
    newTopics[index] = value;
    setTopics(newTopics);
  };

  const handleSubmit = () => {
    if (subjectName.trim() === '') {
      // Optional: Add validation for subject name
      alert('Subject name is required.');
      return;
    }
    if (topics.some(topic => topic.trim() === '')) {
      // Optional: Add validation for topics
      alert('Please enter valid topics.');
      return;
    }
    onCreate(subjectName, topics);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Subject</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Subject Name</label>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter subject name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Topics</label>
          {topics.map((topic, index) => (
            <input
              key={index}
              type="text"
              value={topic}
              onChange={(e) => handleTopicChange(index, e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              placeholder={`Enter topic ${index + 1}`}
            />
          ))}
          <button
            type="button"
            onClick={handleAddTopic}
            className="mt-2 text-blue-600 hover:underline"
          >
            Add another topic
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
            onClick={handleSubmit}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg"
          >
            Create Subject
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSubjectModal;
