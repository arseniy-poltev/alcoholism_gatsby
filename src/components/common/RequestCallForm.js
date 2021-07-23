import React from "react"
import Button from "react-bootstrap/Button"
import PhoneIcon from "../../assets/Icons/phone.svg"
import UserIcon from "../../assets/Icons/user.svg"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

export default function RequestCallForm({ className, text }) {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Please enter your first name"),
    phoneNumber: Yup.string().required("Please enter a valid US phone number"),
  })
  const formOptions = { resolver: yupResolver(validationSchema) }
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    control,
    formState,
  } = useForm(formOptions)
  const { errors, isValid } = formState

  function onSubmit(formData) {
    console.log("RequestCallForm->onSubmit", formData)
    alert(JSON.stringify(formData))
  }

  function handleChange(e) {
    var x = e.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
    e.target.value = !x[2]
      ? x[1]
      : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "")
    console.log("x", x, e.target.value)
  }

  return (
    <form
      className={`call-form ${className}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3>{text}</h3>
      <div>
        <div className="call-form__input-wrapper">
          <UserIcon />
          <input
            {...register("firstName")}
            className="input-outlined"
            name="firstName"
            type="text"
            placeholder="First Name"
          />
          {/* <span className="error">{errors.firstName?.message}</span> */}
        </div>
        <div className="call-form__input-wrapper">
          <PhoneIcon />
          <input
            {...register("phoneNumber")}
            className="input-outlined"
            name="phoneNumber"
            type="text"
            placeholder="Phone Number"
            onChange={handleChange}
          />
          {/* <span className="error">{errors.phoneNumber?.message}</span> */}
        </div>
      </div>
      <div className="d-flex flex-column">
        {errors.firstName && (
          <span className="error">{errors.firstName?.message}</span>
        )}
        {errors.phoneNumber && (
          <span className="error">{errors.phoneNumber?.message}</span>
        )}
      </div>
      <div className="call-form__action">
        <Button variant="warning" className="btn-transform" type="submit">
          <PhoneIcon />
          Request a call
        </Button>
      </div>
    </form>
  )
}
