import React, { useState } from "react"
import { Validator } from "../validators/Validator";
import ErrorDisplay from "./Errors/ErrorDisplay";

const Contact = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  const validator = new Validator().addStep<string>(c => c.trim().length > 0, "value cannot be empty or all whitespace");
  const handleSendForm = () => {
    console.log(author, message)
    const messageValidation = validator.validate(message);
    if (!messageValidation.ok) {
      setErrors([...errors, ...messageValidation.errors.map(e => e.reason)])
    }
    const authorValidation = validator.validate(author);
    if (!authorValidation.ok) {
      setErrors([...errors, ...authorValidation.errors.map(e => e.reason)])
    }
    if (!messageValidation.ok || !authorValidation.ok) {
      return
    }
    setErrors([])
  }
  const handleAuthorChange = (e: any) => {
    setAuthor(e.target.value)
  }
  const handleMessageChange = (e: any) => {
    setMessage(e.target.value)
  }
  return (
    <div className="container">
      <div className="row mb-5 justify-content-start">
        <h1 className="display-3 pb-5 pt-5">Contact</h1>
      </div>
      <div className="row mt-5">
        <div className="input-group mt-1 ">
          <div className="input-group-prepend">
            <span className="input-group-text">Send us a message!</span>
          </div>
          <textarea className="form-control" onChange={handleMessageChange} aria-label="With textarea"></textarea>
        </div>
        <div className="input-group mt-1 mb-5">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Name</span>
          </div>
          <input type="text" className="form-control" onChange={handleAuthorChange} placeholder="Your name" aria-label="Username"
            aria-describedby="basic-addon1">
          </input>
          <a href="#" onClick={handleSendForm} className="btn btn-primary btn-block mt-1">Send</a>
        </div>
        <ErrorDisplay errors={errors} />
      </div>
      <div className="row mt-5">
        <div className="col">
          <ul className="list-group-flush mb-5">
            <li className="list-group-item d-flex justify-content-between">
              <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-telephone-fill" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M2.267.98a1.636 1.636 0 0 1 2.448.152l1.681 2.162c.309.396.418.913.296 1.4l-.513 2.053a.636.636 0 0 0 .167.604L8.65 9.654a.636.636 0 0 0 .604.167l2.052-.513a1.636 1.636 0 0 1 1.401.296l2.162 1.681c.777.604.849 1.753.153 2.448l-.97.97c-.693.693-1.73.998-2.697.658a17.47 17.47 0 0 1-6.571-4.144A17.47 17.47 0 0 1 .639 4.646c-.34-.967-.035-2.004.658-2.698l.97-.969z" />
              </svg>
              <span>Phone</span>
              <span>321-321-321</span>
            </li>
            <li className="list-group-item" >
              <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-camera-fill" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path fill-rule="evenodd"
                  d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
              </svg>
              <span>Instagram</span>
              <span>@foobarski</span>
            </li>
            <li className="list-group-item" >
              <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-chat-fill" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
              </svg>
              <span>WhatsApp</span>
              <span>321-321-321</span>
            </li>
          </ul>
        </div>
        <div className="col-6">
          <div className="container">
            <ul>
              <li>
                <div className="row">
                  <div className="col">
                    Monday
                  </div>
                  <div className="col">
                    08:00 - 16:00
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col">
                    Wednesday
                  </div>
                  <div className="col">
                    08:00 - 16:00
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col">
                    Tuesday
                  </div>
                  <div className="col">
                    08:00 - 16:00
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col">
                    Thursday
                  </div>
                  <div className="col">
                    08:00 - 16:00
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-md">
                    Friday
                  </div>
                  <div className="col">
                    08:00 - 16:00
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-md">
                    Saturday
                  </div>
                  <div className="col">
                    08:00 - 16:00
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-md">
                    Sunday
                  </div>
                  <div className="col">
                    08:00 - 16:00
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="col ">
          <p className="lead">Our location</p>
          <ul>
            <li><p>Poland</p></li>
            <li><p>Warsaw 02-008</p></li>
            <li><p>Koszykowa 86</p></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Contact