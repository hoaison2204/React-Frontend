import axios from "../axios";
const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  console.log("check data from service: ", data);
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/get-allcode?type=${inputType}`);
}

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/get-top-doctor-home?limit=${limit}`);
}

const getAllDoctorsService = () => {
  return axios.get(`/api/get-all-doctors`);

}

const saveDetailDoctorService = (data) => {
  return axios.post("/api/save-info-doctors", data);
}

const getDetailInfoDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
}

const saveBulkScheduleDoctor = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
}

const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

const getDoctorInfoExtraById = (doctorId) => {
  return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
}

const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}

const postPatientAppointment = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
}

const postVerifyBookAppointment = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
}

const getAllPatientForDoctor = (data) => {
  return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
}
export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailDoctorService,
  getDetailInfoDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getDoctorInfoExtraById,
  getProfileDoctorById,
  postPatientAppointment,
  postVerifyBookAppointment,
  getAllPatientForDoctor
};
