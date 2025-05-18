import { useField } from "formik";

const Checkbox: React.FC = () => {
  const [field, , helpers] = useField("rememberMe");

  return (
    <label className="flex items-center cursor-pointer">
      <div className="inline-flex items-center">
        <label
          htmlFor="checkbox-3"
          className="relative flex cursor-pointer items-center rounded-full p-3 pl-0 pr-0"
          data-ripple-dark="true"
        >
          <input
            id="checkbox-3"
            type="checkbox"
            className="
              peer
              relative
              cursor-pointer
              appearance-none
              rounded-md
              border
              transition-all
              h-6
              w-6
              border-[#A6B3C0]
              checked:border-[#00E687]
              checked:bg-[#00E687]
              hover:border-[#A6B3C0]
              focus:outline-none
            "
            checked={field.value}
            onChange={() => helpers.setValue(!field.value)}
          />
          <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </label>
      </div>
      <span className="ml-2 text-[16px] text-[#222B33] font-normal font-sans">
        Keep me signed in
      </span>
    </label>
  );
};

export default Checkbox;
