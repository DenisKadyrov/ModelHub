import LoginForm from "../components/LoginForm";
import FormWrap from "../components/FormWrap";

export default function Register() {
  return (
    <>
      <FormWrap >
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900" >
          Login
        </h2>
        <LoginForm />
      </FormWrap>
    </>
  );
}