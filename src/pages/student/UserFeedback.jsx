// src/pages/student/UserFeedback.jsx
import React from "react";

const UserFeedback = () => {
  return (
    <div className="p-4 min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
        User Feedback Portal
      </h1>
      <div className="w-full h-[80vh] rounded-xl overflow-hidden border shadow-md">
        <iframe
          src="http://localhost/feedback1-LMS/user-feedback-system/index.html"
          title="User Feedback"
          className="w-full h-full border-0"
        ></iframe>
      </div>
    </div>
  );
};

export default UserFeedback;
