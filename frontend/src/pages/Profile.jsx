// import React, { useEffect, useState } from "react";
// import { getProfile, updateProfile } from "../services/userService";
// import Button from "../components/ui/Button";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [editing, setEditing] = useState(false);

//   const fetchProfile = async () => {
//     const { data } = await getProfile();
//     setUser(data);
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const handleSave = async (e) => {
//     e.preventDefault();
//     const updated = {
//       name: e.target.name.value,
//       email: e.target.email.value,
//     };
//     await updateProfile(updated);
//     setEditing(false);
//     fetchProfile();
//   };

//   if (!user) return <p className="p-6">Loading profile...</p>;

//   return (
//     <div className="p-6 max-w-lg mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
//       {editing ? (
//         <form onSubmit={handleSave} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             defaultValue={user.name}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             defaultValue={user.email}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <Button type="submit" className="w-full">
//             Save
//           </Button>
//         </form>
//       ) : (
//         <div className="space-y-2">
//           <p>
//             <strong>Name:</strong> {user.name}
//           </p>
//           <p>
//             <strong>Email:</strong> {user.email}
//           </p>
//           <Button onClick={() => setEditing(true)} className="mt-2">
//             Edit Profile
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import API from "../utils/api";

const Profile = () => {
  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState(null);
  
  if(token){
    useEffect(() => {
      console.log("Token:", token);
      API.get("/auth/profile").then((res) => setProfile(res.data));
    }, []);

  }
  
  if (!profile) return <p>LogIn to see your profile</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <div className="border p-4 rounded space-y-2">
        hello profile
        <p><b>Name:</b> {profile.name}</p>
        <p><b>Email:</b> {profile.email}</p>
        <p><b>Role:</b> {profile.role}</p>
      </div>
    </div>
  );
};

export default Profile;
