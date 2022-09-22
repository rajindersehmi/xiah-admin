import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import JwtAuthService from "services/JwtAuthService";
import {
  authenticated,
  setUserPhone,
  showAuthMessage,
  signOutSuccess,
} from "../actions/Auth";
import {
  AUTH_TOKEN,
  SENDOTP,
  SIGNINWITHEMAIL,
  SIGNOUT,
  VERIFYOTP,
} from "../constants/Auth";

export function* sendOtp() {
  yield takeEvery(SENDOTP, function* ({ payload }) {
    const { phone } = payload;
    try {
      const { res, err } = yield call(JwtAuthService.sendOtp, phone);
      if (res?.data?.otp) {
        alert(res.data.otp);
        yield put(setUserPhone(phone));
      }
      if (err) yield put(showAuthMessage(err?.response.data.message));
    } catch (err) {}
  });
}

export function* signInWithEmail() {
  yield takeEvery(SIGNINWITHEMAIL, function* ({ payload }) {
    const { email, pass } = payload;

    try {
      const { res } = yield call(JwtAuthService.login, email, pass);
      if (res?.token) {
        localStorage.setItem(AUTH_TOKEN, res.token);
        yield put(authenticated(res.token));
      }
      if (res?.err) yield put(showAuthMessage(res?.err));
    } catch (err) {
      yield put(showAuthMessage(err?.message));
    }
  });
}

export function* verifyOtp() {
  yield takeEvery(VERIFYOTP, function* ({ payload }) {
    const { phone, otp } = payload;

    try {
      const { res, err } = yield call(JwtAuthService.verifyOtp, phone, otp);

      if (res?.data?.token) {
        localStorage.setItem(AUTH_TOKEN, res.data.token);
        yield put(authenticated(res.data.token));
      }
      if (err) yield put(showAuthMessage(err?.response.data.message));
    } catch (err) {
      yield put(showAuthMessage(err?.response.data.message));
    }
  });
}

export function* signOut() {
  yield takeEvery(SIGNOUT, function* () {
    try {
      localStorage.removeItem(AUTH_TOKEN);
      yield put(signOutSuccess());
    } catch (err) {
      yield put(showAuthMessage(err));
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(sendOtp),
    fork(signInWithEmail),
    fork(signOut),
    fork(verifyOtp),
  ]);
}
