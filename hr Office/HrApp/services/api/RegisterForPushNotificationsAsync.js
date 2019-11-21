import { Permissions, Notifications } from "expo";
import { AddDeviceToken } from "../AccountService";

export async function getPushNotificationExpoTokenAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    console.log(`Notification: ${finalStatus}`);
    return null;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  return token;
}

export async function registerForPushNotificationsAsync() {
  
  var token = await getPushNotificationExpoTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  AddDeviceToken(token);
}
