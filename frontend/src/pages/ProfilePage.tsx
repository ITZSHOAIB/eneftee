import ProfileBottom from "../components/Profile/ProfileBottom";
import ProfileTop from "../components/Profile/ProfileTop";

function ProfilePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <ProfileTop />
      <ProfileBottom />
    </div>
  );
}

export default ProfilePage;
