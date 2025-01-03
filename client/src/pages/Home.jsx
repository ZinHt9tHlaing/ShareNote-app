import { useEffect, useState } from "react";
import { Notes, Plus } from "../components";
import { TailSpin } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getNotes = async (pageNum) => {
    setIsLoading(true);
    const res = await fetch(
      `${import.meta.env.VITE_API}/notes?page=${pageNum}`
    );
    const { notes, totalNotes, totalPages } = await res.json();
    setTotalPages(totalPages);
    setNotes(notes);
    setIsLoading(false);
  };

  useEffect(() => {
    getNotes(currentPage);
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) {
      // setCurrentPage((prev) => prev + 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section className="flex w-[90%] flex-wrap md:ps-28 pe-0 gap-4 ms-auto md:mx-auto">
      {!isLoading && notes.length > 0 ? (
        <>
          {notes.map((note) => (
            <Notes key={note._id} note={note} getNotes={getNotes} />
          ))}
          <div className="w-full flex justify-center items-center gap-3">
            {currentPage > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="text-white rounded bg-teal-600 px-3 py-1 active:scale-95 duration-200"
              >
                <div className="flex justify-center items-center">
                  <ChevronLeft width={20} />
                  Prev Page
                </div>
              </button>
            )}
            {currentPage < totalPages && (
              <button
                type="button"
                onClick={handleNext}
                className="text-white rounded bg-teal-600 px-3 py-1 active:scale-95 duration-200"
              >
                <div className="flex justify-center items-center">
                  Next Page
                  <ChevronRight width={20} />
                </div>
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="animate-pulse flex w-full justify-center items-center text-teal-600 font-mono my-10">
          <TailSpin
            visible={isLoading}
            height="40"
            width="40"
            color="#0d9488"
            ariaLabel="tail-spin-loading"
            radius="2"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
};

export default Home;
