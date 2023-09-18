// import React from "react";
// import "./FaceRecognition.css";

// const FaceRecognition = ({ boxes, imageUrl, isFile, format, celebrity, celebNames, loading }) => {
//   return (
//     <div className="center ma">
//       <div className="relative mt2">
//         {isFile ? (
//           <img className="shadow-2" id="inputImage" src={`data:${format};base64,${imageUrl}`} alt="" />
//         ) : (
//           <img className="shadow-2" id="inputImage" src={imageUrl} alt="" />
//         )}
       
//         {boxes.map((box, index) => (
//           <div
//             key={index}
//             className="bounding-box"
//             style={{
//               top: box.topRow,
//               right: box.rightCol,
//               bottom: box.bottomRow,
//               left: box.leftCol,
//             }}
//           >
//             {celebrity && celebNames[index] && (
//               <div className="celeb-name">
//                 <mark className="highlight">{celebNames[index]}</mark>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FaceRecognition;

import React from "react";
import "./FaceRecognition.css";
import Spinner from 'react-bootstrap/Spinner';

const FaceRecognition = ({ boxes, imageUrl, isFile, format, celebrity, celebNames, loading }) => {
  return (
    <div className="center ma">
      {loading ? (
        <Spinner className="custom-spinner" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="relative mt2">
          {isFile ? (
            <img className="shadow-2" id="inputImage" src={`data:${format};base64,${imageUrl}`} alt="" />
          ) : (
            <img className="shadow-2" id="inputImage" src={imageUrl} alt="" />
          )}

          {boxes.map((box, index) => (
            <div
              key={index}
              className="bounding-box"
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}
            >
              {celebrity && celebNames[index] && (
                <div className="celeb-name">
                  <mark className="highlight">{celebNames[index]}</mark>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FaceRecognition;

