// import React, { useState,useEffect } from "react";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Navbar from "./Navbar";

// const GOOGLE_API_KEY = "AIzaSyD-BlTMfNJlz1b9KNgluIZ84wAG8ePOPgs";
// const SEARCH_ENGINE_ID = "f7bbf16bf4357421d";
// const GEMINI_API_KEY = "AIzaSyDBEWj146SV_kfPYtQFIyTZEE_l0AiCidA";

// function GoogleMap({ coordinates }) {
//   const mapUrl = `https://maps.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

//   return (
//     <div className="p-3 min-h-[400px] my-3 rounded-lg border">
//       <div className="mapouter">
//         <div className="gmap_canvas">
//           <iframe
//             title="Google Map"
//             src={mapUrl}
//             frameBorder="0"
//             scrolling="no"
//             className="w-full h-full"
//           ></iframe>
//           <style>
//             {`
//               .mapouter {
//                 position: relative;
//                 height: 100%;
//                 width: 100%;
//                 background: #fff;
//               }
//               .gmap_canvas {
//                 overflow: hidden;
//                 height: 100%;
//                 width: 100%;
//               }
//               .gmap_canvas iframe {
//                 position: relative;
//                 z-index: 2;
//               }
//             `}
//           </style>
//         </div>
//       </div>
//     </div>
//   );
// }

// function SearchLocation() {
//   const [query, setQuery] = useState("");
//   const [images, setImages] = useState([]);
//   const [answerHistory, setAnswerHistory] = useState("");
//   const [answerImportance, setAnswerImportance] = useState("");
//   const [answerEvent, setAnswerEvent] = useState("");
//   const [generatingAnswer, setGeneratingAnswer] = useState(false);
//   const [coordinates, setCoordinates] = useState({});
//   const [activeTab, setActiveTab] = useState("history");
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 2000);

//     return () => clearInterval(interval);
//   }, [images]);


//   const handleChange = (event) => {
//     setQuery(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setGeneratingAnswer(true);
//     setAnswerHistory("Loading your answer... \n It might take up to 10 seconds");
//     setAnswerImportance("Loading your answer... \n It might take up to 10 seconds");
//     setImages([]);
//     setCoordinates({});

//     const promptHistory = `The history of ${query}`;
//     const promptImportance = `The importance of ${query}`;
//     const promptEvent = `The historical events took place in ${query}`;

//     try {
//       const imageResponse = await axios.get(
//         `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&searchType=image&q=${query}&num=4`
//       );

//       if (!imageResponse.data.items) {
//         throw new Error("No images found");
//       }
//       setImages(imageResponse.data.items);

//       const responseHistory = await axios({
//         url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
//         method: "post",
//         data: {
//           contents: [{ parts: [{ text: promptHistory }] }],
//         },
//       });

//       if (!responseHistory.data.candidates) {
//         throw new Error("No history found");
//       }

//       setAnswerHistory(responseHistory.data.candidates[0].content.parts[0].text);

//       const responseImportance = await axios({
//         url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
//         method: "post",
//         data: {
//           contents: [{ parts: [{ text: promptImportance }] }],
//         },
//       });

//       if (!responseImportance.data.candidates) {
//         throw new Error("No importance found");
//       }

//       setAnswerImportance(responseImportance.data.candidates[0].content.parts[0].text);

//       const responseLatitude = await axios({
//         url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
//         method: "post",
//         data: {
//           contents: [{ parts: [{ text: `The very accurate latitude of ${query}` }] }],
//         },
//       });

//       const responseEvent = await axios({
//         url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
//         method: "post",
//         data: {
//           contents: [{ parts: [{ text: promptEvent }] }],
//         },
//       });

//       if (!responseEvent.data.candidates) {
//         throw new Error("No events found");
//       }

//       setAnswerEvent(responseEvent.data.candidates[0].content.parts[0].text);

//       const responseLongitude = await axios({
//         url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
//         method: "post",
//         data: {
//           contents: [{ parts: [{ text: `The very accurate longitude of ${query}` }] }],
//         },
//       });

//       const latitude = parseFloat(responseLatitude.data.candidates[0].content.parts[0].text);
//       const longitude = parseFloat(responseLongitude.data.candidates[0].content.parts[0].text);

//       if (isNaN(latitude) || isNaN(longitude)) {
//         throw new Error("Latitude or Longitude could not be determined");
//       }

//       setCoordinates({ latitude, longitude });
//     } catch (error) {
//       console.log("Error:", error.message);
//       setAnswerHistory("Sorry - Something went wrong. Please try again!");
//       setAnswerImportance("Sorry - Something went wrong. Please try again!");
//       setAnswerEvent("Sorry - Something went wrong. Please try again!");
//     }

//     setGeneratingAnswer(false);
//   };

//   return (
//     <>
//       <div className="bg-white h-screen p-3" style={{marginTop:'100px'}}>
//         <Navbar/>
//         <form onSubmit={handleSubmit} className="w-full md:w-2/3 m-auto text-center rounded bg-gray-50 py-2 p-5 bg-secondary">
//           <h1 className="text-3xl text-center pb-3">Search Location</h1>
//           <textarea
//             required
//             className="form-control my-2 p-0 "
//             value={query}
//             onChange={handleChange}
//             placeholder="Enter a place"
//           ></textarea>
//           <button
//             type="submit"
//             className="btn btn-primary mt-2"
//             disabled={generatingAnswer}
//           >
//             Generate Results
//           </button>
//         </form>

//         {/* <div className="w-full md:w-2/3 m-auto text-center rounded bg-gray-50 my-1">
//           <div className="d-flex flex-wrap justify-content-center">
//             {images.map((image, index) => (
//               <div key={index} className="card m-2" style={{ width: "200px" }}>
//                 <img src={image.link} className="card-img-top" alt={image.title} />
                
//               </div>
//             ))}
//           </div>
//         </div> */}


//         <div className="w-full md:w-2/3 m-auto text-center rounded bg-gray-50 my-1">
//           <div className="d-flex justify-content-center">
//             {images.length > 0 && (
//               <div className="card m-2" style={{ width: "300px" }}>
//                 <img
//                   src={images[currentImageIndex].link}
//                   className="card-img-top"
//                   alt={images[currentImageIndex].title}
//                   style={{ width: "300px", height: "350px", objectFit: "cover" }}
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="w-full md:w-2/3 m-auto p-5 rounded bg-gray-50 my-1">
//           <div style={{gap:'100px',marginLeft:'220px'}} className="btn-group mb-3" role="group" aria-label="Basic example">
//             <button
//               type="button"
//               className={`btn ${activeTab === "history" ? "btn-success" : "btn-outline-success"}`}
//               onClick={() => setActiveTab("history")}
//             >
//               History
//             </button>
//             <button
//               type="button"
//               className={`btn ${activeTab === "importance" ? "btn-success" : "btn-outline-success"}`}
//               onClick={() => setActiveTab("importance")}
//             >
//               Importance
//             </button>
//             <button
//               type="button"
//               className={`btn ${activeTab === "event" ? "btn-success" : "btn-outline-success"}`}
//               onClick={() => setActiveTab("event")}
//             >
//               Events
//             </button>
//           </div>

//           {activeTab === "history" && (
//             <div>
//               <h1 style={{ fontSize: "24px", fontWeight: "bold", lineHeight: "1.5" }}>History of {query}</h1>
//               <ReactMarkdown className="p-3">{answerHistory}</ReactMarkdown>
//             </div>
//           )}
//           {activeTab === "importance" && (
//             <div>
//               <h1 style={{ fontSize: "24px", fontWeight: "bold", lineHeight: "1.5" }}>Importance of {query}</h1>
//               <ReactMarkdown className="p-3">{answerImportance}</ReactMarkdown>
//             </div>
//           )}
//           {activeTab === "event" && (
//             <div>
//               <h1 style={{ fontSize: "24px", fontWeight: "bold", lineHeight: "1.5" }}>Events of {query}</h1>
//               <ReactMarkdown className="p-3">{answerEvent}</ReactMarkdown>
//             </div>
//           )}
//         </div>

//         {coordinates.latitude && coordinates.longitude && (
//           <div
//             style={{
//               minHeight: "400px",
//               marginTop: "20px",
//               borderRadius: "10px",
//               overflow: "hidden",
//               boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <GoogleMap coordinates={coordinates} />
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default SearchLocation;





import React, { useState, useEffect, useContext } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import axios from "axios";
import ReactMarkdown from "react-markdown";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";

const GOOGLE_API_KEY = "AIzaSyD-BlTMfNJlz1b9KNgluIZ84wAG8ePOPgs";
const SEARCH_ENGINE_ID = "f7bbf16bf4357421d";
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

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [answerHistory, setAnswerHistory] = useState("");
  const [answerImportance, setAnswerImportance] = useState("");
  const [answerEvent, setAnswerEvent] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [coordinates, setCoordinates] = useState({});
  const [activeTab, setActiveTab] = useState("history");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setGeneratingAnswer(true);
    setAnswerHistory("Loading your answer... \n It might take up to 10 seconds");
    setAnswerImportance("Loading your answer... \n It might take up to 10 seconds");
    setImages([]);
    setCoordinates({});

    const promptHistory = `The history of ${query}`;
    const promptImportance = `The importance of ${query}`;
    const promptEvent = `The historical events took place in ${query}`;

    try {
      const imageResponse = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&searchType=image&q=${query}&num=4`
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
          contents: [{ parts: [{ text: `The very accurate latitude of ${query}` }] }],
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
          contents: [{ parts: [{ text: `The very accurate longitude of ${query}` }] }],
        },
      });

      const latitude = parseFloat(responseLatitude.data.candidates[0].content.parts[0].text);
      const longitude = parseFloat(responseLongitude.data.candidates[0].content.parts[0].text);

      if (isNaN(latitude) || isNaN(longitude)) {
        throw new Error("Latitude or Longitude could not be determined");
      }

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
      <div className="bg-white h-screen p-3" style={{ marginTop: '100px' }}>
        <Navbar />
        
        <form onSubmit={handleSubmit} className="w-full md:w-2/3 m-auto text-center rounded bg-gray-50 py-2 p-5 bg-secondary">
          <h1 className="text-3xl text-center pb-3">Search Location</h1>
          <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>

          <textarea
            required
            className="form-control my-2 p-0 "
            value={query}
            onChange={handleChange}
            placeholder="Enter a place"
          ></textarea>
          <button
            type="submit"
            className="btn btn-primary mt-2"
            disabled={generatingAnswer}
          >
            Generate Results
          </button>
        </form>

        <div className="w-full md:w-2/3 m-auto text-center rounded bg-gray-50 my-1">
          <div className="d-flex justify-content-center">
            {images.length > 0 && (
              <div className="card m-2" style={{ width: "300px" }}>
                <img
                  src={images[currentImageIndex]?.link}
                  className="card-img-top"
                  alt={images[currentImageIndex]?.title}
                  style={{ width: "300px", height: "350px", objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-2/3 m-auto p-5 rounded bg-gray-50 my-1">
          <div style={{ gap: '100px', marginLeft: '220px' }} className="btn-group mb-3" role="group" aria-label="Basic example">
            <button
              type="button"
              className={`btn ${activeTab === "history" ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setActiveTab("history")}
            >
              History
            </button>
            <button
              type="button"
              className={`btn ${activeTab === "importance" ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setActiveTab("importance")}
            >
              Importance
            </button>
            <button
              type="button"
              className={`btn ${activeTab === "event" ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setActiveTab("event")}
            >
              Events
            </button>
          </div>

          {activeTab === "history" && (
            <div>
              <h1 style={{ fontSize: "24px", fontWeight: "bold", lineHeight: "1.5" }}>History of {query}</h1>
              <ReactMarkdown className="p-3">{answerHistory}</ReactMarkdown>
            </div>
          )}
          {activeTab === "importance" && (
            <div>
              <h1 style={{ fontSize: "24px", fontWeight: "bold", lineHeight: "1.5" }}>Importance of {query}</h1>
              <ReactMarkdown className="p-3">{answerImportance}</ReactMarkdown>
            </div>
          )}
          {activeTab === "event" && (
            <div>
              <h1 style={{ fontSize: "24px", fontWeight: "bold", lineHeight: "1.5" }}>Events of {query}</h1>
              <ReactMarkdown className="p-3">{answerEvent}</ReactMarkdown>
            </div>
          )}
        </div>

        {coordinates.latitude && coordinates.longitude && (
          <div
            style={{
              minHeight: "400px",
              marginTop: "20px",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <GoogleMap coordinates={coordinates} />
          </div>
        )}
      </div>
    </>
  );
}

export default SearchLocation;