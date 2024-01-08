import serviceUtil from "../../utils";

const getPaymentInfo = async () => {
  try {
    const { data } = await serviceUtil.get(`restaurant/getAllPayments`);
    return { data };
  } catch (error) {
    return { error };
  }
};

const getUsersInfo = async () => {
  try {
    const { data } = await serviceUtil.get(`/restaurant/getAllUsers`);
    return { data };
  } catch (error) {
    return { error };
  }
};
const getRatingInfo = async () => {
  try {
    const { data } = await serviceUtil.get(`/user/getAllRatings`);
    return { data };
  } catch (error) {
    return { error };
  }
};


const getMenuInfo = async () => {
  try {
    const { data } = await serviceUtil.get(`restaurant/getAllMenu`);
    return { data };
  } catch (error) {
    return { error };
  }
};

const getTableInfo = async () => {
  try {
    const { data } = await serviceUtil.get(`/restaurant/table`);
    return { data };
  } catch (error) {
    return { error };
  }
};

const editTableInfo = async (payload) => {
  try {
    const { data } = await serviceUtil.put(
      `/restaurant/table/editStatus`,
      payload
    );
    return { data };
  } catch (error) {
    return { error };
  }
};
const addTableInfo = async (payload) => {
  try {
    const { data } = await serviceUtil.post(`/restaurant/addTable`, payload);
    return { data };
  } catch (error) {
    return { error };
  }
};

const editMenuInfo = async (payload) => {
  try {
    const { data } = await serviceUtil.put(
      `/restaurant/editMenu/${payload._id}`,
      payload
    );
    return { data };
  } catch (error) {
    return { error };
  }
};

const addMenuInfo = async (payload) => {
  try {
    const { data } = await serviceUtil.post(`/restaurant/addMenu`, payload);
    return { data };
  } catch (error) {
    return { error };
  }
};

export {
  getMenuInfo,
  getUsersInfo,
  getPaymentInfo,
  getTableInfo,
  editTableInfo,
  editMenuInfo,
  addTableInfo,
  addMenuInfo,
  getRatingInfo
};
