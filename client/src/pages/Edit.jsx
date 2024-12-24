import { NoteForm } from "../components";

const Edit = () => {
  return (
    <section className="px-10">
      <NoteForm isCreate={false} />
    </section>
  );
}

export default Edit