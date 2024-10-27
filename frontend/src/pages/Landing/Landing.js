import "./landing.css";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import { Formik, Form, Field } from "formik";
import { TextField, Button, Box, Typography } from "@mui/material";
import 'react-multi-carousel/lib/styles.css';
import ContactForm from "../Help/ContactForm";
import EmailSent from "../Help/EmailSent";


import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


import image1 from "../../images/recipe1.jpg";
import image2 from "../../images/recipe2.jpg";
import image3 from "../../images/recipe3.jpg";
import image4 from "../../images/recipe4.jpg";
import image5 from "../../images/recipe5.jpg";
import image6 from "../../images/recipe6.jpg";
import image7 from "../../images/recipe7.jpg";
import tacos from "../../images/tacos.avif";
import salad from "../../images/salad.avif";
import pasta from "../../images/pasta.avif";
import dumplings from "../../images/dumpies.jpeg";
import fruit from "../../images/fruit.jpeg";
import mac from "../../images/mac.jpeg";
import rigatoni from "../../images/rigatoni.jpeg";
import steak from "../../images/steak.jpeg";
import lobster from "../../images/lobster.jpeg";
import fries from "../../images/fries.jpeg";
import bowl from "../../images/bowl.jpeg";
import soup from "../../images/soup.webp";
import smoothie from "../../images/smoothie.jpeg";

import aboutImage from "../../images/about-image.jpg";

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  const Landing = ({ setLoggedIn }) => {
    const navigate = useNavigate();
  
    const handleRegisterClick = () => {
      navigate("/Register");
    };
  
    const handleLoginClick = () => {
      navigate("/Login");
    };
    const [isMenuOpen, setMenuOpen] = useState(false);
  
    const navRef = useRef(null);
    
    const [openAbout, setOpenAbout] = useState(false);
    const [openContact, setOpenContact] = useState(false);

    const openAboutHandler = () => {
      setOpenAbout(true);
    };

    const openContactHandler = () => {
      setOpenContact(true);
    };

    const [isEmailSent, setIsEmailSent] = useState(false);
          const handleReset = () => {
              setIsEmailSent(false);
          };
   
    useEffect(() => {
      function handleClickOutside(event) {
        if (navRef.current && !navRef.current.contains(event.target)) {
          setMenuOpen(false);
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [navRef]);
  
    return (
      <div className="landing-container">
        <div className="landing-nav" ref={navRef} >
          <h1>Recipe Remix</h1>
          <div
            className="hamburger-menu"
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            ☰
          </div>
          <div className={`nav-content ${isMenuOpen ? "show" : ""}`}>
            <span
              className="close-menu"
              onClick={() => setMenuOpen(false)}
            >
              
            </span>

            <h2 onClick={openAboutHandler} style={{ cursor: "pointer" }} className="nav-about">
              About
            </h2>

            <h2 onClick={openContactHandler} style={{ cursor: "pointer" }} className="nav-contact">
              Contact
            </h2>
            
            <div className="landing-nav-button">
              <button
                type="button"
                className="landing-login"
                onClick={handleLoginClick}
              >
                Login
              </button>
              <button
                type="button"
                className="landing-signup"
                onClick={handleRegisterClick}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <div className="main-content">
          <div className="landing-center-container">
            <h2>
              Find Recipes you can make, Fast and Simple
            </h2>
          </div>
    
          <div className="landing-bottom-container">
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlay={true} 
            autoPlaySpeed={3000} 
            keyBoardControl={true}
            customTransition="transform 500ms ease-in-out"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType="desktop"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            additionalTransfrom={80}
          >
            <div className="carousel-image-container">
              <img
                className="carousel-image"
                src={smoothie}
                alt=""
                style={{ width: "400px", height: "400px", borderRadius: "10%" }}
              />
            </div>
            <div className="carousel-image-container">
              <img
                className="carousel-image"
                src={fries}
                alt=""
                style={{ width: "400px", height: "400px", borderRadius: "10%" }}
              />
            </div>
            <div className="carousel-image-container">
              <img
                className="carousel-image"
                src={tacos}
                alt=""
                style={{ width: "400px", height: "400px", borderRadius: "10%" }}
              />
            </div>
            <div className="carousel-image-container">
              <img
                className="carousel-image"
                src={dumplings}
                alt=""
                style={{ width: "400px", height: "400px", borderRadius: "10%" }}
              />
            </div>
            <div className="carousel-image-container">
              <img
                className="carousel-image"
                src={steak}
                alt=""
                style={{ width: "400px", height: "400px", borderRadius: "10%" }}
              />
            </div>
            <div className="carousel-image-container">
              <img
                className="carousel-image"
                src={soup}
                alt=""
                style={{ width: "400px", height: "400px", borderRadius: "10%" }}
              />
            </div>
            <div className="carousel-image-container">
              <img
                className="carousel-image"
                src={bowl}
                alt=""
                style={{ width: "400px", height: "400px", borderRadius: "10%" }}
              />
            </div>
          </Carousel>
            
          </div>
        </div>
        


        

        <Popup
          class="about"
          open={openAbout}
          onClose={() => setOpenAbout(false)}
          contentStyle={{ borderRadius: '5%', background: '#C6EBC5', overflowY: 'hidden'}}
        >
          <div class="about">
            
            <div class="text">
            
              <h5>Meet the Creators of Recipie Remix</h5>
              <img src={aboutImage} class="pic" />
              <p>
                Recipie Remix was founded by six food-loving students with a passion for software development. They had a deep desire to allivate other hungry students of the challeges they faced on a daily  basis.
              </p>
              <p>Together, Andree, Tim, Ryan, Louis, Michael, and Khoa form the heart and soul of Recipie Remix. Join us on our culinary adventure as we remix recipes and make cooking a delightful experience for everyone!</p>
            </div>
          </div>
        </Popup>

        <Popup
          class="about"
          open={openContact}
          onClose={() => setOpenContact(false)}
          contentStyle={{ borderRadius: '10%', background: '#C6EBC5'}}
          
        >
          

          
              <Box 
                  // sx={{
                  //     mt: 2,  // Vertical margin
                  //     display: "flex",
                  //     flexDirection: "column",
                  //     alignItems: "center",
                  //     justifyContent: "center",
                  //     minHeight: "80vh", // Ensure it takes at least the full height of the viewport
                  // }}
              >
                  <Box
                      sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "#a1c298",
                          borderRadius: "8px",
                          p: 4,
                          width: ["90%", "60%", "40%", "60%"],  // Responsive width
                          mx: "auto",
                          my: 4,  // Vertical margin
                          textAlign: "center",  // Ensure all text inside is centered
                          fontSize: ["3vw", "2vw", "1.5vw", "1vw"],  // Responsive font size
                      }}
                  >
                      {isEmailSent ? (
                          <EmailSent onReset={handleReset} />
                      ) : (
                          <ContactForm userEmail={localStorage.email} onEmailSent={() => setIsEmailSent(true)} />
                      )}
              </Box>
          </Box>
          
        </Popup>
      </div>
    );
  };
  
  export default Landing;