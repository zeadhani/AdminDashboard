import { useSelector } from "react-redux";
import CustomContainer from "../global/CustomContainer";
import useUser from "../../components/hooks/auth/useUser";
import ProfileImage from "../../components/profile/profileImage";
import ProfileDetails from "../../components/profile/profileDetails";
import ProfileContainer from "../../components/profile/profileContainer";
import LogoutButton from "../../components/profile/LogoutButton";

function Profile() {
  const data = useSelector((state) => state.Auth.user);
  const email = data.replace(/"/g, "");
  const { user } = useUser(email);

  return (
    <CustomContainer
      title={"BOGO PROFILE"}
      subtitle={"Managing your bogo profile!"}
    >
      <ProfileContainer>
        <ProfileImage user={user} />
        <ProfileDetails user={user} />
      </ProfileContainer>
      <LogoutButton />
    </CustomContainer>
  );
}

export default Profile;
