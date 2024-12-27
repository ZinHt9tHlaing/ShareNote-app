import { useEffect, useState } from "react";
import { Notes, Plus } from "../components";
import { Watch } from "react-loader-spinner";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getNotes = async () => {
    setIsLoading(true);
    const res = await fetch(`${import.meta.env.VITE_API}/notes`);
    const data = await res.json();
    setNotes(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getNotes();
  }, []);
  return (
    <section className="flex w-[90%] mx-auto justify-center gap-4 px-6">
      {!isLoading && notes.length > 0 ? (
        <>
          {notes.map((note) => (
            <Notes key={note._id} note={note} />
          ))}
        </>
      ) : (
        <div className="animate-pulse flex w-full justify-center items-center text-teal-600 font-mono my-10">
          <Watch
            visible={isLoading}
            height="40"
            width="40"
            radius="48"
            color="#4fa94d"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      <Plus />
    </section>
  );
};

export default Home;
