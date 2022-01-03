import { combineReducers } from "redux";

// REDUCERS //

// UTILS
import { utilsReducer } from "../services/utils/reducer";
// AUTH
import { authReducer } from "../services/auth/reducer";
// PROFILE
import { profileReducer } from "../services/profile/reducer";
// EXCHANGE
import { exchangeReducer } from "../services/exchange/reducer";
// ACCOUNTS
import { accountsReducer } from "../services/accounts/reducer";
// ACTIVITY
import { activityReducer } from "../services/activity/reducer";
// SETTINGS
import { settingsReducer } from "../services/settings/reducer";

export const rootReducer = combineReducers({ authReducer, utilsReducer, profileReducer, exchangeReducer, accountsReducer, activityReducer, settingsReducer });
