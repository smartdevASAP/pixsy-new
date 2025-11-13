import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { imgs_assets } from "../assets/assets";
import { useApp1 } from "../context/userContext";

const Login = () => {
  //local state
  const [currentStep, setCurrentStep] = useState(1);
  //global call
  const {
    username,
    setUsername,
    // deleteUser,
    // saveUser,
    firstname,
    setFirstname,
    lastname,
    setLastname,
    phone,
    setPhone,
    birthDay,
    setBirthDay,
    password,
    setPassword,
    pronouns,
    setPronouns,
    confirmPassword,
    setConfirmPassword,
    confirmPhone,
    setConfirmPhone,
    email,
    setEmail,
    bio,
    setBio,
    sendToServer,
    hasAccount,
    setHasAccount,
    login,
    loggingEmail,
    loggingPassword,
    setLoggingEmail,
    setLoggingPassword,
  } = useApp1();
  //--END OF GLOBAL CALL

  const steps = [
    { id: 1, label: "basic info" },
    { id: 2, label: "bio" },
    { id: 3, label: "security" },
    { id: 4, label: "finish up" },
    { id: 5, label: "proceed" },
  ];

  // move to next step
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  // move to previous step
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // click handler for steps
  const handleStepClick = (id: number) => {
    setCurrentStep(id);
  };

  // conditional rendering
  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <div className="space-y-6">
          <div className="md:flex md:space-y-0 space-y-4 gap-4">
            <input
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
              type="text"
              className="p-3 border border-gray-300 placeholder-gray-300 rounded-sm w-full"
              placeholder="first name"
            />
            <input
              type="text"
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
              className="p-3 border border-gray-300 placeholder-gray-300 rounded-sm w-full"
              placeholder="second name"
            />
          </div>

          <div className="md:flex md:space-y-0 space-y-4 gap-4">
            <input
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              type="text"
              className="p-3 border border-gray-300 placeholder-gray-300 rounded-sm w-full"
              placeholder="+254 -000-999-111"
            />
            <input
              onChange={(e) => setBirthDay(e.target.value)}
              value={birthDay}
              type="text"
              className="p-3 border border-gray-300 placeholder-gray-300 rounded-sm w-full"
              placeholder="YY/MM/DD"
            />
          </div>

          <div className="md:flex md:space-y-0 space-y-4 gap-4">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="p-3 border border-gray-300 placeholder-gray-300 rounded-sm w-full"
              placeholder="password"
            />
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              className="p-3 border border-gray-300 placeholder-gray-300 rounded-sm w-full"
              placeholder="confirm password"
            />
          </div>
        </div>
      );
    }

    if (currentStep === 2) {
      return (
        <div className="space-y-6">
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Bio"
            className="p-3 border border-gray-300 placeholder-gray-300 rounded-sm w-full resize-none overflow-hidden"
            rows={1}
          ></textarea>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="p-3 border border-gray-300 placeholder-gray-300 rounded-sm w-full"
            placeholder="username"
          />
          <input
            type="text"
            onChange={(e) => setPronouns(e.target.value)}
            value={pronouns}
            className="p-3 border border-gray-300 placeholder-gray-300 rounded-sm w-full"
            placeholder="pronouns"
          />
        </div>
      );
    }

    if (currentStep === 3) {
      return (
        <div className="space-y-6">
          <input
            type=""
            onChange={(e) => setConfirmPhone(e.target.value)}
            value={confirmPhone}
            className="p-3 border border-gray-300 placeholder-gray-300 rounded-sm w-full"
            placeholder="phone number"
          />
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="p-3 border border-gray-300 placeholder-gray-300 rounded-sm w-full"
            placeholder="rambo@example.com"
          />
        </div>
      );
    }

    if (currentStep === 4) {
      return (
        <div className="text-gray-700 mt-10 max-w-2xl mx-auto text-left flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center mb-4">
            You’re almost done! Let’s{" "}
            <span className="text-[#0437FF]">finish up</span>.
          </h2>

          {/* Scrollable container */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 text-xs leading-relaxed h-[300px] sm:h-[200px] overflow-y-auto w-full shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Pixsy Terms of Service & User Agreement
            </h3>

            <p>
              By creating a Pixsy account, you agree to follow our terms and use
              Pixsy responsibly. Please take a moment to review the main points:
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Use Pixsy only for lawful and respectful communication.</li>
              <li>Keep your login details private and secure.</li>
              <li>
                Your uploaded content remains yours, but Pixsy can display it
                for engagement.
              </li>
              <li>Pixsy may suspend accounts that violate these rules.</li>
              <li>Your data is handled according to our Privacy Policy.</li>
              <li>
                Do not post content that is hateful, explicit, or violates
                community standards.
              </li>
              <li>
                Pixsy reserves the right to update these terms at any time.
              </li>
              <li>
                Continued use of the platform means you agree to any new
                changes.
              </li>
            </ul>

            <p>
              These terms are designed to create a safe and respectful
              environment for all users.
            </p>

            <p>
              Please read carefully before proceeding. You can access the full
              Terms and Privacy Policy anytime from your account settings.
            </p>
          </div>

          {/* Agreement checkbox */}
          <div className="flex items-center mt-4 w-full">
            <input
              type="checkbox"
              id="agree"
              className="w-4 h-4 text-[#0437FF] border-gray-300 rounded focus:ring-[#0437FF]"
            />
            <label htmlFor="agree" className="ml-2 text-sm text-gray-700">
              I have read and agree to Pixsy’s Terms of Service and Privacy
              Policy.
            </label>
          </div>
        </div>
      );
    }

    if (currentStep === 5) {
      return (
        <div className="text-center text-gray-700 mt-10">
          <p className="text-lg">
            You’re ready to <span className="font-semibold">proceed</span>!
          </p>
        </div>
      );
    }
  };

  return (
    <div className="sm:flex gap-4 min-h-screen items-start">
      {/* left container */}
      <div className="bg-white sm:w-[60vw] p-6">
        {!hasAccount ? (
          <>
            <h1 className="text-2xl sm:text-3xl text-gray-900 font-bold mb-4">
              Create Account
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              Create an account and enjoy connecting with friends and making
              memories.
            </p>

            {/* progress bar */}
            <div className="w-full flex flex-col items-center mb-8">
              <p className="text-lg font-semibold text-gray-700 mb-6">
                <span className="text-blue-600">
                  {Math.round((currentStep / steps.length) * 100)}%
                </span>{" "}
                completed
              </p>

              <div className="flex items-start justify-center w-full max-w-3xl relative">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className="flex flex-col items-center relative w-full cursor-pointer"
                    onClick={() => handleStepClick(step.id)}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium z-10 transition-all duration-300 ${
                        step.id < currentStep
                          ? "bg-blue-600 text-white"
                          : step.id === currentStep
                          ? "bg-blue-500 text-white ring-4 ring-blue-200"
                          : "border-2 border-gray-300 text-gray-500 bg-white"
                      }`}
                    >
                      {step.id < currentStep ? <Check size={18} /> : step.id}
                    </div>

                    <p
                      className={`text-sm mt-3 transition-all ${
                        step.id <= currentStep
                          ? "text-gray-800 font-medium"
                          : "text-gray-500"
                      }`}
                    >
                      {step.label}
                    </p>

                    {index !== steps.length - 1 && (
                      <div
                        className={`absolute top-5 left-[55%] right-[-45%] h-[2px] ${
                          step.id < currentStep
                            ? "bg-blue-600"
                            : "bg-blue-500 opacity-50"
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step content */}
            {renderStepContent()}

            {/* Back + Save & Continue buttons */}
            <div className="mt-8 flex justify-between gap-4">
              <button
                onClick={handleBack}
                className="w-1/2 bg-gray-200 text-gray-700 p-3 rounded-sm shadow-xs hover:bg-gray-300 transition-all duration-200"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (currentStep === steps.length) {
                    sendToServer();
                  } else {
                    handleNext();
                  }
                }}
                className="w-1/2 bg-[#0437FF] p-3 flex items-center justify-center gap-2 text-white text-center rounded-sm shadow-xs"
              >
                <span className="text-xs md:text-sm ">
                  {currentStep === steps.length ? "Finish" : "Save & Continue"}
                </span>
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Already have account toggle */}
            <p className="text-center mt-6 text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => setHasAccount(true)}
                className="text-[#0437FF] cursor-pointer hover:underline"
              >
                Click here to login
              </span>
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl sm:text-3xl text-gray-900 font-bold mb-4">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              Log in to continue connecting and creating memories.
            </p>

            <div className="space-y-5">
              <input
                onChange={(e) => setLoggingEmail(e.target.value)}
                value={loggingEmail}
                type="email"
                className="p-3 border border-gray-300 rounded-sm w-full"
                placeholder="Email"
              />
              {/* <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                className="p-3 border border-gray-300 rounded-sm w-full"
                placeholder="Username"
              /> */}
              <input
                onChange={(e) => setLoggingPassword(e.target.value)}
                value={loggingPassword}
                type="password"
                className="p-3 border border-gray-300 rounded-sm w-full"
                placeholder="Password"
              />
            </div>
            {/* different api ENDPOINT */}
            <button
              onClick={login}
              className="w-full mt-8 bg-[#0437FF] text-white p-3 rounded-sm shadow-xs"
            >
              Login
            </button>

            <p className="text-center mt-6 text-sm text-gray-600">
              Don’t have an account?{" "}
              <span
                onClick={() => setHasAccount(false)}
                className="text-[#0437FF] cursor-pointer hover:underline"
              >
                Create one
              </span>
            </p>
          </>
        )}
      </div>

      {/* right container */}
      <div className="hidden sm:flex flex-col h-screen justify-center items-center sm:w-[40vw] bg-[#0437FF] text-white font-bold text-center p-6">
        <h1 className="text-3xl mb-4 tracking-wide">...</h1>
        <p className="text-sm font-normal max-w-xs">
          Explore, connect with friends, and enjoy
        </p>
        {imgs_assets.map((img, index) => (
          <img
            key={index}
            src={img.phones}
            alt="Pixsy phones"
            className="mt-8 w-1/2 object-contain"
          />
        ))}
      </div>
    </div>
  );
};

export default Login;
