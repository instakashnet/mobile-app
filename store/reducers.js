import { combineReducers } from "redux";
import { accountsReducer } from "../services/accounts/reducer";
import { activityReducer } from "../services/activity/reducer";
import { authReducer } from "../services/auth/reducer";
import { exchangeReducer } from "../services/exchange/reducer";
import { notificationsReducer } from "../services/notifications/reducer";
import { profileReducer } from "../services/profile/reducer";
import { settingsReducer } from "../services/settings/reducer";
import { utilsReducer } from "../services/utils/reducer";

export const appReducer = combineReducers({ authReducer, utilsReducer, profileReducer, exchangeReducer, accountsReducer, activityReducer, settingsReducer, notificationsReducer });
