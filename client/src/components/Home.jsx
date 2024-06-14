import React from "react";
import "./Home.css";
import Navbar from "./Navbar";
import Un from "../assets/undraw_artificial_intelligence_re_enpp.svg";
import Travel from '../assets/travel1.svg'

const Home = () => {
  return (
    <div>
      <div className="homepage">
        {/* Hero Section */}
        <Navbar></Navbar>
        <div className="ms-4 me-4  mb-5" style={{ marginTop: "100px" }}>
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
      <p className="text-center text-3xl pt-5 pb-2" style={{fontFamily:"fantasy"}}>
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
            <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
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
            <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
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
            <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
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


    </div>
  );
};

export default Home;
