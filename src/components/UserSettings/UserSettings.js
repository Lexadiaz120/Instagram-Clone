import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import useUser from "../../hooks/useUser";
import "./UserSettings.css";
export const UserSettings = ({ addAvatar }) => {
  const [username, setUserName] = useState("");
  const { user } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const filesRef = useRef();
  const { token } = useUserTokenContext();
  const changeUserProfile = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      for (const image of filesRef.current.files) {
        formData.append("avatar", image);
      }

      if (email !== "") {
        formData.append("email", email);
      }
      if (username !== "") {
        formData.append("username", username);
      }
      if (password !== "") {
        formData.append("passwd", password);
      }
      const changeUserRes = await fetch(
        `${process.env.REACT_APP_API_URL}/editprofile`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      let postUserBody = await changeUserRes.json();
      addAvatar(postUserBody);
      if (postUserBody.ok) {
        let postUserBody = await changeUserRes.json();
        toast("Data succesfully changed");
      }
      if (!postUserBody.ok) {
        throw new Error(postUserBody.message);
      }
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <>
      <div className="user_settings">
        <form onSubmit={changeUserProfile}>
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={username}
            id="username"
            placeholder="Introduce new name"
            type="name"
          ></input>
          <br />
          <input
            placeholder="Introduce new email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            type="email"
          ></input>
          <br />
          <input
            placeholder="Introduce new password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            type="password"
          ></input>
          <br />
          <label for="images">Cambiar photo</label>
          <br />
          <input type="file" id="images" ref={filesRef} required />
          <br />
          <button>Change data</button>
        </form>
      </div>
    </>
  );
};
