import { createNavigationContainerRef, StackActions } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigate(...args) {
  if (navigationRef.isReady()) navigationRef.navigate(...args);
}

export function push(...args) {
  if (navigationRef.isReady()) navigationRef.dispatch(StackActions.push(...args));
}

export function popToTop() {
  if (navigationRef.isReady()) navigationRef.dispatch(StackActions.popToTop());
}
