import { isAfter, isBefore, parse } from "date-fns";
import { all, fork, put, takeEvery } from "redux-saga/effects";
import { exchangeInstance } from "../exchange.service";
import { getScheduleSuccess } from "./actions";
import * as types from "./types";

function* getScheduleWorker() {
  try {
    const response = yield exchangeInstance.get("/schedules");
    let isClosed = false;

    if (response.data?.length) {
      response.data.forEach((day) => {
        const currentDay = new Date().getDay();

        if (day.idDayOfWeek === currentDay) {
          if (!day.isWorkingDay) {
            return (isClosed = true);
          }

          const isAfterStartTime = isAfter(new Date(), parse(day.startTime, "HH:mm:ss", new Date()));
          const isBeforeEndTime = isBefore(new Date(), parse(day.endTime, "HH:mm:ss", new Date()));

          if (!isAfterStartTime || !isBeforeEndTime) {
            return (isClosed = true);
          }
        }
      });
    }

    yield put(getScheduleSuccess(isClosed));
  } catch (error) {
    console.log(error);
  }
}

function* getScheduleWatcher() {
  yield takeEvery(types.GET_SCHEDULE.PENDING, getScheduleWorker);
}

export default function* utilsSaga() {
  yield all([fork(getScheduleWatcher)]);
}
