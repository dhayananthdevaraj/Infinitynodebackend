import React, { useState } from "react";
import "./MenuModal.css";
import pakoda from "../../../assets/pakoda.jpg";
import paneer from "../../../assets/paneer.jpg";
import samosa from "../../../assets/samosa.png";
import vegcurry from "../../../assets/veycurry.png";
import jalebi from "../../../assets/jalebi.jpg";
import virginMojitho from "../../../assets/virginmojito.jpg";
import { addMenuInfo } from "../../../services/adminModule";
import { useToasts } from "react-toast-notifications";

const MenuModal = ({ onClose, getTheMenu }) => {
  const [show, setShow] = useState(true);

  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("starter");
  const [subCategory, setSubCategory] = useState("veg");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [errors, setErrors] = useState({});
  let { addToast } = useToasts();

  const itemMenu = [pakoda, paneer, samosa, vegcurry, jalebi, virginMojitho];

  const handleClose = () => {
    setShow(false);
    onClose();
  };
  const handleAddItem = () => {
    // Validate fields
    const validationErrors = {};

    if (!itemName) {
      validationErrors.itemName = "Item Name is required";
    }

    if (!itemCategory) {
      validationErrors.itemCategory = "Item Category is required";
    }

    if (!subCategory) {
      validationErrors.subCategory = "Sub Category is required";
    }
    if (!description) {
      validationErrors.description = "Description is required";
    }

    if (!price) {
      validationErrors.price = "Price is required";
    }
    if (+price > 2000) {
      validationErrors.price = "Price should be less than equal to 2000";
    }
    if (+price < 1) {
      validationErrors.price = "Price should be greater than 0";
    }
    if (!itemImage) {
      validationErrors.itemImage = "Image selection is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors(validationErrors);
    }
    addMenu();
    getTheMenu();
  };

  const handleImageSelect = (item) => {
    setItemImage(item);
  };

  const addMenu = async () => {
    const isErrors = Object.keys(errors).length > 0;
    if (!isErrors || Object.values(errors)[0] === "") {
      let payload = {
        status: "available",
        description: description,
        name: itemName,
        category: itemCategory,
        subCategory: subCategory,
        price: price,
        imgPath: itemImage,
      };
      const { data, error } = await addMenuInfo(payload);
      if (data) {
        if (data.error) {
          addToast(data.message, { appearance: "error" });
        } else {
          addToast(data.message, { appearance: "success" });
        }
      } else if (error) {
        addToast(error.message, { appearance: "error" });
      }
      handleClose();
    }
  };

  const handleChange = (value) => {
    if (value === "itemName") {
      errors.itemName = "";
    } else if (value === "itemCategory") {
      errors.itemCategory = "";
    } else if (value === "subCategory") {
      errors.subCategory = "";
    } else if (value === "description") {
      errors.description = "";
    } else {
      errors.price = "";
    }
  };
  return (
    <div>
      <div
        className={`modal fade ${show ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title fs-18">Add New Item</p>
              <button
                type="button"
                className="close"
                onClick={handleClose}
                style={{ fontSize: "30px", lineHeight: "1" }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div>
              <div className="modal-body mt-2">
                <div className="d-flex justify-content-center">
                  {itemMenu.map((item, index) => {
                    const altText = item.split("/").pop().split(".")[0];
                    return (
                      <div className={"col-auto"}>
                        <div
                          className={`${
                            itemImage === item ? "selected-image" : ""
                          }`}
                          key={index}
                          onClick={() => {
                            handleImageSelect(item);
                            handleChange(item);
                          }}
                        >
                          <img
                            src={item}
                            alt={altText}
                            width="65"
                            height="65"
                            style={{
                              boxShadow:
                                itemImage === item
                                  ? "0 0 10px rgba(255, 102, 0, 0.5)"
                                  : "none",
                              borderRadius: "10px",
                              padding: "5px",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                {errors.itemImage && (
                  <div className="text-danger pl-6">
                    <span style={{ paddingLeft: "32px" }}>
                      {errors.itemImage}
                    </span>
                  </div>
                )}
                <div className="modal-body">
                  <div className="mx-3">
                    {" "}
                    {/* Item Name */}
                    <div className="form-group mt-2">
                      <label htmlFor="itemName" style={{ fontSize: 15 }}>
                        Item Name
                        <span
                          style={{
                            color: "red",
                            marginLeft: 2,
                          }}
                        >
                          *
                        </span>
                      </label>
                      <input
                        placeholder="enter item name"
                        type="text"
                        className="form-control"
                        id="itemName"
                        value={itemName}
                        onChange={(e) => {
                          setItemName(e.target.value);
                          handleChange(e.target.id);
                        }}
                      />{" "}
                      {errors.itemName && (
                        <div className="text-danger">{errors.itemName}</div>
                      )}
                    </div>
                    {/* Item Category */}
                    <div className="form-group mt-3">
                      <label htmlFor="itemCategory" style={{ fontSize: 15 }}>
                        Item Category
                        <span
                          style={{
                            color: "red",
                            marginLeft: 2,
                          }}
                        >
                          *
                        </span>
                      </label>
                      <select
                        className="form-control"
                        id="itemCategory"
                        style={{ fontSize: 15 }}
                        value={itemCategory}
                        onChange={(e) => {
                          setItemCategory(e.target.value);
                          handleChange(e.target.id);
                        }}
                      >
                        <option value="starter">Starter</option>
                        <option value="main course">Main Course</option>
                        <option value="deserts">Desert</option>
                        <option value="breverage">Beverage</option>
                      </select>{" "}
                      {errors.itemCategory && (
                        <div className="text-danger">{errors.itemCategory}</div>
                      )}
                    </div>
                    {/* Sub Category */}
                    <div className="form-group mt-3">
                      <label htmlFor="subCategory" style={{ fontSize: 15 }}>
                        Sub Category
                        <span
                          style={{
                            color: "red",
                            marginLeft: 2,
                          }}
                        >
                          *
                        </span>
                      </label>
                      <select
                        className="form-control fs-14"
                        id="subCategory"
                        style={{ fontSize: 15 }}
                        value={subCategory}
                        onChange={(e) => {
                          setSubCategory(e.target.value);
                          handleChange(e.target.id);
                        }}
                      >
                        <option>Veg</option>
                        <option>non veg</option>
                      </select>
                      {errors.subCategory && (
                        <div className="text-danger">{errors.subCategory}</div>
                      )}
                    </div>
                    {/* Description */}
                    <div className="form-group mt-2">
                      <label htmlFor="itemName" style={{ fontSize: 15 }}>
                        Description
                        <span
                          style={{
                            color: "red",
                            marginLeft: 2,
                          }}
                        >
                          *
                        </span>
                      </label>
                      <input
                        placeholder="enter description"
                        type="text"
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                          handleChange(e.target.id);
                        }}
                      />{" "}
                      {errors.description && (
                        <div className="text-danger">{errors.description}</div>
                      )}
                    </div>
                    {/* Price */}
                    <div className="form-group mt-3">
                      <label htmlFor="price" style={{ fontSize: 15 }}>
                        Price
                        <span
                          style={{
                            color: "red",
                            marginLeft: 2,
                          }}
                        >
                          *
                        </span>
                      </label>
                      <input
                        placeholder="enter item price"
                        type="number"
                        className="form-control"
                        id="price"
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                          handleChange(e.target.id);
                        }}
                      />
                      {errors.price && (
                        <div className="text-danger">{errors.price}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer mx-3 ">
              <button
                type="button"
                className="btn w-100"
                onClick={handleAddItem}
                style={{
                  backgroundColor: "#E6AA0A",
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${show ? "show" : ""}`}
        style={{ display: show ? "block" : "none" }}
      ></div>
    </div>
  );
};

export default MenuModal;
