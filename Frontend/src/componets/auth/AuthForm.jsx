import { useForm } from "react-hook-form";
export default function Auth({ onSubmit, fields }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {fields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium leading-6 text-white"
                >
                  {field.label}
                </label>
                <div className="mt-2">
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.name}
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
                    className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset  px-2 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                  {errors[field.name] && (
                    <p className="text-red-600 mt-2 text-sm">
                      {errors[field.name]?.message}
                    </p>
                  )}
                </div>
              </div>
            ))}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
