import RegisterForm from "../components/RegisterForm";
import FormWrap from "../components/FormWrap";

export default function Register() {
  return (
    <>
      <FormWrap >
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900" >
          Create new account
        </h2>
        <RegisterForm />
      </FormWrap>
    </>
  );
}