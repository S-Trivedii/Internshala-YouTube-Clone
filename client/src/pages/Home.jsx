import FilterBar from "../components/FilterBar";
import LoggedOutHome from "../components/LoggedOutHome";
import VideoGrid from "../components/VideoGrid";
import { useUser } from "../utils/context/UserContext";

// Home
const Home = () => {
  const { isLoggedIn } = useUser();
  return (
    <section className="flex flex-col">
      {isLoggedIn ? (
        <>
          <FilterBar />
          <VideoGrid />
        </>
      ) : (
        <>
          <LoggedOutHome />
        </>
      )}
    </section>
  );
};

export default Home;
