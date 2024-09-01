import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createSubject,
  deleteSubject,
  fetchStudentSubjects,
  fetchSubjectById,
  updateSubject,
  fetchTeacherSubjects
} from "./subjectThunk";

interface Subject {
  id: string;
  title: string;
  topics?: number;
  completedTopicCount?: number;
}

export interface SubjectWithTopic {
  id: string;
  title: string;
  topics: Topic[];
}

export interface TeacherSubject{
    id: string;
    title: string;
    userCount: number;
    topicCount: number;
  }


export interface StudentSubject{
  id: string;
  title: string;
  completedTopicCount: number;
  topicCount: number;
}
export interface Topic {
  id: string;
  title: string;
  videoUrl: string;
  description: string;
  subjectId?: string;
}

interface SubjectState {
  subject: Subject | null;
  selectedSubject: SubjectWithTopic | null;
  studentSubjects: StudentSubject[] | null;
  teacherSubjects: TeacherSubject[] | null;
  loading: boolean;
  success: string | null;
  error: string | null;
}

const initialState: SubjectState = {
  subject: null,
  studentSubjects: null,
  selectedSubject: null,
  teacherSubjects:null,
  loading: false,
  success: null,
  error: null,
};

const subjectSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    resetSubjectSuccess: (state) => {
      state.success = null;
    },
    resetSubjectError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create Subject
    builder.addCase(createSubject.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      createSubject.fulfilled,
      (state, action: PayloadAction<Subject>) => {
        state.loading = false;
        state.subject = action.payload;
        state.success = "Subject created successfully!";
      }
    );
    builder.addCase(createSubject.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch all Student Subjects
    builder.addCase(fetchStudentSubjects.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchStudentSubjects.fulfilled,
      (state, action: PayloadAction<StudentSubject[]>) => {
        state.loading = false;
        state.studentSubjects = action.payload;
      }
    );
    builder.addCase(fetchStudentSubjects.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchTeacherSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(
        fetchTeacherSubjects.fulfilled,
        (state, action: PayloadAction<TeacherSubject[]>) => {
          state.loading = false;
          state.teacherSubjects = action.payload;
        }
      );
      builder.addCase(fetchTeacherSubjects.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder.addCase(fetchSubjectById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchSubjectById.fulfilled,
      (state, action: PayloadAction<SubjectWithTopic>) => {
        state.loading = false;
        state.selectedSubject = action.payload;
      }
    );
    builder.addCase(fetchSubjectById.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateSubject.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateSubject.fulfilled,
      (state, action: PayloadAction<Subject>) => {
        state.loading = false;
        state.subject = action.payload;
        state.success = "Subject updated successfully"
      }
    );
    builder.addCase(updateSubject.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteSubject.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteSubject.fulfilled, (state, action: any) => {
      state.loading = false;
      state.success = "Delete Successfully";
    });
    builder.addCase(deleteSubject.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetSubjectSuccess, resetSubjectError } = subjectSlice.actions;
export default subjectSlice.reducer;
