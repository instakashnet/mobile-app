import { nativeApplicationVersion } from "expo-application";
import * as Updates from "expo-updates";

export async function checkForUpdates() {
  let type = "update";

  if (__DEV__) throw new Error("Development mode");

  try {
    if (nativeApplicationVersion !== "1.0.0") {
      type = "version";
    } else {
      const update = await Updates.checkForUpdateAsync();

      if (!update.isAvailable) throw new Error("No updates available");
      const result = await Updates.fetchUpdateAsync();

      if (!result.isNew) throw new Error("Fetched update is not new");
    }

    return type;
  } catch (error) {
    throw error;
  }
}
