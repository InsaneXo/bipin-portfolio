import {
  Button,
  Dialog,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoPencil } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { FaCamera } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { userAction } from "../../redux/features/userSlice";
import { apiServices } from "../../services/api_services";
import Loading from "./Loading";

const Account = () => {
  const { loading } = useSelector((store) => store.user);
  const { profile } = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [bio, setBio] = useState("");
  const [formData, setFormData] = useState({
    address: {
      country: "",
      pincode: "",
      state: "",
      city: "",
    },
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();

    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNo: phoneNo,
        bio: bio,
        address: formData.address,
        avatar: image,
      };

      dispatch(userAction.userUpdateRequest());
      const { data } = await apiServices.updateProfile(payload);
      dispatch(userAction.userUpdateSuccess(data.message));
      setOpen(!open);

      dispatch(userAction.loadUserRequest());
      const { data: loaduser } = await apiServices.loadUser();
      dispatch(userAction.loadUserSuccess(loaduser.user));
    } catch (error) {
      dispatch(userAction.userUpdateFailure(error.response.data.message));
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className=" flex-1  overflow-auto p-6 max-md:p-0 max-md:mb-20">
      {profile && (
        <div className="  w-full h-full rounded-xl p-3 overflow-auto max-md:rounded-none">
          <h1 className="text-slate-900 text-2xl font-medium flex items-center my-3">
            <span>
              <CgProfile />
            </span>{" "}
            My Profile
          </h1>
          <div className="w-full flex justify-between items-center border p-3 rounded-xl max-sm:flex-col max-sm:gap-2 ">
            <div className="flex gap-2 items-center max-sm:flex-col max-sm:text-center">
              <div className="w-20 h-20 bg-slate-600 rounded-full flex items-center justify-center overflow-hidden">
                {profile.avatar.url ? (
                  <img
                    src={profile.avatar.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaRegUser color="white" size={30} />
                )}
              </div>
              <div>
                <h1 className="font-semibold">{`${profile.firstName} ${profile.lastName}`}</h1>
                <p>{profile.bio}</p>
                <p>🇮🇳 {profile.address.country}</p>
              </div>
            </div>
            <Button variant="contained" onClick={() => setOpen(!open)}>
              <IoPencil className="mr-1" />
              Edit
            </Button>
          </div>
          <div className="w-full  border p-6 rounded-xl my-5">
            <div className="w-full flex items-center justify-between mb-3 max-sm:flex-col max-sm:gap-2">
              <Typography variant="h6">Personal Information</Typography>
            </div>
            <div className="flex max-sm:flex-col max-sm:gap-4">
              <div className="flex-1 ">
                <div>
                  <h1 className="font-semibold">First Name</h1>
                  <p>{profile.firstName}</p>
                </div>
                <div>
                  <h1 className="font-semibold">Email Address</h1>
                  <p>{profile.email}</p>
                </div>
                <div>
                  <h1 className="font-semibold">Bio</h1>
                  <p>{profile.bio}</p>
                </div>
              </div>
              <div className="flex-1">
                <div>
                  <h1 className="font-semibold">Last Name</h1>
                  <p>{profile.lastName}</p>
                </div>
                <div>
                  <h1 className="font-semibold">Phone No.</h1>
                  <p>{profile.phoneNo}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full justify-between items-center border p-6 rounded-xl">
            <div className="w-full flex items-center justify-between mb-3 max-sm:flex-col max-sm:gap-2">
              <Typography variant="h6">Address Information</Typography>
            </div>
            <div className="flex max-sm:flex-col max-sm:gap-4">
              <div className="flex-1">
                <div>
                  <h1 className="font-semibold">Country</h1>
                  <p>{profile.address.country}</p>
                </div>
                <div>
                  <h1 className="font-semibold">Pin Code</h1>
                  <p>{profile.address.pincode}</p>
                </div>
              </div>
              <div className="flex-1">
                <div>
                  <h1 className="font-semibold">City/State</h1>
                  <p>{`${profile.address.city}/${profile.address.state}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="responsive-dialog-title"
      >
        {profile && (
          <div className="h-[600px] p-5 flex flex-col justify-between">
            <div className="h-40 w-40 rounded-full relative mx-auto">
              <div className="h-40 w-40 rounded-full bg-slate-800 flex items-center justify-center  overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={profile.avatar.url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <label
                htmlFor="image-upload"
                className="h-14 w-14 rounded-full border-4 border-white bg-[#344C36] absolute right-2 -bottom-2 flex items-center justify-center cursor-pointer z-10"
              >
                <FaCamera color="white" size={20} />
              </label>
            </div>

            <form onSubmit={updateProfileHandler}>
              <div className="mb-2">
                <h1 className="font-semibold text-lg">First Name</h1>
                <input
                  type="text"
                  className="w-full border h-12 rounded-lg p-2 outline-none"
                  placeholder={profile.firstName}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <h1 className="font-semibold text-lg">Last Name</h1>
                <input
                  type="text"
                  className="w-full border h-12 rounded-lg p-2 outline-none"
                  placeholder={profile.lastName}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <h1 className="font-semibold text-lg">Email</h1>
                <input
                  type="text"
                  className="w-full border h-12 rounded-lg p-2 outline-none"
                  placeholder={profile.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <h1 className="font-semibold text-lg">Phone No.</h1>
                <input
                  type="text"
                  className="w-full border h-12 rounded-lg p-2 outline-none"
                  placeholder={profile.phoneNo}
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <h1 className="font-semibold text-lg">Bio</h1>
                <input
                  type="text"
                  className="w-full border h-12 rounded-lg p-2 outline-none"
                  placeholder={profile.bio}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <h1 className="font-semibold text-lg">Country</h1>
                <input
                  type="text"
                  className="w-full border h-12 rounded-lg p-2 outline-none"
                  name="country"
                  placeholder={profile.address.country}
                  value={formData.address.country}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="mb-2">
                <h1 className="font-semibold text-lg">Pincode</h1>
                <input
                  type="text"
                  className="w-full border h-12 rounded-lg p-2 outline-none"
                  name="pincode"
                  placeholder={profile.address.pincode}
                  value={formData.address.pincode}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="mb-2">
                <h1 className="font-semibold text-lg">State</h1>
                <input
                  type="text"
                  className="w-full border h-12 rounded-lg p-2 outline-none"
                  name="state"
                  placeholder={profile.address.state}
                  value={formData.address.state}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="mb-2">
                <h1 className="font-semibold text-lg">City</h1>
                <input
                  type="text"
                  className="w-full border h-12 rounded-lg p-2 outline-none"
                  placeholder={profile.address.city}
                  name="city"
                  value={formData.address.city}
                  onChange={handleAddressChange}
                />
              </div>
              <input
                type="file"
                className="hidden"
                id="image-upload"
                onChange={handleImageChange}
              />
              <div className="flex mb-2">
                <div
                  className="flex-1 border py-3 cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  <h1 className="text-center">Cancel</h1>
                </div>
                <button
                  type="submit"
                  className="flex-1"
                  disabled={
                    !firstName &&
                    !lastName &&
                    !image &&
                    !email &&
                    !phoneNo &&
                    !Object.values(formData.address).some((value) => value)
                  }
                >
                  <div
                    className={`py-3 cursor-pointer ${
                      firstName ||
                      lastName ||
                      image ||
                      email ||
                      phoneNo ||
                      Object.values(formData.address).some((value) => value)
                        ? "bg-[#344C36] hover:bg-[#2a3e2c] transition-colors"
                        : "bg-[#5b805e] cursor-not-allowed"
                    }`}
                  >
                    <h1 className="text-white text-center">Update</h1>
                  </div>
                </button>
              </div>
            </form>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default Account;
