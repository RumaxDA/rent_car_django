import Button from "../atoms/Button";
import Input from "../atoms/Input";
import TextArea from "../atoms/TextArea";
import { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const MAX_LENGTH = 2000;

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_LENGTH) {
      setText(e.target.value);
    }
  };

  return (
    <div className="flex flex-col w-full sm:max-w-3xl mx-auto p-8 my-12 bg-slate-900 text-white rounded-xl shadow-xl border border-slate-800 gap-4">
      <h2 className="text-2xl font-bold mb-2">Contact us</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="text"
          name="name"
          placeholder="First Name"
          value={name}
          onChange={handleName}
        />
        <Input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={lastName}
          onChange={handleLastName}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="text"
          name="number"
          placeholder="Phone Number"
          value={number}
          onChange={handleNumber}
        />
        <Input
          type="email"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmail}
        />
      </div>

      <TextArea
        name="text"
        placeholder="Write your message here..."
        value={text}
        maxLength={2000}
        onChange={handleText}
      />
      <div className="flex justify-end text-xs text-slate-400">
        <span>
          {text.length} / {MAX_LENGTH}
        </span>
      </div>

      <div className="mt-2">
        <Button text="Send" className="w-full" />
      </div>

      <div className="mt-1 text-xs text-slate-400">
        <p>
          By providing your contact details and submitting the form, you consent
          to being contacted to present AutoRent's offer. More information about
          the processing of personal data can be found in the Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default ContactForm;
