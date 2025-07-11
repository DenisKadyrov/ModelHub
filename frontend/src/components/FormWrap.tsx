import type { PropsWithChildren } from "react";

export default function FormWrap({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8" >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm" >
          {
            // some logo
          }
          {children}
        </div>
      </div>
    </>
  );
}