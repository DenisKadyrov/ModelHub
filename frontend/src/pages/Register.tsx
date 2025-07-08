import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8" >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm" >
          {
            // some logo
          }
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900" >
            Create new account
          </h2>
          <RegisterForm />
        </div>
      </div>
    </>
  );
}