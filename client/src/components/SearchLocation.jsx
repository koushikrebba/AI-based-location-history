import React, { useState, useEffect, useContext } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { CounterContext } from './CounterContext'
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import { FiMic } from "react-icons/fi";
import { IoMicOffOutline } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";

const GOOGLE_API_KEY = "AIzaSyCGSdaN9SXGUXBOepJ7C4QHAqxq4UjKCUU";
const SEARCH_ENGINE_ID = "93f8aa2ac09d147ab";
const GEMINI_API_KEY = "AIzaSyDBEWj146SV_kfPYtQFIyTZEE_l0AiCidA";

function GoogleMap({ coordinates }) {
  const mapUrl = `https://maps.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="p-3 min-h-[400px] my-3 rounded-lg border">
      <div className="mapouter">
        <div className="gmap_canvas">
          <iframe
            title="Google Map"
            src={mapUrl}
            frameBorder="0"
            scrolling="no"
            className="w-full h-full"
          ></iframe>
          <style>
            {`
              .mapouter {
                position: relative;
                height: 100%;
                width: 100%;
                background: #fff;
              }
              .gmap_canvas {
                overflow: hidden;
                height: 100%;
                width: 100%;
              }
              .gmap_canvas iframe {
                position: relative;
                z-index: 2;
              }
            `}
          </style>
        </div>
      </div>
    </div>
  );
}

function SearchLocation() {

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [answerHistory, setAnswerHistory] = useState("");
  const [answerImportance, setAnswerImportance] = useState("");
  const [answerEvent, setAnswerEvent] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [coordinates, setCoordinates] = useState({});
  const [activeTab, setActiveTab] = useState("history");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [pastSearches, setPastSearches] = useState([]);
  let { user, setUser } = useContext(CounterContext)
  const [inputMode, setInputMode] = useState("manual"); // 'manual' or 'voice'

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [images]);


  useEffect(() => {
    if (answerHistory && answerImportance && answerEvent) {
      const newSearch = {
        city: query || transcript,
        history: answerHistory,
        importance: answerImportance,
        events: answerEvent,
      };
      setPastSearches((prevSearches) => [...prevSearches, newSearch]);

      axios.post('http://localhost:4000/add-past', {
        user: user.email,
        city: newSearch.city,
        history: newSearch.history,
        events: newSearch.events,
        importance: newSearch.importance
      });
    }
  }, [answerHistory, answerImportance, answerEvent]);

  const handleChange = (event) => {
    setQuery(event.target.value);
    setInputMode("manual");
  };

  const handleStartVoiceInput = () => {
    setInputMode("voice");
    SpeechRecognition.startListening();
  };

  const handleStopVoiceInput = () => {
    SpeechRecognition.stopListening();
  };

  const handleReset = () => {
    resetTranscript();
    setQuery("");
    setInputMode("manual");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setGeneratingAnswer(true);
    setAnswerHistory("Loading your answer... \n It might take up to 10 seconds");
    setAnswerImportance("Loading your answer... \n It might take up to 10 seconds");
    setImages([]);
    setCoordinates({});

    const promptHistory = `The history of ${inputMode === "manual" ? query : transcript}`;
    const promptImportance = `The importance of ${inputMode === "manual" ? query : transcript}`;
    const promptEvent = `The historical events took place in ${inputMode === "manual" ? query : transcript}`;

    try {
      const imageResponse = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&searchType=image&q=${inputMode === "manual" ? query : transcript}&num=4`
      );

      if (!imageResponse.data.items || imageResponse.data.items.length === 0) {
        throw new Error("No images found");
      }
      setImages(imageResponse.data.items);

      const responseHistory = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: promptHistory }] }],
        },
      });

      if (!responseHistory.data.candidates || responseHistory.data.candidates.length === 0) {
        throw new Error("No history found");
      }

      setAnswerHistory(responseHistory.data.candidates[0].content.parts[0].text);

      const responseImportance = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: promptImportance }] }],
        },
      });

      if (!responseImportance.data.candidates || responseImportance.data.candidates.length === 0) {
        throw new Error("No importance found");
      }

      setAnswerImportance(responseImportance.data.candidates[0].content.parts[0].text);

      const responseLatitude = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text:` The very accurate latitude of ${inputMode === "manual" ? query : transcript}` }] }],
        },
      });

      const responseEvent = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: promptEvent }] }],
        },
      });

      if (!responseEvent.data.candidates || responseEvent.data.candidates.length === 0) {
        throw new Error("No events found");
      }

      setAnswerEvent(responseEvent.data.candidates[0].content.parts[0].text);

      const responseLongitude = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: `The very accurate longitude of ${inputMode === "manual" ? query : transcript}` }] }],
        },
      });

      const latitude = parseFloat(responseLatitude.data.candidates[0].content.parts[0].text);
      const longitude = parseFloat(responseLongitude.data.candidates[0].content.parts[0].text);

      if (isNaN(latitude) || isNaN(longitude)) {
        throw new Error("Latitude or Longitude could not be determined");
      }
      

    //   if(answerHistory && answerEvent && answerImportance)
    //   axios.post('http://localhost:4000/add-past',{
    // user:user.email,
    //    city: query || transcript,
    //    history: answerHistory,
    //    events:answerEvent,
    //    importance:answerImportance
    //   })

      setCoordinates({ latitude, longitude });
    } catch (error) {
      console.log("Error:", error.message);
      setAnswerHistory("Sorry - Something went wrong. Please try again!");
      setAnswerImportance("Sorry - Something went wrong. Please try again!");
      setAnswerEvent("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  };

  return (
    <>
      <div className="">
        <Navbar />
        
        <form onSubmit={handleSubmit} className="w-50 mt-5 m-auto  rounded-4 " style={{backgroundImage:"linear-gradient(to right, #0f2027, #203a43, #2c5364)",boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px"}}>
          <h1 className="text-3xl pt-10 ms-5 text-light">Search Location</h1>
          <div className="d-flex">
          <input type="text" className="form-control w-75 ms-5 mt-3" value={inputMode === "manual" ? query : transcript} required onChange={handleChange} placeholder="Enter a place" />

          <div className="d-flex justify-content-center mt-3">
            <button className="ms-3"  onClick={handleStartVoiceInput}><FiMic className="text-white" size={25} /></button>
            <button className="ms-2" onClick={handleStopVoiceInput}><IoMicOffOutline size={30} className="text-white"/></button>
            <button className="ms-2" onClick={handleReset}><GrPowerReset size={25} className="text-white" /></button>
          </div>
          </div>
          <button
            type="submit"
            className="btn mt-4 bg-light ms-5 mb-10"
            disabled={generatingAnswer}
          >
            Generate Results
          </button>
        </form>

        

        {
          answerHistory && <div className="mb-5">
            
        <div className=" mt-24 ms-5 me-5 rounded-4" style={{backgroundImage:"linear-gradient(to right, #0f2027, #203a43, #2c5364)",boxShadow:" rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}}>
        <div className="p-2 pt-5 min-h-[400px] m-auto max-w-[1000px] rounded-4">
          {images.length > 0 && (
            <img
              src={images[currentImageIndex].link}
              alt="Google Custom Search"
              className="w-full max-h-[400px] object-cover rounded-lg mb-4"
            />
          )}
          {/* {Object.keys(coordinates).length > 0 && <GoogleMap coordinates={coordinates} />} */}
        </div>
        <div className=" m-auto p-5 my-1 text-light" style={{width:"70%"}} >
          <div style={{ gap: '100px', marginLeft: '220px' }} className="btn-group mb-5" role="group" aria-label="Basic example">
            <button
              type="button"
              className={`btn ${activeTab === "history" ? "btn-light" : "btn-outline-light"}`}
              style={{borderRadius:"10px"}}
              onClick={() => setActiveTab("history")}
            >
              History
            </button>
            <button
              type="button"
              className={`btn ${activeTab === "importance" ? "btn-light" : "btn-outline-light"}`}
              style={{borderRadius:"10px"}}
              onClick={() => setActiveTab("importance")}
            >
              Importance
            </button>
            <button
              type="button"
              className={`btn ${activeTab === "event" ? "btn-light" : "btn-outline-light"}`}
              style={{borderRadius:"10px"}}
              onClick={() => setActiveTab("event")}
            >
              Events
            </button>
          </div>

          {activeTab === "history" && (
            <div>
              <h1 className="ps-3" style={{ fontSize: "24px", fontWeight: "bold", lineHeight: "1.5"}}>History of {query} {transcript}</h1>
              <ReactMarkdown className="p-3">{answerHistory}</ReactMarkdown>
            </div>
          )}
          {activeTab === "importance" && (
            <div>
              <h1 className="ps-3" style={{ fontSize: "24px", fontWeight: "bold", lineHeight: "1.5" }}>Importance of {query} {transcript}</h1>
              <ReactMarkdown className="p-3">{answerImportance}</ReactMarkdown>
            </div>
          )}
          {activeTab === "event" && (
            <div>
              <h1 className="ps-3" style={{ fontSize: "24px", fontWeight: "bold", lineHeight: "1.5" }}>Events of {query} {transcript}</h1>
              <ReactMarkdown className="p-3">{answerEvent}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* <div className=" m-auto text-center my-1 pt-5" style={{width:"30%"}}>
          <div className="d-flex justify-content-center">
            {images.length > 0 && (
              <div className="card m-2" style={{ width: "300px" }}>
                <img
                  src={images[currentImageIndex]?.link}
                  className="card-img-top"
                  alt={images[currentImageIndex]?.title}
                  style={{ width: "400px", height: "400px", objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        </div> */}
        
        </div>
          </div>
        }

        

        

        {coordinates.latitude && coordinates.longitude && (
          <div
            style={{
              height: "300px",
              marginTop: "20px",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
            className="ms-5 me-5"
          >
            <GoogleMap coordinates={coordinates} />
          </div>
        )}
      </div>
    </>
  );
}

export default SearchLocation;