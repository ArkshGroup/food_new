import ProfileEditForm, {
  ProfileEditFormProps,
} from "@/app/(marketing)/_components/profile/profile-edit-form";
import marketingService from "@/app/(marketing)/_services/index.service";
import React from "react";

const ProfileRootPage = async () => {
  const { data } = await marketingService.user.getUserProfile();

  let dobDay = "";
  let dobMonth = "";
  let dobYear = "";
  if (data?.dateOfBirth) {
    const dob =
      typeof data.dateOfBirth === "string"
        ? new Date(data.dateOfBirth)
        : data.dateOfBirth;
    if (!isNaN(dob.getTime())) {
      dobDay = dob.getDate().toString().padStart(2, "0");
      dobMonth = (dob.getMonth() + 1).toString().padStart(2, "0");
      dobYear = dob.getFullYear().toString();
    }
  }

  const payload: ProfileEditFormProps = {
    userName: data?.userName || "",
    country: data?.country?.toUpperCase() || "",
    zipCode: data?.zipCode || "",
    dobDay,
    dobMonth,
    dobYear,
    gender: data?.gender
      ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1)
      : "",
    phoneNumber: data?.phoneNumber || "",
  };
  return (
    <div className="pt-2 font-sans">
      <ProfileEditForm {...payload} />
    </div>
  );
};

export default ProfileRootPage;
