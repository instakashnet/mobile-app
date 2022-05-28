import { createNavigationContainerRef, StackActions, CommonActions } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigate(...args) {
  if (navigationRef.isReady()) navigationRef.dispatch(CommonActions.navigate(...args));
}

export function push(...args) {
  if (navigationRef.isReady()) navigationRef.dispatch(StackActions.push(...args));
}

export function pop(number) {
  if (navigationRef.isReady()) navigationRef.dispatch(StackActions.pop(number));
}

export function popToTop() {
  if (navigationRef.isReady()) navigationRef.dispatch(StackActions.popToTop());
}

export function goBack() {
  if (navigationRef.isReady()) navigationRef.dispatch(CommonActions.goBack());
}

export function replace(...args) {
  if (navigationRef.isReady()) navigationRef.dispatch(StackActions.replace(...args));
}
