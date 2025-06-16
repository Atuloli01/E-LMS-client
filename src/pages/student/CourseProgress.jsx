import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [
    completeCourse,
    { data: markCompleteData, isSuccess: completedSuccess },
  ] = useCompleteCourseMutation();
  const [
    inCompleteCourse,
    { data: markInCompleteData, isSuccess: inCompletedSuccess },
  ] = useInCompleteCourseMutation();

  useEffect(() => {
    console.log(markCompleteData);

    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData.message);
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData.message);
    }
  }, [completedSuccess, inCompletedSuccess]);

  const [currentLecture, setCurrentLecture] = useState(null);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load course details</p>;

  console.log(data);

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;

  // initialze the first lecture is not exist
  const initialLecture =
    currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };
  // Handle select a specific lecture to watch
  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };
  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Display course name  */}
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-2xl font-bold">{courseTitle}</h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>{" "}
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video section  */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          {/* <div>
              <video
                src={currentLecture?.videoUrl || initialLecture.videoUrl}
                controls
                className="w-full h-auto md:rounded-lg"
                onPlay={() =>
                  handleLectureProgress(currentLecture?._id || initialLecture._id)
                }
              />
            </div> */}

          {/* 👇 Add YouTube Embed Below the Video */}
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Video Playback : </h4>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/nisv3rsn2lQ?si=Z8S_-j2SpIEbHGMp"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </div>

          {/* Display current watching lecture title */}
          <div className="mt-2">
            <h3 className="font-medium text-lg">
              {`Lecture ${
                courseDetails.lectures.findIndex(
                  (lec) =>
                    lec._id === (currentLecture?._id || initialLecture._id)
                ) + 1
              } : ${
                currentLecture?.lectureTitle || initialLecture.lectureTitle
              }`}
            </h3>
          </div>
        </div>

        {/* Lecture Sidebar  */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
          <div className="flex-1 overflow-y-auto">
            {courseDetails?.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition transform ${
                  lecture._id === currentLecture?._id
                    ? "bg-gray-200 dark:dark:bg-gray-800"
                    : ""
                } `}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant={"outline"}
                      className="bg-green-200 text-green-600"
                    >
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {/* Notes & Feedback Section */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Notes Section */}
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
            📝 Your Notes
          </h2>
          <textarea
            className="w-full h-44 p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Write your notes here..."
            value={
              "This course is 🔥! Need to revise Lecture 3 before the quiz."
            }
            readOnly
          />
          <Button
            variant="outline"
            className="mt-4 hover:bg-blue-100 dark:hover:bg-gray-700 transition-all duration-200"
          >
            Save Notes
          </Button>
        </div>

        {/* Feedback Section */}
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
            🌟 Learner Feedback
          </h2>
          <ul className="space-y-4">
            {[
              {
                name: "👩‍💻 Atul",
                feedback:
                  "Loved the clarity of concepts! The instructor really knows their stuff.",
              },
              {
                name: "🧑‍🔧 Sandeep",
                feedback:
                  "Lecture 5 blew my mind! The real-world examples made it stick.",
              },
              {
                name: "👨‍🎓 Prabhav",
                feedback:
                  "Would love more quizzes at the end of each lecture. Still, a solid course 💯",
              },
              {
                name: "👨‍🎓 Mritunjay",
                feedback:
                  "More interactive sessions would be 🔥. Loving it so far!",
              },
            ].map((entry, i) => (
              <li key={i} className="border-b last:border-none pb-3">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>{entry.name}:</strong> {entry.feedback}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
