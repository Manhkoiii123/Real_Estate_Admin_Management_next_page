import { Button } from "@/components/button";
import { LayoutMain } from "@/components/layout";
import { SignUp, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();
  // start the sign up process.
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      const error = JSON.stringify(err, null, 2);
      const regex = /"message":.*."/gm;
      const message = error.match(regex)?.[0].split(":")[1];
      toast.error(message?.replace(/"/g, ""));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async (e: any) => {
    console.log("handle");
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (err: any) {
      console.error("error", err.errors[0].longMessage);
    }
  };
  return (
    <LayoutMain>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-3xl p-10 bg-white rounded-lg shadow-sm">
          <h1 className="flex items-center justify-center mb-5 text-base font-semibold">
            Sign Up
          </h1>
          {!pendingVerification ? (
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="flex flex-col gap-2 mb-5">
                <label htmlFor="email" className="font-medium cursor-pointer">
                  Email
                </label>
                <input
                  className="p-3 font-medium bg-white border border-gray-200 rounded-lg outline-none"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 mb-5">
                <label
                  htmlFor="password"
                  className="font-medium cursor-pointer"
                >
                  Password
                </label>
                <input
                  id="password"
                  className="p-3 font-medium bg-white border border-gray-200 rounded-lg outline-none"
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button className="w-full rounded-lg" type="submit">
                SignUp
              </Button>
            </form>
          ) : (
            <>
              <div>
                <form>
                  <div className="flex flex-col gap-2 mb-5">
                    <input
                      className="p-3 font-medium bg-white border border-gray-200 rounded-lg outline-none"
                      value={code}
                      placeholder="Code..."
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>

                  <Button className="w-full rounded-lg" onClick={onPressVerify}>
                    Verify Email
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </LayoutMain>
  );
}
