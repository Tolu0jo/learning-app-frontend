import { combineReducers } from "redux";
import authReducer from "../features/auth/authSlice";
import topicReducer from "../features/topic/topicSlice";
import subjectReducer from "../features/subject/subjectSlice";
import completionReducer from "../features/completion/completionSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  topic: topicReducer,
  subject: subjectReducer,
  completion: completionReducer
});

export default rootReducer;
