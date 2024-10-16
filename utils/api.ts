import { logout } from "./auth";

const API_URL = "http://localhost:3333";

async function fetchAuth(url: string, options: any) {
  const res = await fetch(url, options);
  if (res.status == 401) {
    logout();
  }
  return res.json();
}

//danh sách kì thu
export async function getBillingCycles() {
  return fetchAuth(`${API_URL}/billing-cycle/list`, {
    method: "GET",
    credentials: "include",
  });
}

//tạo kỳ thu mới
export async function createBillingCycle(values: any) {
  return fetchAuth(`${API_URL}/billing-cycle/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    credentials: "include",
  });
}

//điểm danh
export async function createAttendance(data: any) {
  return fetchAuth(`${API_URL}/attendance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
}
//lấy chi tiết lịch học
export async function getScheduleDetail(id: number) {
  return fetchAuth(`${API_URL}/schedules/detail/${id}`, {
    method: "GET",
    credentials: "include",
  });
}

//lấy lịch học hôm nay
export async function getTodaySchedules() {
  return fetchAuth(`${API_URL}/schedules/today`, {
    method: "GET",
    credentials: "include",
  });
}

//tìm học sinh theo tên
export async function searchStudent(name: string) {
  return fetchAuth(`${API_URL}/students/search/${name}`, {
    method: "GET",
    credentials: "include",
  });
}

//lấy danh sách học sinh
export async function getListStudentByClass(classId: number) {
  return fetchAuth(`${API_URL}/students/list-by-class/${classId}`, {
    method: "GET",
    credentials: "include",
  });
}

//lấy danh sách học sinh theo lớp
export async function getListStudentByTeacher(teacherId: number) {
  return fetchAuth(`${API_URL}/students/list-by-teacher/${teacherId}`, {
    method: "GET",
    credentials: "include",
  });
}

//lấy lớp chi tiết theo id
export async function getClassDetail(classId: number) {
  return fetchAuth(`${API_URL}/class/detail/${classId}`, {
    method: "GET",
    credentials: "include",
  });
}

//tạo lịch học (nhiều lịch học)
export async function createSchedules(values: any) {
  return fetchAuth(`${API_URL}/schedules/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    credentials: "include",
  });
}

//nhập học
export async function registerStudent(values: any) {
  return fetchAuth(`${API_URL}/students/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    credentials: "include",
  });
}
//tạo giáo viên
export async function createTeacher(values: any) {
  return fetchAuth(`${API_URL}/teachers/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    credentials: "include",
  });
}
export async function loginHandler(values: any) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    credentials: "include",
  });
  return res.json();
}

export async function getUserInfo() {
  return fetchAuth(`${API_URL}/auth/profile`, {
    method: "GET",
    credentials: "include",
  });
}

export async function getListClass() {
  return fetchAuth(`${API_URL}/class/list`, {
    method: "GET",
    credentials: "include",
  });
}

export async function getListTeacher() {
  return fetchAuth(`${API_URL}/teachers/list`, {
    method: "GET",
    credentials: "include",
  });
}

export async function getListStudent() {
  return fetchAuth(`${API_URL}/students/list`, {
    method: "GET",
    credentials: "include",
  });
}

export async function registerClass(studentId: number, classId: number) {
  return fetchAuth(`${API_URL}/class/add-student`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ studentId, classId }),
    credentials: "include",
  });
}

export async function getStudentDetail(studentId: number) {
  return fetchAuth(`${API_URL}/students/detail/${studentId}`, {
    method: "GET",
    credentials: "include",
  });
}

export async function getListSubject() {
  return fetchAuth(`${API_URL}/subjects/list`, {
    method: "GET",
    credentials: "include",
  });
}

export async function createClass(values: any) {
  return fetchAuth(`${API_URL}/class/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    credentials: "include",
  });
}

export async function getSchedules(month: number, year: number) {
  return fetchAuth(`${API_URL}/schedules/list/${month}/${year}`, {
    method: "GET",
    credentials: "include",
  });
}
