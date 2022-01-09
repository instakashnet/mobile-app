import { put, all, fork, call, takeEvery, takeLatest, delay, select } from "redux-saga/effects";
import camelize from "camelize";
import * as types from "./types";
import * as RootNavigation from "../../navigation/root.navigation";
import * as actions from "./actions";
import { authInstance } from "../auth.service";
import { loadUserSuccess } from "../auth/actions";
import { replaceSpace } from "../../shared/helpers/functions";
import { RNS3 } from "react-native-aws3";
import { getVariables } from "../../variables";

const { awsAccessKey, awsSecretKey, bucketName } = getVariables();

// UTILS
const uploadToS3 = async (imageObj, uploadType) => {
  try {
    const res = await RNS3.put(imageObj, {
      keyPrefix: `${uploadType}/`,
      bucket: bucketName,
      region: "us-east-2",
      accessKey: awsAccessKey,
      secretKey: awsSecretKey,
      successActionStatus: 201,
    });

    return res;
  } catch (error) {
    throw error;
  }
};

// SAGAS
function* watchGetProfiles() {
  yield takeEvery(types.GET_PROFILES_INIT, getProfiles);
}

function* getProfiles() {
  try {
    const res = yield authInstance.get("/users/profiles");
    if (res.status === 200) yield put(actions.getProfilesSuccess(res.data.profiles));
  } catch (error) {
    yield put(actions.profileError(error.message));
  }
}

function* watchGetUserData() {
  yield takeEvery(types.GET_USER_DATA_INIT, getUserData);
}

function* getUserData() {
  try {
    const res = yield authInstance.get("/users/session");
    const user = camelize(res.data.user);
    yield put(loadUserSuccess(user));
    yield put(actions.getUserDataSuccess());
  } catch {
    yield put(actions.profileError(error.message));
    throw error;
  }
}

function* watchAddProfiles() {
  yield takeLatest(types.ADD_PROFILE_INIT, addProfile);
}

function* addProfile({ values }) {
  try {
    const res = yield authInstance.post("/users/profiles", values);
    if (res.status === 200) {
      yield put(actions.addProfileSuccess());
      yield call([RootNavigation, "popToTop"]);
    }
  } catch (error) {
    yield put(actions.profileError(error.message));
  }
}

function* watchUpdateprofile() {
  yield takeLatest(types.UPDATE_PROFILE_INIT, updateProfile);
}

function* updateProfile({ values }) {
  try {
    const res = yield authInstance.put("/users/profiles", values);
    if (res.status === 200) {
      yield getUserData();

      yield call([RootNavigation, "goBack"]);
      yield put(actions.updateProfileSuccess());
    }
  } catch (error) {
    yield put(actions.profileError(error.message));
  }
}

function* watchUpdateUsername() {
  yield takeLatest(types.UPDATE_USERNAME_INIT, updateUsername);
}

function* updateUsername({ values }) {
  try {
    const res = yield authInstance.put("/users/username", values);
    if (res.status === 200) {
      yield getUserData();

      yield call([RootNavigation, "goBack"]);
      yield put(actions.updateUsernameSuccess());
    }
  } catch (error) {
    yield put(actions.profileError(error.message));
  }
}

function* watchUploadDocument() {
  yield takeLatest(types.UPLOAD_DOCUMENT_INIT, uploadDocument);
}

function* uploadDocument({ values, uploadType }) {
  let uploaded;

  try {
    const resToken = yield authInstance.get("/users/generate-token"),
      user = yield select((state) => state.authReducer.user),
      photos = uploadType === "dni" ? [values.frontPhoto, values.backPhoto] : [values.frontPhoto];

    for (let i = 0; i < photos.length; i++) {
      const docSide = uploadType === "passport" ? "front" : i > 0 ? "back" : "front",
        imageObj = {
          uri: photos[i],
          name: `${user.documentType}-${user.documentIdentification}-${replaceSpace(user.name)}-${docSide}-&Token&${resToken.data.accessToken}.jpg`,
          type: "image/jpeg",
        };

      const res = yield call(uploadToS3, imageObj, user.documentType.toLowerCase());
      uploaded = res.status === 201;
    }

    if (uploaded) {
      yield delay(2000);
      yield call(getUserData);
      yield put(actions.uploadDocumentSuccess());
      yield call([RootNavigation, "navigate"], "DocumentUploaded");
    } else throw error;
  } catch (error) {
    yield put(actions.profileError(error.message));
  }
}

function* watchChangePhone() {
  yield takeLatest(types.CHANGE_PHONE_INIT, changePhone);
}

function* changePhone({ values }) {
  try {
    const res = yield authInstance.put("/users/change-phone", values);
    if (res.status === 200) {
      yield getUserData();

      yield call([RootNavigation, "goBack"]);
      yield put(actions.changePhoneSuccess());
    }
  } catch (error) {
    yield put(actions.profileError(error.message));
  }
}

function* watchChangeEmail() {
  yield takeLatest(types.CHANGE_EMAIL_INIT, changeEmail);
}

function* changeEmail({ values }) {
  try {
    const res = yield authInstance.put("/users/change-email", values);
    if (res.status === 200) {
      yield getUserData();

      yield call([RootNavigation, "goBack"]);
      yield put(actions.changeEmailSuccess());
    }
  } catch (error) {
    yield put(actions.profileError(error.message));
  }
}

function* watchSelectProfile() {
  yield takeEvery(types.SELECT_PROFILE_INIT, selectProfile);
}

function* selectProfile({ profile }) {
  const user = yield select((state) => state.authReducer.user);
  const camelProfile = camelize(profile);

  const profileData = { ...camelProfile, ...user };
  yield put(actions.selectProfileSuccess(profileData));
  yield call([RootNavigation, "navigate"], "Calculator");
}

export function* profileSaga() {
  yield all([
    fork(watchGetProfiles),
    fork(watchGetUserData),
    fork(watchAddProfiles),
    fork(watchChangePhone),
    fork(watchChangeEmail),
    fork(watchSelectProfile),
    fork(watchUpdateprofile),
    fork(watchUploadDocument),
    fork(watchUpdateUsername),
  ]);
}
