import { useDispatch, useSelector } from "react-redux";
import Account from "./components/Dashboard Components/Account";
import AddProject from "./components/Dashboard Components/AddProject";
import Dashboard from "./components/Dashboard Components/Dashboard";
import NavBar from "./components/Dashboard Components/NavBar";
import Main from "./components/Home Components/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { projectAction, userAction } from "./redux/features/userSlice";
import { apiServices } from "./services/api_services";
import Loading from "./components/Dashboard Components/Loading";
import PageNotFound from "./components/Dashboard Components/PageNotFound";

export default function App() {
  const dispatch = useDispatch();
  const { isAutheticated, loading } = useSelector((store) => store.user);
  const { loading: projectLoading } = useSelector((store) => store.project);
  const { loading: messageLoading } = useSelector((store) => store.message);

  const loadUser = async () => {
    try {
      dispatch(userAction.loadUserRequest());
      const { data } = await apiServices.loadUser();
      dispatch(userAction.loadUserSuccess(data.user));
    } catch (error) {
      dispatch(userAction.loadUserFailure(error.response.data.message));
    }
  };

  const showAllProject = async () => {
    try {
      dispatch(projectAction.showProjectRequest());
      const { data } = await apiServices.showProject();
      dispatch(projectAction.showProjectSuccess(data.project));
    } catch (error) {
      dispatch(projectAction.showProjectfailure(error.response.data.message));
    }
  };

  useEffect(() => {
    loadUser();
  }, [isAutheticated]);

  useEffect(() => {
    showAllProject();
  }, [loading]);

  return (
    <div className={isAutheticated ? "h-screen w-full flex " : undefined}>
      <Router>
        {isAutheticated && <NavBar />}
        <Routes>
          <Route path="/" element={isAutheticated ? <Dashboard /> : <Main />} />
          <Route
            path="/add-project"
            element={isAutheticated ? <AddProject /> : <Main />}
          />
          <Route
            path="/account"
            element={isAutheticated ? <Account /> : <Main />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}
