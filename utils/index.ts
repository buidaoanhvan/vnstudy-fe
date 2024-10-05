// gom lại export
import {
  loginHandler,
  getUserInfo,
  getStudentDetail,
  getListClass,
  getListTeacher,
  getListSubject,
  createClass,
  getSchedules,
  createTeacher,
  registerStudent,
  getClassDetail,
  searchStudent,
  getListStudent,
} from "./api";
import { checkAuth, logout } from "./auth";

export {
  loginHandler,
  getUserInfo,
  checkAuth,
  logout,
  getStudentDetail,
  getListClass,
  getListTeacher,
  getListSubject,
  createClass,
  getSchedules,
  createTeacher,
  registerStudent,
  getClassDetail,
  searchStudent,
  getListStudent,
};
