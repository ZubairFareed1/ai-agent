import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const submitRegisterForm = async (e) => {
    e.preventDefault();
    if (email === "" || password === "" || firstName === "" || lastName === "") {
      alert("Please fill all the fields");
      return
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        { email, password, firstName, lastName }
      );
      if (response.status === 400) {
        alert("User Already exists");
      }
      if (response.status === 201) {
        alert("User registered successfully");
        navigate("/login");
      }
      
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div
      className="h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url(login-bg.jpg)" }}
    >
      <div
        className="h-full bg-black-alpha-70 flex justify-content-center align-items-center "
        style={{ backdropFilter: "blur(2px)" }}
      >
        <div
          className=" w-full sm:border-round-lg sm:w-25rem  border-1 bg-white-alpha-80 "
          style={{ backdropFilter: "blur(5px)" }}
        >
          <div>
            <div className="flex justify-content-center align-items-center">
              <h2 className="text-4xl">Smart ai</h2>
            </div>
            <div className="flex justify-content-center align-items-center">
              <span className="text-center">
                Register account to continue Smart Ai
              </span>
            </div>
            <form onSubmit={submitRegisterForm}>
              <div className="flex flex-column p-4 gap-4">
                <div
                  className={` border-round-md overflow-hidden`}
                  style={{
                    outline: firstNameFocused ? "2px solid #007bff" : "none",
                  }}
                >
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full py-3 px-3 border-none text-xl "
                    style={{
                      outline: "none",
                      border: "none",
                    }}
                    onFocus={() => setFirstNameFocused(true)}
                    onBlur={() => setFirstNameFocused(false)}
                    onChange={handleFirstNameChange}
                    value={firstName}
                  />
                </div>
                <div
                  className={` border-round-md overflow-hidden`}
                  style={{
                    outline: lastNameFocused ? "2px solid #007bff" : "none",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full py-3 px-3 border-none text-xl "
                    style={{
                      outline: "none",
                      border: "none",
                    }}
                    onFocus={() => setLastNameFocused(true)}
                    onBlur={() => setLastNameFocused(false)}
                    onChange={handleLastNameChange}
                    value={lastName}
                  />
                </div>
                <div
                  className={` border-round-md overflow-hidden`}
                  style={{
                    outline: emailFocused ? "2px solid #007bff" : "none",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Email"
                    className="w-full py-3 px-3 border-none text-xl "
                    style={{
                      outline: "none",
                      border: "none",
                    }}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    onChange={handleEmailChange}
                    value={email}
                  />
                </div>
                <div
                  className={` border-round-md overflow-hidden`}
                  style={{
                    outline: passwordFocused ? "2px solid #007bff" : "none",
                  }}
                >
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full py-3 px-3 border-none text-xl "
                    style={{
                      outline: "none",
                      border: "none",
                    }}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    onChange={handlePasswordChange}
                    value={password}
                  />
                </div>
                <div className={` border-round-md overflow-hidden`}>
                  <button
                    className="p-3 w-full text-base bg-blue-400 border-none text-white cursor-pointer font-semibold"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
                <div className="flex justify-content-center align-items-center">
                  <span className="text-center">
                    Already have an Account?{" "}
                    <a
                      href="/login"
                      className="text-blue-400 cursor-pointer"
                    >
                      Login in
                    </a>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
