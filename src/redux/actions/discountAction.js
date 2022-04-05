import axios from "axios";
import { setAuthHeaders } from "../../utils/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
toast.configure();

const getDiscounts = (discounts) => ({
  type: "GET_ALL_DISCOUNTS",
  payload: discounts,
});

export const loadAllDiscounts = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_HOST}/discount/all`, setAuthHeaders())
      .then((res) => {
        dispatch(getDiscounts(res.data));
      })
      .catch((error) => toast.error(error));
  };
};

export const loadUpcomingDiscounts = () => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/discount/status/upcoming`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "GET_UPCOMING_DISCOUNTS",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const loadHappeningDiscounts = () => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/discount/status/happening`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "GET_HAPPENING_DISCOUNTS",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const loadExpiredDiscounts = () => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/discount/status/expired`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "GET_EXPIRED_DISCOUNTS",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const createDiscount = (started_at, ended_at, percent, title) => {
  return function (dispatch) {
    const headers = setAuthHeaders();
    axios
      .post(
        `${process.env.REACT_APP_HOST}/discount/new`,
        {
          started_at,
          ended_at,
          percent,
          title,
        },
        headers
      )
      .then((res) => {
        toast.success("Create Discount Successfully");
        dispatch({
          type: "CREATE_DISCOUNT",
          payload: res.data,
        });
        dispatch(loadUpcomingDiscounts());
      })
      .catch((error) => toast.error(error));
  };
};

export const updateDiscount = (name, address, status, id) => {
  return function (dispatch) {
    const headers = setAuthHeaders();
    axios
      .put(
        `${process.env.REACT_APP_HOST}/branch/` + id,
        {
          name,
          address,
          status,
        },
        headers
      )
      .then((res) => {
        toast.success("Update Successfully");
        dispatch({
          type: "UPDATE_BRANCH",
          payload: res.data,
        });
        // dispatch(loadBranchs());
      })
      .catch((error) => toast.error(error));
  };
};
