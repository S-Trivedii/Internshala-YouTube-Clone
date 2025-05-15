import FilterBar from "../components/FilterBar";
import VideoGrid from "../components/VideoGrid";

const Home = () => {
  return (
    <section className="flex flex-col">
      <FilterBar />
      <VideoGrid />
    </section>
  );
};

export default Home;
