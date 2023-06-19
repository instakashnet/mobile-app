import { CommonActions } from '@react-navigation/native'

export function resetNavigate(navigation, routeName) {
  // Inside your component or navigation container
  navigation.dispatch((state) => {
    // Remove all the screens except the target screen from the stack
    const routes = state.routes.filter((route) => route.name === routeName)

    // Reset the navigation stack with only the target screen
    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1 // Set the index to the last screen in the routes array
    })
  })
}
