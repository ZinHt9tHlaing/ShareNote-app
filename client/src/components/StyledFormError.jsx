import { ErrorMessage } from "formik";

const StyledFormError = ({name}) => {
  return (
    <div className="text-red-600 font-semibold font-mono">
      <ErrorMessage name={name} />
    </div>
  );
};

export default StyledFormError;
