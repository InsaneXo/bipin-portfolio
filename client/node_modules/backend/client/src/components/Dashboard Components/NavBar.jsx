import { useEffect, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoMdAdd, IoIosLogOut } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { BsBootstrap } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/features/userSlice";
import { apiServices } from "../../services/api_services";

const NavBar = () => {
  const { loading } = useSelector((store) => store.user);
  const { loading: projectLoading } = useSelector((store) => store.project);
  const { loading: messageLoading } = useSelector((store) => store.message);

  const location = useLocation();
  const [tab, setTab] = useState(location.pathname);
  const navigate = useNavigate();
  useEffect(() => {
    setTab(location.pathname);
  }, [location]);

  const dispatch = useDispatch();

  const logOutHandler = async () => {
    try {
      dispatch(userAction.userLogoutRequest());
      const { data } = await apiServices.logout();
      dispatch(userAction.userLogoutSuccess(data.message));
      navigate("/");
    } catch (error) {
      dispatch(userAction.userLogoutfailure(error.response.data.message));
    }
  };

  return (
    <div
      className={`bg-[#344C36] flex flex-col items-baseline gap-6 w-[280px] justify-between pl-4 py-20 border overflow-hidden max-lg:w-16 max-lg:pl-0 max-lg:items-center max-md:w-full max-md:flex-row max-md:p-0 max-md:h-20 max-md:px-3 max-md:fixed max-md:bottom-0 max-md:z-10 max-md:justify-center ${
        loading || projectLoading || messageLoading ? "hidden" : undefined
      }`}
    >
      <Link
        to={"/"}
        onClick={() => setTab("/")}
        className="flex gap-1 items-center justify-center mt-1 max-md:hidden"
      >
        <div className="flex gap-2 items-center justify-center cursor-pointer ">
          <div className="h-14 w-14 bg-[#FAAD1B] rounded-full flex items-center justify-center">
            <BsBootstrap size={35} color="#344C36" />
          </div>
          <div className="max-lg:hidden ">
            <h1 className="text-2xl text-white font-semibold max-sm:text-lg">
              Bipin Singh<span className="text-4xl text-[#FAAD1B] ">.</span>
            </h1>
            <h1 className="text-lg text-white">Admin Panel</h1>
          </div>
        </div>
      </Link>
      <div className="flex flex-col items-baseline gap-6 max-md:flex-row">
        <Link to={"/"} onClick={() => setTab("/")}>
          {tab === "/" ? (
            <div className=" flex items-center justify-center gap-4">
              <LuLayoutDashboard size={30} color="#FAAD1B" />
              <h1 className="text-lg text-[#FAAD1B] max-lg:hidden">
                Dashboard
              </h1>
            </div>
          ) : (
            <div className=" flex items-center justify-center gap-4">
              <LuLayoutDashboard size={30} color="white" />
              <h1 className="text-lg text-white max-lg:hidden">Dashboard</h1>
            </div>
          )}
        </Link>
        <Link to={"/add-project"} onClick={() => setTab("/add-project")}>
          {tab === "/add-project" ? (
            <div className=" flex items-center justify-center gap-4">
              <IoMdAdd size={30} color="#FAAD1B" />
              <h1 className="text-lg text-[#FAAD1B] max-lg:hidden">
                Add Project
              </h1>
            </div>
          ) : (
            <div className=" flex items-center justify-center gap-4">
              <IoMdAdd size={30} color="white" />
              <h1 className="text-lg text-white max-lg:hidden">Add Project</h1>
            </div>
          )}
        </Link>
        <Link to={"/account"} onClick={() => setTab("/account")}>
          {tab === "/account" ? (
            <div className="flex items-center justify-center gap-4">
              <MdAccountCircle size={30} color="#FAAD1B" />
              <h1 className="text-lg text-[#FAAD1B] max-lg:hidden">Account</h1>
            </div>
          ) : (
            <div className=" flex items-center justify-center gap-4">
              <MdAccountCircle size={30} color="white" />
              <h1 className="text-lg text-white max-lg:hidden">Account</h1>
            </div>
          )}
        </Link>
      </div>

      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={logOutHandler}
      >
        <IoIosLogOut size={30} color="white" />
        <h1 className=" font-semibold text-base text-white max-lg:hidden">
          Log Out
        </h1>
      </div>
    </div>
  );
};

export default NavBar;
