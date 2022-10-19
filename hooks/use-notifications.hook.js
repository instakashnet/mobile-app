import { getExpoPushTokenAsync } from "expo-notifications";
import { useEffect, useState } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
// PERMISSIONS
import { checkPushNotificationPermissions } from "../shared/helpers/permissions";
import { savePushToken } from "../store/actions";

export const useNotifications = () => {
  const dispatch = useDispatch(),
    isSignedIn = useSelector((state) => state.authReducer.isSignedIn),
    [notificationPermissions, setNotificationPermissions] = useState(false);

  // EFFECTS
  useEffect(() => {
    (async () => setNotificationPermissions(await checkPushNotificationPermissions()))();
  }, []);

  useEffect(() => {
    (async () => {
      if (notificationPermissions && isSignedIn) {
        const token = (
          await getExpoPushTokenAsync({
            experienceId: "@rogerrc12/instakash-app",
          })
        ).data;
        dispatch(savePushToken(token));
      }
    })();
  }, [isSignedIn, notificationPermissions]);
};
