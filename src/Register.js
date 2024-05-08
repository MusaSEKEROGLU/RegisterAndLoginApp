import React, { Fragment, useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleNameChange = (value) => {
    setName(value);
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  const handleAddressChange = (value) => {
    setAddress(value);
  };

  const handleSave = () => {
    const data = {
      Name: name,
      Phone: phone,
      Address: address,
      IsActive: 1,
    };
    const url = "https://localhost:44379/api/Accounts/Registration";
    axios
      .post(url, data)
      .then((result) => {
        alert(result.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-3 ml-5">
          <h4 className="mt-2">Müşteri Kayit Formu</h4>
          <br></br>
          <h5>Kullanici Adiniz</h5>
          <input
            className="form-control "
            type="text"
            id="txtName"
            placeholder="Kullanici Adinizi giriniz"
            onChange={(e) => handleNameChange(e.target.value)}
          />
          <br />
          <h5>Telefon Numaraniz</h5>
          <input
            className="form-control"
            type="text"
            id="txtPhone"
            placeholder="Telefon Numaranizi giriniz"
            onChange={(e) => handlePhoneChange(e.target.value)}
          />
          <br />
          <h5>Adresiniz</h5>
          <input
            className="form-control"
            type="text"
            id="txtAddress"
            placeholder="Adresinizi giriniz"
            onChange={(e) => handleAddressChange(e.target.value)}
          />
          <br />
          <br />
          <button
            className="form-control btn btn-success"
            onClick={() => handleSave()}
          >
            Kaydet
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default Register;
