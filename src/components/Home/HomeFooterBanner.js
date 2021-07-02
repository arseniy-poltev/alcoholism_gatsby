import React from "react"
import { FaBlenderPhone, FaPhone } from "react-icons/fa"
import { IoIosCall, IoMdCall } from "react-icons/io"
import { IoCall } from "react-icons/io5"
import PhoneIcon from "../../assets/Icons/phone.svg"

export default function HomeFooterBanner() {
  return (
    <section className="footer-banner footer-banner--home">
      <div className="container">
        <div>
          <h2>You’re only a call away from changing your life!</h2>
          <button className="btn btn-primary-outlined">
            <PhoneIcon />
            GIVE US A CALL TODAY
          </button>
        </div>
      </div>
    </section>
  )
}
