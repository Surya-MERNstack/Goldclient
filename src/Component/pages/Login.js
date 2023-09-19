import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!formData.email || !formData.password) {
  //     toast.error("Fill in all fields", {
  //       position: toast.POSITION.TOP_CENTER,
  //     });
  //     return;
  //   }

  //   setIsLoading(true);

  //   await axios
  //     .post("https://goldserver-ivzy.onrender.com/users/login", {
  //       email: formData.email,
  //       password: formData.password,
  //     })
  //     .then((response) => {
  //       if (response.data.status === 401) {
  //         toast.error(response.data.message, {
  //           position: toast.POSITION.TOP_CENTER,
  //         });
  //       } else if (response.data.status === 402) {
  //         toast.error(response.data.message, {
  //           position: toast.POSITION.TOP_CENTER,
  //         });
  //       }

  //       else {
  //         toast.success(response.data.message, {
  //           position: toast.POSITION.TOP_CENTER,
  //         });
  //         setTimeout(() => {
  //           navigate('/home')
  //         },1000)
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Server error try again!!!", {
  //         position: toast.POSITION.TOP_CENTER,
  //       });
  //     });
  // };
  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!formData.email || !formData.password) {
  //     toast.error("Fill in all fields", {
  //       position: toast.POSITION.TOP_CENTER,
  //     });
  //     return;
  //   }

  //   setIsLoading(true);

  //   try {
  //     await axios
  //       .post("https://goldserver-ivzy.onrender.com/users/login", {
  //         email: formData.email,
  //         password: formData.password,
  //       })
  //       .then((response) => {
  //         if (response.data.status === 401) {
  //           toast.error("Email is incorrect", {
  //             position: toast.POSITION.TOP_CENTER,
  //           });
  //         } else if (response.data.status === 402) {
  //           toast.error("Password is incorrect", {
  //             position: toast.POSITION.TOP_CENTER,
  //           });
  //           console.log(1);
  //         } else if (response.data.status === 200) {
  //           toast.success(response.data.message, {
  //             position: toast.POSITION.TOP_CENTER,
  //           });
  //           console.log(2);
  //           setTimeout(() => {
  //             navigate("/home");
  //           }, 1000);
  //         } else {
  //           toast.error("Server error. Please try again later.", {
  //             position: toast.POSITION.TOP_CENTER,
  //           });
  //           console.log(3);
  //         }
  //       });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.email || !formData.password) {
      toast.error("Fill in all fields", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await axios.post(
        "https://goldserver-ivzy.onrender.com/users/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
  
      const { status, data } = response;
  
      if (status === 401) {
        toast.error(data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else if (status === 402) {
        toast.error(data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else if (status === 200) {
        toast.success(data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        toast.error("Server error. Please try again later.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Email or Password is wrong", {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            required
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
            required
          />
        </div>
        <button className="submit-button" type="submit">
          {isLoading ? <PulseLoader color="#fff" size={9} /> : "Login"}
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
