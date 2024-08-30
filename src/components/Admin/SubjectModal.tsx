"use client";
import React, { useState } from 'react';

interface CreateSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (subjectName: string, topics: { title: string; description: string; videoUrl: string }[]) => void;
}

const CreateSubjectModal: React.FC<CreateSubjectModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [subjectName, setSubjectName] = useState('');
  const [topics, setTopics] = useState<{ title: string; description: string; videoUrl: string }[]>([]);

  const [isSubjectCreated, setIsSubjectCreated] = useState(false);

  const handleAddTopic = () => {
    setTopics([...topics, { title: '', description: '', videoUrl: '' }]);
  };

  const handleTopicChange = (index: number, field: 'title' | 'description' | 'videoUrl', value: string) => {
    const newTopics = [...topics];
    newTopics[index] = { ...newTopics[index], [field]: value };
    setTopics(newTopics);
  };

  const handleSubmitSubject = () => {
    // Simulate subject creation
    onCreate(subjectName, topics);
    setIsSubjectCreated(true); // Mark subject as created
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
          {isSubjectCreated ? (
            <>
              <h3 className="text-lg font-semibold mb-2">Add Topics</h3>
              {topics.map((topic, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Topic Title</label>
                  <input
                    type="text"
                    value={topic.title}
                    onChange={(e) => handleTopicChange(index, 'title', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                    placeholder={`Enter title for topic ${index + 1}`}
                  />
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={topic.description}
                    onChange={(e) => handleTopicChange(index, 'description', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                    placeholder={`Enter description for topic ${index + 1}`}
                  />
                  <label className="block text-sm font-medium text-gray-700">Video URL</label>
                  <input
                    type="text"
                    value={topic.videoUrl}
                    onChange={(e) => handleTopicChange(index, 'videoUrl', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder={`Enter video URL for topic ${index + 1}`}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddTopic}
                className="mt-2 text-blue-600 hover:underline"
              >
                Add another topic
              </button>
            </>
          ) : null}
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
            onClick={isSubjectCreated ? () => onCreate(subjectName, topics) : handleSubmitSubject}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg"
          >
            {isSubjectCreated ? 'Save Topics' : 'Create Subject'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSubjectModal;
