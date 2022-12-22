import * as Application from "expo-application";
import { isDevice } from "expo-device";
import * as Facebook from "expo-facebook";
import * as Notifications from "expo-notifications";
import { getTrackingPermissionsAsync, requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import * as Updates from "expo-updates";
import ENV from "../../variables";

const fbAppOptions = {
  appId: ENV.fbAppId,
  appName: "kash-app",
  autoLogAppEvents: true,
};

export async function checkAppUpdate() {
  let storeUpdate = false,
    otaUpdate;

  const update = await Updates.checkForUpdateAsync();

  if (update.isAvailable) {
    otaUpdate = update.isAvailable;
  } else {
    if (Application.nativeApplicationVersion !== "0.2.7") storeUpdate = true;
  }

  return { storeUpdate, otaUpdate };
}

export async function checkTrackingPermissions() {
  let { granted: getGranted } = await getTrackingPermissionsAsync();

  if (getGranted) {
    await Facebook.initializeAsync(fbAppOptions);
    await Facebook.setAdvertiserTrackingEnabledAsync(true);
  } else {
    let { granted: requestGranted } = await requestTrackingPermissionsAsync();

    if (requestGranted) {
      await Facebook.initializeAsync(fbAppOptions);
      await Facebook.setAdvertiserTrackingEnabledAsync(true);
    }
  }
}

export async function checkPushNotificationPermissions() {
  let hasPermissions = false;

  if (isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") hasPermissions = false;
    hasPermissions = true;
  } else {
    alert("Debes tener un dispositivo físico para usar las notificaciones.");
    hasPermissions = false;
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return hasPermissions;
}
