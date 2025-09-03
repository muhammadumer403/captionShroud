import { get, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
export default function Auth({ onSubmit, fields, handleFocus }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();
  const { loading } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  return (
    <>
      <div className="flex min-h-full flex-col  px-6  lg:px-8 bg-black/50 backdrop-blur-xl font-raleway py-4 rounded-lg md:min-w-sm mx-2 md:mx-0">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-2">
          <h2 className="mt-10 text-start uppercase text-3xl font-black tracking-tight text-heading font-orbitron ">
            {pathname == "/login" ? "Login" : "Sign Up"}
          </h2>
          <p className="text-lg text-zinc-400 w-[90%]">
            {pathname == "/login"
              ? "Welcome back! Please enter your details."
              : "Signup now and get full access to our app"}
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
            {fields.map((field) => (
              <div key={field.name} className="">
                <label
                  htmlFor={field.name}
                  className="block text-sm relative  font-medium leading-6 text-white"
                >
                  <h1
                    className={` transition-all text-md ${
                      field.focused || getValues(field.name)
                        ? "-top-4 left-0 text-heading scale-95"
                        : "top-2.5 left-0 text-gray-400"
                    } ${errors[field.name]  ?"text-red-600" :""} absolute   bg-black/50`}
                  >
                    {field.label}
                  </h1>

                  <input
                    className={`block w-full  border-b-2 outline-none border-transparent transition-all duration-300  ${
                      !field.focused && !getValues(field.name)
                        ? "border-b-zinc-300"
                        : "border-b-heading"
                    }  ${errors[field.name] ?"border-b-red-600" :""} py-1.5 text-white `}
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.name}
                    onFocus={() => handleFocus(field.name, true)}
                    {...register(
                      field.name,
                      field.name === "confirmPassword"
                        ? {
                            ...field.validator,
                            validate: (value) =>
                              value === getValues("password") ||
                              "Passwords do not match",
                          }
                        : field.validator
                    )}
                    onBlur={() => handleFocus(field.name, false)}
                  />
                  {errors[field.name] && (
                    <p className="text-red-600 mt-2 text-sm">
                      {errors[field.name]?.message}
                    </p>
                  )}
                </label>
              </div>
            ))}

            <div>
              <button
                disabled={loading}
                type="submit"
                className={`flex w-full  cursor-pointer ${
                  !loading
                    ? " from-cyan-500 to-teal-500 bg-gradient-to-r"
                    : "bg-btn !cursor-not-allowed"
                } justify-center rounded-md font-semibold  px-3 py-1.5 text-sm/6  text-white shadow-sm transition-all `}
              >
                {loading ? "Processing..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Don't Have Account ?{" "}
            <a
              href={pathname == "/login" ? "/signup" : "/login"}
              className="font-semibold text-btn hover:underline"
            >
              {pathname == "/login" ? "Sign Up" : "Login"}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
