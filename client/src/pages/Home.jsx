import { Plus } from "../components";
import Notes from "../components/Notes";

const Home = () => {
  return (
    <section className="flex gap-4 px-6 flex-wrap">
        <Notes />
        <Notes />
        <Notes />
        <Notes />
        <Plus />
    </section>
  );
};

export default Home;
