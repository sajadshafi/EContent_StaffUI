import http from "./HttpService";

const getInstituteDetails = async () => {
  try {
    const response = await http.get("get-institute", http.config());
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getDepartmentList = async () => {
  try {
    const response = await http.get("get-departments", http.config());
    return response.data;
  } catch (error) {
    throw error;
  }
};
const SaveInstitute = async (data) => {
  try {
    const response = await http.post("save-institute", data, http.config());
    return response.data;
  } catch (error) {
    throw error;
  }
};
const SaveDepartment = async (data) => {
  try {
    const response = await http.post("save-department", data, http.config());
    return response.data;
  } catch (error) {
    throw error;
  }
};
const DeleteDepartment = async (Id) => {
  try {
    const response = await http.post(
      "delete-department?id=" + Id,
      {},
      http.config()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getCourseCategoryList = async () => {
  try {
    const response = await http.get("get-course-categories", http.config());
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getCourseList = async (courseCategoryId = null) => {
  try {
    let url = "get-courses";
    if (courseCategoryId)
      url = "get-courses?courseCategoryId=" + courseCategoryId;
    const response = await http.get(url, http.config());
    return response.data;
  } catch (error) {
    throw error;
  }
};
const SaveCourse = async (data) => {
  try {
    const response = await http.post("save-course", data, http.config());
    return response.data;
  } catch (error) {
    throw error;
  }
};
const DeleteCourse = async (Id) => {
  try {
    const response = await http.post(
      "delete-course?id=" + Id,
      {},
      http.config()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getSubjectCategoryList = async () => {
  try {
    const response = await http.get("get-subject-categories", http.config());
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getSubjectList = async (
  CategoryId = "",
  DepartmentId = "",
  semesterNo = 0
) => {
  try {
    let url =
      "get-subject-by-category?CategoryId=" +
      CategoryId +
      "&DepartmentId=" +
      DepartmentId +
      "&semesterNo=" +
      semesterNo;
    const response = await http.get(url, http.config());
    return response.data;
  } catch (error) {
    throw error;
  }
};
const SaveSubject = async (data) => {
  try {
    const response = await http.post("save-subject", data, http.config());
    return response.data;
  } catch (error) {
    throw error;
  }
};
const DeleteSubject = async (Id) => {
  try {
    const response = await http.post(
      "delete-subject?id=" + Id,
      {},
      http.config()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const InstituteService = {
  getInstituteDetails,
  SaveInstitute,
  getDepartmentList,
  SaveDepartment,
  DeleteDepartment,
  getCourseList,
  SaveCourse,
  DeleteCourse,
  getSubjectCategoryList,
  getCourseCategoryList,
  getSubjectList,
  SaveSubject,
  DeleteSubject,
};
export default InstituteService;
