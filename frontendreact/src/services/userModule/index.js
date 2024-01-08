import serviceUtil from "../../utils";

const bookTableService = async (payload) => {
  try {
    const { data } = await serviceUtil.post(`/user/bookTable`, payload);
    return { data };
  } catch (error) {
    return { error };
  }
};

const addOrderItemService = async (payload) => {
  try {
    const { data } = await serviceUtil.post(`/user/order`, payload);
    return { data };
  } catch (error) {
    return { error };
  }
};

const addPaymentService = async (payload) => {
  try {
    const { data } = await serviceUtil.post(`user/payment`, payload);
    return { data };
  } catch (error) {
    return { error };
  }
};

const getOrderIDService = async (ID) => {
  try {
    const { data } = await serviceUtil.get(`user/order/review/${ID}`);
    return { data };
  } catch (error) {
    return { error };
  }
};

const addRatingService = async (payload) => {
  try {
    const { data } = await serviceUtil.post(`user/ratings`, payload);
    return { data };
  } catch (error) {
    return { error };
  }
};

export { bookTableService, addOrderItemService,addPaymentService,getOrderIDService,addRatingService };
