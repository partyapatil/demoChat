 const testdata={
    "forecastData": [
        {
            "year": 2122,
            "arithmeticIncrease": 10760,
            "incrementalIncrease": 33,
            "geometricalProgression": 8565135,
            "decadalGrowth": 8565135,
            "graphicalMethod": 591
        },

        {
            "year": 2126,
            "arithmeticIncrease": 11253,
            "incrementalIncrease": -1317,
            "geometricalProgression": 16752454,
            "decadalGrowth": 16752454,
            "graphicalMethod": 203
        },
        {
            "year": 2127,
            "arithmeticIncrease": 11376,
            "incrementalIncrease": -1677,
            "geometricalProgression": 19811369,
            "decadalGrowth": 19811369,
            "graphicalMethod": 107
        }
    ],
    "inputParameters": {
        "initialYear": 1990,
        "yearCount": 0,
        "ultimateYear": 2030,
        "decadeYear0": 1970,
        "decadeYear1": 1980,
        "decadeYear2": 1990,
        "decadeYear3": 2001,
        "decadeYear4": 2009,
        "decadePop0": 1236,
        "decadePop1": 2365,
        "decadePop2": 3654,
        "decadePop3": 5632,
        "decadePop4": 8523
    },
    "r2Values": [
        {
            "method": "arithmeticIncrease",
            "r2": 0.3218604066923362
        },
        {
            "method": "decadalGrowth",
            "r2": 0.5397794838487577
        },
        {
            "method": "geometricalProgression",
            "r2": 0.5397794838487577
        },
        {
            "method": "graphicalMethod",
            "r2": 0.7706745772314921
        },
        {
            "method": "incrementalIncrease",
            "r2": 0.8137426531309011
        }
    ],
    "selectedMethodsAvg": [
        {
            "year": 2010,
            "average": 8705
        },
        {
            "year": 2023,
            "average": 11073
        }
    ]
}
// const data = [
//     { "time": 1, "DP-1": "1", "DP-2": "31" },
//     { "time": 2, "DP-1": "2", "DP-2": "2" },
//     { "time": 3, "DP-1": "31", "DP-2": "12" },
//     { "time": 4, "DP-1": "231", "DP-2": "" },
//     { "time": 5, "DP-1": "", "DP-2": "" },
//     { "time": 6, "DP-1": "", "DP-2": "" },
//     { "time": 7, "DP-1": "", "DP-2": "" },
//     { "time": 8, "DP-1": "", "DP-2": "" },
//     { "time": 9, "DP-1": "", "DP-2": "" },
//     { "time": 10, "DP-1": "", "DP-2": "" },
//     { "time": 11, "DP-1": "", "DP-2": "" },
//     { "time": 12, "DP-1": "", "DP-2": "" },
//     { "time": 13, "DP-1": "", "DP-2": "" },
//     { "time": 14, "DP-1": "", "DP-2": "" },
//     { "time": 15, "DP-1": "", "DP-2": "" },
//     { "time": 16, "DP-1": "", "DP-2": "" },
//     { "time": 17, "DP-1": "", "DP-2": "" },
//     { "time": 18, "DP-1": "", "DP-2": "" },
//     { "time": 19, "DP-1": "", "DP-2": "" },
//     { "time": 20, "DP-1": "", "DP-2": "" },
//     { "time": 21, "DP-1": "", "DP-2": "" },
//     { "time": 22, "DP-1": "", "DP-2": "" },
//     { "time": 23, "DP-1": "", "DP-2": "" },
//     { "time": 24, "DP-1": "", "DP-2": "" }
//   ];
  
  
module.exports = testdata;
// module.exports = data;



const DemandData=[
    {
        "time": 1,
        "DP-1": "0.1",
        "DP-2": "1"
    },
    {
        "time": 2,
        "DP-1": "0.1",
        "DP-2": "1"
    },
    {
        "time": 3,
        "DP-1": "0.2",
        "DP-2": "1"
    },
    {
        "time": 4,
        "DP-1": "0.3",
        "DP-2": "1"
    },
    {
        "time": 5,
        "DP-1": "0.7",
        "DP-2": "1.5"
    },
    {
        "time": 6,
        "DP-1": "2",
        "DP-2": "1"
    },
    {
        "time": 7,
        "DP-1": "2.1",
        "DP-2": "1"
    },
    {
        "time": 8,
        "DP-1": "2.6",
        "DP-2": "1"
    },
    {
        "time": 9,
        "DP-1": "3",
        "DP-2": "1"
    },
    {
        "time": 10,
        "DP-1": "2.3",
        "DP-2": "1"
    },
    {
        "time": 11,
        "DP-1": "1.5",
        "DP-2": "1"
    },
    {
        "time": 12,
        "DP-1": "0.6",
        "DP-2": "1"
    },
    {
        "time": 13,
        "DP-1": "0.6",
        "DP-2": "1"
    },
    {
        "time": 14,
        "DP-1": "1",
        "DP-2": "1"
    },
    {
        "time": 15,
        "DP-1": "1.3",
        "DP-2": "1"
    },
    {
        "time": 16,
        "DP-1": "1.5",
        "DP-2": "1"
    },
    {
        "time": 17,
        "DP-1": "1.5",
        "DP-2": "1"
    },
    {
        "time": 18,
        "DP-1": "1.2",
        "DP-2": "1"
    },
    {
        "time": 19,
        "DP-1": "0.7",
        "DP-2": "1"
    },
    {
        "time": 20,
        "DP-1": "0.2",
        "DP-2": "0.5"
    },
    {
        "time": 21,
        "DP-1": "0.2",
        "DP-2": "1.5"
    },
    {
        "time": 22,
        "DP-1": "0.1",
        "DP-2": "0.5"
    },
    {
        "time": 23,
        "DP-1": "0.1",
        "DP-2": "0.5"
    },
    {
        "time": 24,
        "DP-1": "0.1",
        "DP-2": "0"
    }
]




const OprationData=[
    {
        "time": 1,
        "T-1": "On",
        "T-2": "Off"
    },
    {
        "time": 2,
        "T-1": "On",
        "T-2": "Off"
    },
    {
        "time": 3,
        "T-1": "On",
        "T-2": "Off"
    },
    {
        "time": 4,
        "T-1": "On",
        "T-2": "On"
    },
    {
        "time": 5,
        "T-1": "On",
        "T-2": "On"
    },
    {
        "time": 6,
        "T-1": "On",
        "T-2": "On"
    },
    {
        "time": 7,
        "T-1": "Off",
        "T-2": "On"
    },
    {
        "time": 8,
        "T-1": "Off",
        "T-2": "On"
    },
    {
        "time": 9,
        "T-1": "Off",
        "T-2": "Off"
    },
    {
        "time": 10,
        "T-1": "Off",
        "T-2": "Off"
    },
    {
        "time": 11,
        "T-1": "On",
        "T-2": "On"
    },
    {
        "time": 12,
        "T-1": "On",
        "T-2": "On"
    },
    {
        "time": 13,
        "T-1": "On",
        "T-2": "On"
    },
    {
        "time": 14,
        "T-1": "On",
        "T-2": "On"
    },
    {
        "time": 15,
        "T-1": "On",
        "T-2": "On"
    },
    {
        "time": 16,
        "T-1": "On",
        "T-2": "On"
    },
    {
        "time": 17,
        "T-1": "On",
        "T-2": "On"
    },
    {
        "time": 18,
        "T-1": "On",
        "T-2": "On"
    },
    {
        "time": 19,
        "T-1": "On",
        "T-2": "On"
    },
    {
        "time": 20,
        "T-1": "On",
        "T-2": "On"
    },
    {
        "time": 21,
        "T-1": "On",
        "T-2": "On"
    },
    {
        "time": 22,
        "T-1": "On",
        "T-2": "On"
    },
    {
        "time": 23,
        "T-1": "On",
        "T-2": "On"
    },
    {
        "time": 24,
        "T-1": "On",
        "T-2": "On"
    }
]

module.exports = {
    DemandData,
    OprationData
};













// import React, { useEffect, useState } from "react";
// import CustomWaterLabMoadal from "../../../../components/shared/customModal/CustomWaterLabMoadal";
// import DemandPatternCss from "./DemandPatternCss";
// import WaterLabFormButtonConatiner from "../../../../components/shared/WaterLabFormsButtonContainer/WaterLabFormButtonConatiner";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { error } from "console";
// // import { data } from "./data";
// import DeleteIcon from '@material-ui/icons/Delete';
// import ConfirmationModal from "../OpratingHours/ConfirmationModal";

// interface DemandPatternProps {
//   showModal: boolean;
//   handleCloseModal: (arg: boolean) => void;
// }

// const DemandPattern: React.FC<DemandPatternProps> = ({
//   showModal,
//   handleCloseModal,
// }) => {
//   const classes = DemandPatternCss();

//   // State for dynamic columns and input values
//   const [columns, setColumns] = useState<string[]>(["DP-1"]);
//   const [inputs, setInputs] = useState<{ [key: string]: string[] }>({
//     "DP-1": Array(24).fill(""),
//   });
//   const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
//   const [columnToDelete, setColumnToDelete] = useState<string | null>(null);
  
//   const handleAddColumn = () => {
//     // Find the highest number in the existing column names
//     const highestNumber = Math.max(
//       ...columns.map((col) => {
//         const match = col.match(/DP-(\d+)/); // Extract the number from the column name
//         return match ? parseInt(match[1], 10) : 0; // Convert the number to an integer
//       }),
//       0 // Default to 0 if no columns exist
//     );
  
//     // Generate the new column name
//     const newColumn = `DP-${highestNumber + 1}`;
  
//     // Update the state
//     setColumns((prev) => [...prev, newColumn]);
//     setInputs((prev) => ({
//       ...prev,
//       [newColumn]: Array(24).fill(""), // Initialize with 24 empty strings
//     }));
//   };

//   const handleInputChange = (col: string, row: number, value: string) => {
//     setInputs((prev) => ({
//       ...prev,
//       [col]: prev[col].map((val, index) => (index === row ? value : val)),
//     }));
//   };

//   const validateInputs = () => {
//     for (const col of columns) {
//       const columnValues = inputs[col];
//       let isContinuous = true;

//       for (let i = 0; i < columnValues.length; i++) {
//         if (columnValues[i] === "" && isContinuous) {
//           // Once an empty value is encountered, all subsequent fields must also be empty
//           isContinuous = false;
//         } else if (columnValues[i] !== "" && !isContinuous) {
//           // If a non-empty value is found after a gap, validation fails
//           console.error(`Validation failed in column: ${col}, row: ${i + 1}`);
        
//           toast.error(`Validation failed in column: ${col}, row: ${i + 1}. Please enter continuous values.`);

//           return false;
//         }
//       }
//     }

//     return true; // If no validation errors
//   };
//   const downloadCSV = () => {
//     const headers = ["Time", ...columns]; // CSV Headers: Time + Dynamic Columns
//     const rows = Array.from({ length: 24 }).map((_, rowIndex) => {
//       const row = [rowIndex + 1]; // Time Column
//       columns.forEach((col) => {
//         row.push(inputs[col][rowIndex]); // Add values from each column
//         // row.push(Number(inputs[col][rowIndex]));

//       });
//       return row;
//     });

//     // Convert to CSV string
//     const csvContent = [
//       headers.join(","), // Add headers
//       ...rows.map((row) => row.join(",")), // Add each row
//     ].join("\n");

//     // Create Blob and trigger download
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "demand_pattern.csv";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleSubmit = () => {
//     if (!validateInputs()) {
//       return; // Stop submission if validation fails
//     }

//     const result = Array.from({ length: 24 }).map((_, rowIndex) => {
//       const time = rowIndex + 1; // Time value (1-24)
//       const rowValues: { [key: string]: string } = {};

//       columns.forEach((col) => {
//         rowValues[col] = inputs[col][rowIndex]; // Get each column's value for the row
//       });
//       console.log(`${time}:${rowValues}`);

//       return { time, ...rowValues };
//     });

//     console.log("Submitted Data:aaaa", result);
//   };


//   const handleDelete = (col: string) => {
//     console.log(col)
//     // Open the confirmation modal and set the column to delete
//     setColumnToDelete(col);
//     setIsConfirmationModalOpen(true);
//   };

//   // Confirm deletion
//   const confirmDelete = () => {
//     if (columnToDelete) {
//       setColumns((prev) => prev.filter((column) => column !== columnToDelete));
//       setInputs((prev) => {
//         const newInputs = { ...prev };
//         delete newInputs[columnToDelete];
//         return newInputs;
//       });
//     }
//     // Close the modal and reset the column to delete
//     setIsConfirmationModalOpen(false);
//     setColumnToDelete(null);
//   };

//   // Cancel deletion
//   const cancelDelete = () => {
//     setIsConfirmationModalOpen(false);
//     setColumnToDelete(null);
//   };

//   return (
//     <CustomWaterLabMoadal
//       isVisible={showModal}
//       title={"Demand Pattern"}
//       setShowTerms={handleCloseModal}
//     >
//       <div className={classes.WaterlabFormMainRoot}>
//         <div className={classes.inner}>
//           <table className={classes.table}>
//             <div></div>
//             <thead>
//               <tr>
//                 <th
//                   className={classes.headerCell}
//                   //   style={{ minWidth: "100px", width: "100px" }}
//                 >
//                   Time
//                 </th>
//                 {columns.map((col) => (
//                   <th key={col} className={classes.headerCell}>
//                     {col}
//                     <div onClick={()=>handleDelete(col)}
//     style={{
//       display: "inline-block",
//       position: "absolute",
//       right: 0,
//       top: "50%",
//       transform: "translateY(-50%)",
//     }}
//   >
//     <DeleteIcon />
//   </div>  
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {Array.from({ length: 24 }).map((_, rowIndex) => (
//                 <tr key={rowIndex}>
//                   <td className={classes.timeCell}>{rowIndex + 1}</td>

//                   {/* Check if columns and inputs are ready */}
//                   {columns?.length === 0 || Object.keys(inputs)?.length === 0 ? (
//                     <td colSpan={columns.length || 1}></td>
//                   ) : (
//                     columns?.map((col) => (
//                       <td
//                         key={`${col}-${rowIndex}`}
//                         className={classes.inputCell}
//                       >
//                         <input
//                           type="text"
//                           value={inputs[col] && inputs[col][rowIndex]}
//                           onChange={(e) =>
//                             handleInputChange(col, rowIndex, e.target.value)
//                           }
//                           className={classes.inputField}
//                         />
//                       </td>
//                     ))
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
        
//         </div>
       
//         <WaterLabFormButtonConatiner
//           handleCancleClick={() => handleCloseModal(false)}
//           handleNextClick={handleSubmit}
//           nextButtonName="Submit"
//           //   manageBtn
//           //   manageButnName="Add Column"
//           //   handleMangeClick={handleAddColumn}
//           hiddenBackButton={true}
//         />
//          <div className={classes.downloadButtonContainer}>
//             <button className={classes.roundButton} onClick={handleAddColumn}>
//               +
//             </button>
//             <button onClick={downloadCSV} className={classes.downloadButton}>
//               Export
//             </button>
//             <button className={classes.importButton}>Import</button>
   
//           </div>
//       </div>
//          {/* Confirmation Modal */}
//          <ConfirmationModal
//         isOpen={isConfirmationModalOpen}
//         onClose={cancelDelete}
//         onConfirm={confirmDelete}
//         message={`Are you sure you want to delete the column ${columnToDelete}?`}
//       />
//     </CustomWaterLabMoadal>
//   );
// };

// export default DemandPattern;
