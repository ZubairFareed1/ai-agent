import Header from "../components/Header";
import { useTheme } from "../ThemeContext";
import { FaCamera } from "react-icons/fa";
import dummy_profile from '../assets/dummy_profile.jpeg'
import Scrollbars from "rc-scrollbars";
import { useEffect, useState } from "react";

export default function Profile() {
  const { theme } = useTheme();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(dummy_profile);

  useEffect(()=>{
    
    const fetchProfileData = async () => {
      try {
        const auth = JSON.parse(sessionStorage.getItem('auth'))
        if (!auth) {
          throw new Error('User not authenticated');

        }
        const token = auth.user.token;
        const userId = auth.user.user.user_id;
        console.log(userId)
        const response = await fetch(`http://localhost:3000/api/users/profile/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
  
        const data = await response.json();
        console.log(data);
        setFirstName(data.user.first_name);
        setLastName(data.user.last_name);
        setEmail(data.user.email);
        setFullName(data.user.full_name)
        setProfilePicture(data.user.profile_picture_url || dummy_profile);
        console.log(profilePicture)

      } catch (error) {
        console.error('Error fetching profile data:', error);
        alert('Failed to fetch profile data. Please try again later.')
      }
    };
  
    fetchProfileData()
  },[])

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = JSON.parse(sessionStorage.getItem('auth'))
      if (!auth) {
        throw new Error('User not authenticated');
      }
      const token = auth.user.token;
      const userId = auth.user.user.user_id;
      console.log(userId)
      console.log(token)
      const response = await fetch(`http://localhost:3000/api/users/update_user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      console.log(data);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again later.');
    }
  };


  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Display the selected image temporarily
    const reader = new FileReader();
    reader.onload = () => setProfilePicture(reader.result);
    reader.readAsDataURL(file);

    try {
      const auth = JSON.parse(sessionStorage.getItem("auth"));
      if (!auth) throw new Error("User not authenticated");

      const token = auth.user.token;
      const userId = auth.user.user.user_id;

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`http://localhost:3000/api/users/update_profile_picture/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload profile picture");

      alert("Profile picture updated successfully!");
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture. Please try again later.");
    }
  };

  return (
    <div className="h-screen pb-8 lg:p-5">
      <div
        className={`h-full flex flex-column ${
          theme === "light" ? "bg-white  border-400" : " border-700 surface-800"
        } lg:border-round-md border-1`}
      >
          <div>
            <Header />
          </div>
        <Scrollbars>
          <div className="m-4 p-2">
            <div className="flex gap-4">
              <div className="relative inline-block">
                <img
                  src={profilePicture}
                  alt="Profile Picture"
                  className="w-10rem h-10rem border-circle border-1 border-400"
                  style={{ objectFit: "cover" }}
                  onError={(e) => (e.target.src = profile_picture)}

                />
                <div
                  className="absolute"
                  style={{ right: "10px", bottom: "10px" }}
                >
                  <button className="w-3rem h-3rem border-circle border-1 border-300 surface-700 cursor-pointer">
                    <label htmlFor="file">

                    <FaCamera className="text-white text-xl" />
                    <input
                      id="file"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                      />
                      </label>
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <h1 className={`text-4xl font-semibold ${theme==='light'?"text-gray-800":"text-300"}`}>{fullName}</h1>
                <p className={`text-base ${theme==='light'?"text-gray-600":"text-300"}`}>
                  {email}
                </p>
              </div>
            </div>
          
            <form onSubmit={handleFormSubmit}>
              <h2 className={`${theme==='light'?"text-gray-800":"text-300"}`}>Personal Information</h2>
              <div className="flex flex-column gap-3 mt-4">
                <div className="flex flex-column md:flex-row gap-3 md:gap-8">
                  <div className=" w-12 md:w-6">
                    <div className={`flex flex-column gap-2 `}>
                      <label
                        htmlFor="First_name"
                        className="text-xl text-600 font-semibold"
                      >
                        First Name
                      </label>

                      <input
                        type="text"
                        id="first_name"
                        required
                        placeholder="Enter First Name"
                        className={`w-full h-4rem text-xl p-3 border-1 border-round-md ${theme==='light'?"surface-100 border-500 text-800":"text-500 surface-900 border-700"}`}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-12 md:w-6">
                    <div className="flex flex-column gap-2">
                      <label
                        htmlFor="First_name"
                        className="text-xl text-600 font-semibold"
                      >
                         Last Name
                      </label>

                      <input
                        type="text"
                        id="last_name"
                        required
                        placeholder="Enter Last Name"
                        className={`w-full h-4rem text-xl p-3 border-1 border-round-md ${theme==='light'?"surface-100 border-500 text-800":"text-500 surface-900 border-700"} `}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-column md:flex-row gap-3 md:gap-8">
                  <div className="w-12 md:w-6">
                    <div className="flex flex-column gap-2">
                      <label
                        htmlFor="First_name"
                        className="text-xl text-600 font-semibold"
                      >
                        Email
                      </label>

                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="Enter Email Address"
                        className={`w-full h-4rem text-xl p-3 border-1 border-round-md ${theme==='light'?"surface-100 border-500 text-800":"text-500 surface-900 border-700"} `}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-12 md:w-6">
                    <div className="flex flex-column gap-2">
                      <label
                        htmlFor="First_name"
                        className="text-xl text-600 font-semibold"
                      >
                        Password
                      </label>

                      <input
                        type="password"
                        id="password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter Password"
                        className={`w-full h-4rem text-xl p-3 border-1 border-round-md ${theme==='light'?"surface-100 border-500 text-800":"text-500 surface-900 border-700"} `}
                        
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-content-end mt-4">
                <button className="w-full md:w-15rem py-3 px-6 bg-blue-500 text-white border-round-md text-xl border-none cursor-pointer">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </Scrollbars>
      </div>
    </div>
  );
}
