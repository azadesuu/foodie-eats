import { useContext, useEffect, useState } from "react";
import { changeTheme } from "../../api";
import { UserContext } from "../../actions/UserContext";

export default function Theme() {
  const [user, setUser] = useContext(UserContext);
  const [userId, setUserId] = useState();
  const [currTheme, setCurrTheme] = useState();
  const [theme, setTheme] = useState("honeydew");

  useEffect(() => {
    if (user && !userId) {
      console.log(user);
      initializeFields();
    }
  }, [user]);

  const initializeFields = () => {
    setUserId(user._id);
    setCurrTheme(user.theme);
  };

  const updateTheme = async () => {
    try {
      await changeTheme({
        userId: userId,
        newTheme: theme
      });
      alert(`Theme changed to ${theme}, re-login to save changes`);
    } catch (err) {
      console.log(err);
    }
  };
  const themes = ["honeydew", "shokupan", "boring", "blueberry", "dragonfruit"];

  return (
    <div>
      {userId ? (
        <div>
          {themes.map(theme => (
            <button value={theme} onClick={() => setTheme(theme)}>
              {theme}
            </button>
          ))}
          <button value={"confirm"} onClick={updateTheme}>
            Confirm Change to from {currTheme} to {theme}
          </button>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
