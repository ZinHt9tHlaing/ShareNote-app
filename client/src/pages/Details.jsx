import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Watch } from "react-loader-spinner";
import { CalendarDaysIcon, UserIcon } from "@heroicons/react/24/solid";
import { formatISO9075 } from "date-fns";

const Details = () => {
  const { id } = useParams();
  const [note, setNote] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDetailNote = async () => {
    setIsLoading(true);
    const res = await fetch(`${import.meta.env.VITE_API}/notes/${id}`);
    const data = await res.json();
    setNote(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getDetailNote();
  }, []);

  return (
    <>
      {!isLoading ? (
        <section className="px-10">
          <div className="text-end">
            <Link to={"/"}>
              <button className="text-teal-600 font-medium border-2 border-teal-600 px-3 py-2 active:scale-95 duration-200">
                Back
              </button>
            </Link>
          </div>
          <div className="w-full border-t-4 border-t-teal-600 shadow-lg p-3 mt-4">
            <h3 className="text-3xl font-semibold">{note.title}</h3>
            <div>
              <p className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <UserIcon width={20} /> {note.author}
              </p>
              {note.createdAt && (
                <p className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <CalendarDaysIcon width={20} />
                  {formatISO9075(note.createdAt, { representation: "date" })}
                </p>
              )}
            </div>
            <p className="text-base mt-3">{note.content}</p>
          </div>
        </section>
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
    </>
  );
};

export default Details;
