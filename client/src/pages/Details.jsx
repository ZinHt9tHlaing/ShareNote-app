import { Link } from "react-router-dom";

const Details = () => {
  return (
    <section className="px-10">
      <div className="text-end">
        <Link to={"/"}>
          <button className="text-teal-600 font-medium border-2 border-teal-600 px-3 py-2 active:scale-95 duration-200">
            Back
          </button>
        </Link>
      </div>
      <div className="w-full border-t-4 border-t-teal-600 shadow-lg p-3 mt-4">
        <h3 className="text-3xl font-semibold">Lorem ipsum dolor sit amet.</h3>
        <p className="text-base mt-3">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi ullam
          recusandae autem accusantium dicta assumenda, alias molestiae
          laboriosam tempore asperiores quam, aliquam voluptatem. Odit expedita
          quos accusamus, suscipit tempore magni.
        </p>
      </div>
    </section>
  );
};

export default Details;
