import "./contact.css";
import { MdEmail } from "react-icons/md";
import Lottie from "lottie-react";
import { useForm, ValidationError } from "@formspree/react";
import doneAnimation from "../../animation/done.json";
import contactAnimation from "../../animation/contact.json";

const Contact = () => {
  const [state, handleSubmit] = useForm("mvgaqkkp");

  return (
    <section className="contact">
      <h2 className="flex">
        Contact Us
        <MdEmail />
      </h2>
      <p className="contact-text">
        If you have any questions or feedback, feel free to reach out to us.
      </p>

      <div style={{ justifyContent: "space-between" }} className="flex">
        <form onSubmit={handleSubmit}>
          <div className="flex form-group">
            <label htmlFor="email">Email Adress:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Adress"
              required
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>
          <div className="flex form-text-group">
            <label htmlFor="message">Your Message:</label>
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              required
            ></textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>
          <button type="submit" disabled={state.submitting} className="submit">
            Submit
          </button>

          {state.succeeded && (
            <p className="success flex">
              <Lottie
                loop={false}
                style={{ height: 30 }}
                animationData={doneAnimation}
              />
              Thanks for your message!
            </p>
          )}
        </form>

        <div className="animation"> <Lottie 
        className='animation'
         style={{height: 400,
          transform: "translateY(-40px)"
         }} animationData={contactAnimation} /></div>
      </div>
    </section>
  );
};
export default Contact;
