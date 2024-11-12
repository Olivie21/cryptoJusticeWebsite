import React, { useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import emailjs from "@emailjs/browser";
import { CreditCard, Phone } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ContactForm = () => {
  const [forms, setForms] = useState({
    name: "",
    lastName: "",
    email: "",
    subject: "",
    phoneCountry: "",
    phoneNumber: "",
    message: "",
  });

  const [validator] = useState(
    new SimpleReactValidator({
      className: "errorMessage",
    })
  );

  const changeHandler = (e) => {
    setForms({ ...forms, [e.target.name]: e.target.value });
    if (validator.allValid()) {
      validator.hideMessages();
    } else {
      validator.showMessages();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      emailjs
        .send(
          "service_fych5s9", // Replace with your EmailJS service ID
          "template_yec3pom", // Replace with your EmailJS template ID
          {
            name: forms.name,
            lastName: forms.lastName,
            email: forms.email,
            subject: forms.subject,
            number: `${forms.phoneCountry} ${forms.phoneNumber}`,
            message: forms.message,
          },
          "t9jF6P2AVyFydH7lG" // Replace with your EmailJS user ID
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);
            setForms({
              name: "",
              lastName: "",
              email: "",
              subject: "",
              phoneCountry: "+1",
              phoneNumber: "",
              message: "",
            });
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );
      validator.hideMessages();
    } else {
      validator.showMessages();
    }
  };

  return (
    <form
      method="post"
      className="contact-validation-active mx-[-15px] overflow-hidden contact-form"
      id="contact-form-main"
      onSubmit={(e) => submitHandler(e)}
    >
      {/* Name and Last Name */}
      <div className="w-[calc(50%-30px)] float-left mx-[15px] mb-[25px] col:float-none col:w-[calc(100%-25px)]">
        <input
          className="form-control w-full font-normal bg-[rgba(192,181,150,.2)] h-[50px] border border-[rgba(192,181,150,.5)] text-[#c0b596] transition-all pl-[15px] focus:outline-0 focus:shadow-none focus:border-transparent  "
          value={forms.name}
          type="text"
          name="name"
          onBlur={(e) => changeHandler(e)}
          onChange={(e) => changeHandler(e)}
          placeholder="Your Name"
        />
        {validator.message("name", forms.name, "required|alpha_space")}
      </div>
      <div className="w-[calc(50%-30px)] float-left mx-[15px] mb-[25px] col:float-none col:w-[calc(100%-25px)]">
        <input
          className="form-control w-full font-normal bg-[rgba(192,181,150,.2)] h-[50px] border border-[rgba(192,181,150,.5)] text-[#c0b596] transition-all pl-[15px] focus:outline-0 focus:shadow-none focus:border-transparent  "
          value={forms.lastName}
          type="text"
          name="lastName"
          onBlur={(e) => changeHandler(e)}
          onChange={(e) => changeHandler(e)}
          placeholder="Your Last Name"
        />
        {validator.message("lastName", forms.lastName, "required|alpha_space")}
      </div>

      {/* Email and Phone */}
      <div className="w-[calc(50%-30px)] float-left mx-[15px] mb-[25px] col:float-none col:w-[calc(100%-25px)]">
        <input
          className="form-control  w-full font-normal bg-[rgba(192,181,150,.2)] h-[50px] border border-[rgba(192,181,150,.5)] text-[#c0b596] transition-all pl-[15px] focus:outline-0 focus:shadow-none focus:border-transparent "
          value={forms.email}
          type="email"
          name="email"
          onBlur={(e) => changeHandler(e)}
          onChange={(e) => changeHandler(e)}
          placeholder="Your Email"
        />
        {validator.message("email", forms.email, "required|email")}
      </div>
      <div className="w-[calc(50%-30px)] float-left mx-[15px] mb-[25px] col:float-none col:w-[calc(100%-25px)]">
        <div className="flex items-center ">
          <PhoneInput
            country={"us"}
            value={forms.phoneNumber}
            onChange={(e) => setForms({ ...forms, phoneNumber: e })}
            // onChange={handlePhoneChange}
            // onChange={(e) => changeHandler(e)}
            // placeholder="Your Phone"
            inputClass="form-control w-full font-normal bg-[rgba(192,181,150,.2)] h-[50px] border border-[rgba(192,181,150,.5)] text-[#c0b596] transition-all  focus:outline-0 focus:shadow-none focus:border-transparent"
          />
          {/* <input
            className="form-control  w-full font-normal bg-[rgba(192,181,150,.2)] h-[50px] border border-[rgba(192,181,150,.5)] text-[#c0b596] transition-all pl-[15px] focus:outline-0 focus:shadow-none focus:border-transparent "
            value={forms.phoneNumber}
            type="text"
            name="phoneNumber"
            onBlur={(e) => changeHandler(e)}
            onChange={(e) => changeHandler(e)}
            placeholder="Your Phone"
          /> */}
        </div>
        {validator.message(
          "phone",
          `${forms.phoneCountry} ${forms.phoneNumber}`,
          "required"
        )}
      </div>

      {/* Subject and Message */}
      <div className="w-[calc(50%-30px)] float-left mx-[15px] mb-[25px] col:float-none col:w-[calc(100%-25px)]">
        <select
          className="form-control  w-full font-normal bg-[rgba(192,181,150,.2)] h-[50px] border border-[rgba(192,181,150,.5)] text-[#c0b596] transition-all pl-[15px] focus:outline-0 focus:shadow-none focus:border-transparent "
          onBlur={(e) => changeHandler(e)}
          onChange={(e) => changeHandler(e)}
          value={forms.subject}
          name="subject"
        >
          <option value="">Select a Subject</option>
          <option value="Crypto Recovery">Crypto Recovery</option>
          <option value="Stock Recovery">Stock Recovery</option>
          <option value="Stolen Funds">Stolen Funds</option>
        </select>
        {validator.message("subject", forms.subject, "required")}
      </div>
      <div className="w-[calc(100%-25px)] mb-[25px] mx-[15px]">
        <textarea
          className="form-control  w-full bg-[rgba(192,181,150,.2)] h-[150px] border border-[rgba(192,181,150,.5)]  text-[#c0b596] transition-all pt-[15px] pl-[15px] focus:outline-0 focus:shadow-none focus:border-transparent "
          onBlur={(e) => changeHandler(e)}
          onChange={(e) => changeHandler(e)}
          value={forms.message}
          name="message"
          placeholder="Message"
        ></textarea>
        {validator.message("message", forms.message, "required")}
      </div>

      {/* Submit Button */}
      <div className="text-left w-full mb-[10px] ml-[16px]">
        <button
          type="submit"
          className="bg-[#c0b596] text-[16px] font-semibold text-white px-[38px] py-[10px]  capitalize inline-block mt-[6px] transition ease-in-out duration-300 hover:bg-[#d4c291]
col:mb-[5px] col:mt-[15px] col:text-[15px] col:px-[18px] col:py-[8px] cursor-pointer "
        >
          Send Message
        </button>
        <div id="loader">
          <i className="ti-reload"></i>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
