import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PulseLoader } from "react-spinners";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Fill in all fields", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
  
    // Set isLoading to true when submitting the form
    setIsLoading(true);
  
    axios
      .post("https://goldserver-ivzy.onrender.com/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        if (response.data.status === 400) {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.success("Signup successful!", {
            position: toast.POSITION.TOP_CENTER,
          });
          navigate("/login");
        }
      })
      .finally(() => {
        setIsLoading(false);
        setFormData({
          name: "",
          email: "",
          password: "",
        });
      })
      .catch((err) => {
        // Extract the error message from the error object
        const errorMessage = err.response.data.message;
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
  

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            name="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            name="password"
          />
        </div>
        <button className="submit-button" type="submit" disabled={isLoading}>
          {isLoading ? <PulseLoader color="#fff" size={9} /> : "Submit"}
        </button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
