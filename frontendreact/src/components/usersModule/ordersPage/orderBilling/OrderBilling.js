import React, { useEffect } from "react";
import "./orderBilling.component.css";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { addOrderItemService } from "../../../../services/userModule";
import { useNavigate } from "react-router-dom";
function OrderBilling({ cartItemsData, changeDishCount,title }) {
  const [subtotal, setsubtotal] = useState(0);
  const [serviceCharge, setserviceCharge] = useState(0);

  let navigate = useNavigate();
  let { addToast } = useToasts();
  useEffect(() => {
    if (cartItemsData.length > 0) {
      const filteredPlacingOrder = cartItemsData.filter(
        (item) => item.count !== 0
      );

      if (filteredPlacingOrder.length > 0) {
        let sTotal = 0;
        setserviceCharge(50);
        filteredPlacingOrder.map((val) => {
          return (sTotal += val.price * val.count);
        });
        setsubtotal(sTotal);
      }
    }
  }, [cartItemsData]);

  let addOrderToCart = async () => {
    let orderDish = cartItemsData.filter((item) => item.count !== 0);

    let subTotal = orderDish.reduce(
      (accumulator, item) => accumulator + item.price * item.count,
      0
    );

    let payload = {
      menuItems: orderDish?.map((item) => item._id),
      customerId: localStorage.getItem("customerID"),
      description: "new order",
      status: "placed",
      tableNo: JSON.parse(localStorage.getItem("tableno"))?.join(",") || null,
      totalPrice: subTotal + serviceCharge,
    };

    const { data, error } = await addOrderItemService(payload);
    if (data) {
      if (data.error) {
        //error
        addToast(data.message, { appearance: "error" });
      } else {
        //toast
        addToast(data.message, { appearance: "success" });
        navigate("/user/payment", { state: { subTotal, serviceCharge } });
      }
    } else if (error) {
      addToast(error.message, { appearance: "error" });
    }
  };
  return (
    <div className="col-md-12 d-flex container-fluid w-100 h-100">
      <div className="col-md-12">
        <div className="card ordercardBilling mt-2">
          <p className="ordersHeading">{title}</p>
          <div className="newinner">
            {cartItemsData.filter((item) => item.count !== 0).length === 0 && (
              <div className="previewText mt-5">
                Please place your food order.
              </div>
            )}

            {cartItemsData.length > 0 &&
              cartItemsData.map((val) => {
                return (
                  <>
                    {val.count > 0 && (
                      <div className="innerCard mb-4">
                        <div>
                          <div className="d-flex justify-content-between mr-1">
                            <p className="dishName ">{val.name}</p>

                            <div>
                              <button
                                className="minubtn btn p-0"
                                onClick={() => {
                                  changeDishCount(val, "delete", val.category);
                                }}
                              >
                                <i
                                  className="fa fa-trash-o"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </div>
                          <p className="dishDescription">{val.description}</p>
                        </div>
                        <div class="orderBillingFlex">
                          <div className="numbercount">
                            <div className="d-flex justify-content-around">
                              <div>
                                <button
                                  className="minubtn btn p-0"
                                  onClick={() => {
                                    changeDishCount(
                                      val,
                                      "decrement",
                                      val.category
                                    );
                                  }}
                                >
                                  <i
                                    className="fa fa-minus mt-2"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </div>
                              <div className="mt-1">{val.count}</div>
                              <div>
                                <button
                                  className="minubtn btn p-0"
                                  onClick={() => {
                                    changeDishCount(
                                      val,
                                      "increment",
                                      val.category
                                    );
                                  }}
                                >
                                  <i
                                    className="fa fa-plus mt-2 "
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="dishPrice">
                            {" "}
                            ₹ {val.price * val.count}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
          </div>
          <div className="paymentdetails ">
            <div className="subtotal">
              <p>Sub Total</p>

              <p>
                {" "}
                ₹{" "}
                {cartItemsData.filter((item) => item.count !== 0).length > 0
                  ? subtotal
                  : 0}{" "}
              </p>
            </div>
            <div className="serviceCharge">
              <p> Service Charges</p>
              <p>
                {" "}
                {cartItemsData.filter((item) => item.count !== 0).length > 0
                  ? `₹ ${serviceCharge}`
                  : "₹ 0"}{" "}
              </p>
            </div>
            <div className="subtotal mt-2 ">
              <p> Total Payables</p>
              <p>
                {" "}
                ₹{" "}
                {cartItemsData.filter((item) => item.count !== 0).length > 0
                  ? subtotal + serviceCharge
                  : 0}
              </p>
            </div>

            <button
              onClick={addOrderToCart}
              className="paynowBtn btn mt-5"
              disabled={
                !cartItemsData.filter((item) => item.count !== 0).length > 0
              }
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderBilling;
