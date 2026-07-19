export type SubmissionStatus =
  | "submitted"
  | "under_review"
  | "changes_requested"
  | "approved"
  | "rejected";

export interface CourseReviewSubmission {
  id: string;
  type?: "course";
  courseCode: string;
  courseName: string;
  department: string;
  semester: string;
  year: number;
  professor: string;
  credits: number;
  difficulty: number; // 1-5
  workloadHoursPerWeek: number;
  attendancePolicy: string;
  gradingBreakdown: string;
  summary: string;
  tags: string[]; // e.g. ["coding-heavy", "math-heavy"]
  reviewerName: string;
  reviewerBatch: string;
  reviewerEmail: string;
  status: SubmissionStatus;
  adminComment?: string;
  submittedAt: string;
}

export interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  department: string;
  credits: number;
  reviews: CourseReviewSubmission[];
}

export interface ExperienceSubmission {
  id: string;
  type: "experience";
  companyName: string;
  role: string;
  experienceType: string;
  stipendOrCtc?: string;
  difficulty: number; // 1-5
  selectionProcess: string;
  summary: string;
  takeaways?: string;
  reviewerName: string;
  reviewerBatch: string;
  reviewerEmail: string;
  status: SubmissionStatus;
  adminComment?: string;
  submittedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: "coordinator" | "mentor";
  year: string;
  branch: string;
  interests: string[];
  email: string;
  whatsapp?: string;
  photoUrl: string;
}