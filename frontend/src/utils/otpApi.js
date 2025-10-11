import API from "./api"; // your axios instance

// Send OTP to email or phone
export const sendOtp = async (identifier) => {
  const { data } = await API.post("/otp/send", { identifier });
  return data;
};

// Verify OTP
export const verifyOtp = async (identifier, otp) => {
  const { data } = await API.post("/otp/verify", { identifier, otp });
  return data;
};
