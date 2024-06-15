import React from "react";
import { useContext } from "react";
import { CounterContext } from "./CounterContext";
import "./Home.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Un from "../assets/undraw_artificial_intelligence_re_enpp.svg";
import Travel from "../assets/travel1.svg";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  let { user, setUser } = useContext(CounterContext);

  let navigate = useNavigate();

  function redirect() {
    navigate("/search");
  }

  return (
    <div>
      <div className="homepage">
        {/* Hero Section */}
        <Navbar></Navbar>
        {user && (
          <div className="text-center">
            <h5
              className="mt-14 text-3xl d-inline-block"
              style={{
                color: "transparent",
                width: "500px",
                backgroundImage: "linear-gradient(to right, #c94b4b, #4b134f)",
                backgroundClip: "text",
              }}
            >
              Welcome {user.firstname}, Explore our Services
            </h5>
            <button
              className="btn btn-secondary "
              style={{ position: "absolute", top: "130px" }}
              onClick={redirect}
            >
              {" "}
              Search Location{" "}
            </button>
          </div>
        )}
        <div className="ms-4 me-4  mb-5" style={{ marginTop: "90px" }}>
          <div className="d-flex justify-content-between mt-5 ">
            <img className="ms-5" width={"500px"} src={Un} alt="" />
            <section
              className="hero w-50 rounded-4 "
              style={{ height: "300px", paddingTop: "90px" }}
            >
              <div className="hero-content">
                <h5>AI-Powered Location Insights</h5>
                <p>Explore your location history with advanced AI analytics.</p>
                <a href="#features" className="btn btn-outline-light">
                  Discover More
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="">
        <p
          className="text-center text-3xl pt-5 pb-2"
          style={{ fontFamily: "fantasy" }}
        >
          F E A T U R E S
        </p>
      </div>
      <div className="mb-5 pt-5">
        <div className="d-flex justify-content-between container">
          <div class="max-w-sm rounded-3 overflow-hidden shadow-lg bg-light hover:scale-105 duration-200">
            <img
              className="w-full"
              src="http://cdn.wallpapersafari.com/24/0/PJ05BG.jpg"
              alt="Sunset in the mountains"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">
                Explore Historical Insights of Any Location
              </div>
              <p class="text-gray-700 text-base">
                Explore the rich history of any place with our interactive
                location history search tool. Whether you're curious about
                ancient civilizations, pivotal events, or cultural heritage, our
                website provides detailed insights at your fingertips.
              </p>
            </div>
            <div class="px-6 pt-4 d-flex justify-content-center pb-2">
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #photography
              </span>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #travel
              </span>
              {/* <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span> */}
            </div>
          </div>
          <div class="max-w-sm rounded-3 overflow-hidden shadow-lg bg-light hover:scale-105 duration-200">
            <img
              class="w-full mx-auto"
              src="https://wallpaperaccess.com/full/1431673.jpg"
              alt="Sunset in the mountains"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">
                Discover Fascinating Narratives
              </div>
              <p class="text-gray-700 text-base">
                Our website allows you to explore the captivating history behind
                any location worldwide. Whether you're researching for
                educational purposes, planning a trip, or simply curious, our
                comprehensive tool provides in-depth insights into significant
                events, cultural landmarks, and historical figures associated
                with your chosen destination.
              </p>
            </div>
            <div class="px-6 pt-4 d-flex justify-content-center pb-2">
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #photography
              </span>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #travel
              </span>
              {/* <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span> */}
            </div>
          </div>
          <div class="max-w-sm rounded-3 overflow-hidden shadow-lg bg-light  hover:scale-105 duration-200">
            <img
              class="w-full mx-auto"
              src="https://cdn.wallpapersafari.com/52/24/5nr3L2.jpg"
              alt="Sunset in the mountains"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Educational and Cultural Resource</div>
              <p class="text-gray-700 text-base">
              Ideal for students, educators, and travelers, our platform serves as an invaluable resource for understanding the historical context of places around the globe. Gain a deeper appreciation for the cultural heritage and historical significance that shapes our world today.
              </p>
            </div>
            <div class="px-6 pt-4 d-flex justify-content-center pb-2">
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #photography
              </span>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #travel
              </span>
              {/* <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span> */}
            </div>
          </div>
        </div>
      </div>

      <div className="ms-4 me-4  mb-5" style={{ marginTop: "100px" }}>
        <div className="d-flex justify-content-between mt-5 ">
          <section
            className="hero w-50 rounded-4 "
            style={{ height: "300px", paddingTop: "90px" }}
          >
            <div className="hero-content">
              <h5>AI-Powered Location Insights</h5>
              <p>Explore your location history with advanced AI analytics.</p>
              <a href="#features" className="btn btn-outline-light">
                Discover More
              </a>
            </div>
          </section>
          <img className="me-5" width={"500px"} src={Travel} alt="" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;