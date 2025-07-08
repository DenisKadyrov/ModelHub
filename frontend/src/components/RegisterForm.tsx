import { useState } from "react";

import Field from "./Field"

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const [data, setData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (field: keyof RegisterFormData) => (value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };
  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <Field
            label="User name"
            name="name"
            type="text"
            onChange={handleChange("name")}
          />
          <Field
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            onChange={handleChange("email")}
          />
          <Field
            label="Password"
            name="password"
            type="password"
            autoComplete="password"
            onChange={handleChange("password")}
          />
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
