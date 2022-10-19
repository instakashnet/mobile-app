import * as types from "./types";

export const openModal = () => ({
  type: types.OPEN_MODAL,
});

export const closeModal = () => ({
  type: types.CLOSE_MODAL,
});

export const getSchedule = () => ({
  type: types.GET_SCHEDULE.PENDING,
});
export const getScheduleSuccess = (closed) => ({
  type: types.GET_SCHEDULE.SUCCESS,
  payload: closed,
});
export const getScheduleFailed = () => ({
  type: types.GET_SCHEDULE.FAILED,
});
