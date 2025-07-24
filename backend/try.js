import React, { useEffect, useState } from "react";
import WaterLabFormButtonConatiner from "../../../../../../../components/shared/WaterLabFormsButtonContainer/WaterLabFormButtonConatiner";
import MassCurveCss from "./MassCurveCss";
import InputTextField from "../../../../../../../components/shared/inputTextField/inputTextField";

interface ICurveTable {
  setCurveTableform: React.Dispatch<React.SetStateAction<boolean>>;
  population: number | string;
  setPopulation: React.Dispatch<React.SetStateAction<number | string>>;

  demand: number | string;
  setDemand: React.Dispatch<React.SetStateAction<number | string>>;

  hourSupply: number | string;
  setHourSupply: React.Dispatch<React.SetStateAction<number | string>>;

  avgSupply: number;
  setAvgSupply: React.Dispatch<React.SetStateAction<number>>;

  existingCapacity: number | string;
  setExistingCapacity: React.Dispatch<React.SetStateAction<number | string>>;
}

const CurveTableform = ({
  setCurveTableform,
  population,
  setPopulation,
  demand,
  setDemand,
  hourSupply,
  setHourSupply,
  avgSupply,
  setAvgSupply,
  existingCapacity,
  setExistingCapacity,
  fetchedDemandData,
  fetchedOperationData,
  selectedDemandPattern,
  selectedTimePattern,
}: ICurveTable) => {
  const classes = MassCurveCss();
  const [time, setTime] = useState(Array.from({ length: 24 }, (_, i) => i + 1));
  const [demandValues, setDemandValues] = useState(Array.from({ length: 24 }, () => ""));
  const [netHourlyInflow, setNetHourlyInflow] = useState(Array.from({ length: 24 }, () => "0"));
  const [netHourlyOutflow, setNetHourlyOutflow] = useState<string[]>(Array(24).fill("0")); // Renamed from netHourly2
  const [tankVolume, setTankVolume] = useState(Array.from({ length: 24 }, () => "10"));
  const [inflow, setInflow] = useState(Array.from({ length: 24 }, () => "12"));
  const [outflow, setOutflow] = useState(Array.from({ length: 24 }, () => "0"));
  const [difference, setDifference] = useState(Array.from({ length: 24 }, () => "123"));
  const [totalCapacity1, setTotalCapacity1] = useState(Array.from({ length: 24 }, () => "0"));
  const [totalCapacity2, setTotalCapacity2] = useState(Array.from({ length: 24 }, () => "0"));
  // State to store user inputs for time and demand
  const [tableData, setTableData] = useState(
    Array.from({ length: 24 }, (_, i) => ({
      time: i+1, // Time from 0 to 24
      demand: "", // User input for demand
      netHourlyInflow: "0",
      netHourly2: "0",
      tankVolume: "10",
      inflow: "12",
      outflow: "0",
      difference: "123",
      totalCapacity1: "0",
      totalCapacity2: "0",
    }))
  );

  // Array of header labels

  const headerLabels = [
    "Time",
    "Demand",
    "Net Hourly InFlow",
    "Net Hourly OutFlow",
    "Tank Volume",
    "Inflow",
    "Outflow",
    "Difference",
    "Total Capacity (CUM)",
    "Total Capacity Required",
  ];

  useEffect(() => {
    const newDemandValues = Array(24).fill("0"); // Initialize with default values
    selectedDemandPattern.forEach((pattern) => {
      if (pattern.time >= 1 && pattern.time <= 24) {
        newDemandValues[pattern.time - 1] = pattern.value; // Update demand values based on time
      }
    });
    setDemandValues(newDemandValues);




  }, [selectedDemandPattern]);

// Calculate netHourlyInflow values

// Update netHourlyInflow when selectedTimePattern changes
useEffect(() => {
  const newNetHourlyInflow = selectedTimePattern.map((pattern) => {
    // If the value is "On", return avgSupply; otherwise, return "-"
    return pattern.value === "On" ? avgSupply : "-";
  });
  setNetHourlyInflow(newNetHourlyInflow);
}, [selectedTimePattern, avgSupply]); // Recalculate when selectedTimePattern or avgSupply changes

  const handleBack = () => {
    setCurveTableform(false);
  };

  

// Calculate netHourlyOutflow values
useEffect(() => {
  const newNetHourlyOutflow = demandValues.map((demandValue) => {
    // Convert demandValue, avgSupply, and hourSupply to numbers
    const demandValueNum = parseFloat(demandValue);
    const avgSupplyNum = parseFloat(avgSupply); // Use avgSupply instead of demand
    const hourSupplyNum = parseFloat(hourSupply);

    // Calculate netHourlyOutflow using the updated formula
    const calculatedValue = (demandValueNum * avgSupplyNum * hourSupplyNum) / 24;

    // Return the calculated value as a string
    return calculatedValue.toFixed(2); // Round to 2 decimal places
  });

  // Update the netHourlyOutflow state
  setNetHourlyOutflow(newNetHourlyOutflow);
}, [demandValues, avgSupply, hourSupply]); // Recalculate when demandValues, avgSupply, or hourSupply changes


  // Calculate inflow values (cumulative logic)
 // Calculate inflow values (cumulative logic)
// Calculate inflow values (cumulative logic)
useEffect(() => {
  let previousInflowValue = 0; // Temporary variable to store the previous inflow value

  const newInflow = netHourlyInflow.map((value) => {
    // If the value is "-" (indicating "Off"), use the previous inflow value
    if (value === "-") {
      return previousInflowValue.toFixed(2); // Keep the previous value
    }

    // Convert the current Net Hourly InFlow value to a number
    const currentNetHourlyInFlow = parseFloat(value);

    // Calculate the cumulative inflow value
    const cumulativeValue = previousInflowValue + currentNetHourlyInFlow;

    // Update the previous inflow value for the next iteration
    previousInflowValue = cumulativeValue;

    return cumulativeValue.toFixed(2); // Round to 2 decimal places
  });

  // Update the inflow state
  setInflow(newInflow);
}, [netHourlyInflow]); // Recalculate when netHourlyInflow changes

// Calculate outflow values (cumulative logic)
useEffect(() => {
  let previousOutflowValue = 0; // Temporary variable to store the previous outflow value

  const newOutflow = netHourlyOutflow.map((value) => {
    // If the value is "0" or "-" (indicating "Off"), use the previous outflow value
    if (value === "0" || value === "-") {
      return previousOutflowValue.toFixed(2); // Keep the previous value
    }

    // Convert the current Net Hourly OutFlow value to a number
    const currentNetHourlyOutFlow = parseFloat(value);

    // Calculate the cumulative outflow value
    const cumulativeValue = previousOutflowValue + currentNetHourlyOutFlow;

    // Update the previous outflow value for the next iteration
    previousOutflowValue = cumulativeValue;

    return cumulativeValue.toFixed(2); // Round to 2 decimal places
  });

  // Update the outflow state
  setOutflow(newOutflow);
}, [netHourlyOutflow]); // Recalculate when netHourlyOutflow changes
 
// Calculate difference values (Inflow - Outflow)
useEffect(() => {
  const newDifference = inflow.map((inflowValue, index) => {
    // Convert inflow and outflow values to numbers
    const inflowNum = parseFloat(inflowValue);
    const outflowNum = parseFloat(outflow[index]);

    // Calculate the difference
    const differenceValue = inflowNum - outflowNum;

    // Return the difference as a string, rounded to 2 decimal places
    return differenceValue.toFixed(2);
  });

  // Update the difference state
  setDifference(newDifference);
}, [inflow, outflow]); // Recalculate when inflow or outflow changes

// Calculate Total Capacity (CUM) values
useEffect(() => {
  // Initialize variables to track the largest positive and lowest negative numbers
  let largestPositive = { value: -Infinity, index: -1 };
  let lowestNegative = { value: Infinity, index: -1 };

  // Iterate through the difference values to find the largest positive and lowest negative numbers
  difference.forEach((diffValue, index) => {
    const diffNum = parseFloat(diffValue);

    // Check for the largest positive number
    if (diffNum > largestPositive.value) {
      largestPositive.value = diffNum;
      largestPositive.index = index;
    }

    // Check for the lowest negative number
    if (diffNum < lowestNegative.value) {
      lowestNegative.value = diffNum;
      lowestNegative.index = index;
    }
  });

  // Create a new array for Total Capacity (CUM)
  const newTotalCapacity1 = Array(24).fill(""); // Initialize with empty strings

  // Set the largest positive number in its corresponding row
  if (largestPositive.index !== -1) {
    newTotalCapacity1[largestPositive.index] = largestPositive.value.toFixed(2);
  }

  // Set the lowest negative number in its corresponding row
  if (lowestNegative.index !== -1) {
    newTotalCapacity1[lowestNegative.index] = lowestNegative.value.toFixed(2);
  }

  // Update the totalCapacity1 state
  setTotalCapacity1(newTotalCapacity1);
}, [difference]); // Recalculate when difference changes

// Calculate Total Capacity Required value
useEffect(() => {
  // Initialize variables to track the largest positive and lowest negative numbers
  let largestPositive = { value: -Infinity, index: -1 };
  let lowestNegative = { value: Infinity, index: -1 };

  // Iterate through the difference values to find the largest positive and lowest negative numbers
  difference.forEach((diffValue, index) => {
    const diffNum = parseFloat(diffValue);

    // Check for the largest positive number
    if (diffNum > largestPositive.value) {
      largestPositive.value = diffNum;
      largestPositive.index = index;
    }

    // Check for the lowest negative number
    if (diffNum < lowestNegative.value) {
      lowestNegative.value = diffNum;
      lowestNegative.index = index;
    }
  });

  // Calculate the sum of the largest positive and absolute value of the lowest negative
  const sum = largestPositive.value + Math.abs(lowestNegative.value);

  // Create a new array for Total Capacity Required
  const newTotalCapacity2 = Array(24).fill(""); // Initialize with empty strings

  // Set the sum in the middle row (e.g., row 12 for a 24-row table)
  const middleRowIndex = 11; // 0-based index for row 12
  newTotalCapacity2[middleRowIndex] = sum.toFixed(2);

  // Update the totalCapacity2 state
  setTotalCapacity2(newTotalCapacity2);
}, [difference]); // Recalculate when difference changes

// Calculate Tank Volume values
useEffect(() => {
  // Find the smallest number in the Difference column
  const smallestDifference = Math.min(...difference.map((diff) => parseFloat(diff) || 0));

  // Round the smallest number up to the nearest hundred and take its absolute value
  const roundedSmallestNumber = Math.ceil(Math.abs(smallestDifference) / 100) * 100;

  // Initialize the Tank Volume array
  const newTankVolume = Array(24).fill("");

  // Calculate Tank Volume for each row
  let previousTankVolume = roundedSmallestNumber; // Start with the rounded smallest number
  for (let i = 0; i < 24; i++) {
    // Treat "-" as 0 for Net Hourly Inflow and Net Hourly Outflow
    const netHourlyInFlow = netHourlyInflow[i] === "-" ? 0 : parseFloat(netHourlyInflow[i] || "0");
    const netHourlyOutFlow = netHourlyOutflow[i] === "-" ? 0 : parseFloat(netHourlyOutflow[i] || "0");

    // Calculate Tank Volume for the current row
    const tankVolumeValue = previousTankVolume + netHourlyInFlow - netHourlyOutFlow;

    // Update the Tank Volume array
    newTankVolume[i] = tankVolumeValue.toFixed(2);

    // Update the previous Tank Volume for the next iteration
    previousTankVolume = tankVolumeValue;
  }

  // Update the tankVolume state
  setTankVolume(newTankVolume);
}, [difference, netHourlyInflow, netHourlyOutflow]); // Recalculate when difference, netHourlyInflow, or netHourlyOutflow changes


return (
    <div className={classes.MassCurveMain}>
      <div
        className={classes.Body}
        style={{
          width: "100%",
          height: "80%",
          overflowY: "scroll",
          border: "1px solid #ccc",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            overflowX: "scroll",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2", textAlign: "center" }}>
              {headerLabels.map((label, index) => (
                <th key={index} className={classes.stickyHeader}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {time.map((_, index) => (
              <tr key={index} style={{ textAlign: "center" }}>
                {/* Time */}
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {time[index]}
                </td>
                {/* Demand */}
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {demandValues[index]}
                </td>
                {/* Net Hourly InFlow */}
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {netHourlyInflow[index]}
                </td>
                {/* Net Hourly OutFlow */}
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {netHourlyOutflow[index]}
                </td>
                {/* Tank Volume */}
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {tankVolume[index]}
                </td>
                {/* Inflow */}
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {inflow[index]}                </td>
                {/* Outflow */}
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {outflow[index]}
                </td>
                {/* Difference */}
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {difference[index]}
                </td>
                {/* Total Capacity (CUM) */}
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {totalCapacity1[index]}
                </td>
                {/* Total Capacity Required */}
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {totalCapacity2[index]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button Container */}
      <WaterLabFormButtonConatiner
        handleCancleClick={() => console.log("Cancelled")}
        handleBackClick={handleBack}
        nextButtonName="Submit"
      />
    </div>
  );
};

export default CurveTableform;
















import React, { useEffect, useState } from "react";
import CustomWaterLabMoadal from "../../../../../../../components/shared/customModal/CustomWaterLabMoadal";
import CurvesBody from "./CurvesBody";
import CurveTableform from "./CurveTableform";

interface ICurvesMain {
  showForm: boolean;
  setShowForm: (arg: any) => void;
}

const CurvesMain = ({ showForm, setShowForm }: ICurvesMain) => {
  const [showCurveBody, setshowCurveBody] = useState<boolean>(false);
  const [showCurveTableform, setCurveTableform] = useState<boolean>(false);

  const [population, setPopulation] = useState<number | string>(0);
  const [demand, setDemand] = useState<number | string>(0);
  const [hourSupply, setHourSupply] = useState<number | string>(0);
  const [avgSupply, setAvgSupply] = useState<number>(0);
  const [existingCapacity, setExistingCapacity] = useState<number | string>(0);


  const [fetchedDemandData, setFetchedDemandData] = useState<any[]>([]);
  const [fetchedOperationData, setFetchedOperationData] = useState<any[]>([]);

  // State for selected demand pattern
  const [selectedDemandPattern, setSelectedDemandPattern] = useState<string>("DP-1");

  // State for selected time pattern
  const [selectedTimePattern, setSelectedTimePattern] = useState<string>("T-1");
  console.log(selectedTimePattern)
  useEffect(()=>{
    setDemand(3750)
    setAvgSupply(188)
    setHourSupply(20)
    console.log(avgSupply)
  },[])
  
  return (
    <CustomWaterLabMoadal
      isVisible={showForm}
      title="Mass Curves"
      // isVisible={}
      setShowTerms={setShowForm}
      // customOnclickfunction={() => customOnclickfunction()}
      // handalCostomOnclose={!openForcasrfrom}
    >
      {showCurveTableform ? (
        <CurveTableform setCurveTableform={setCurveTableform}
        population={population}
        setPopulation={setPopulation}
        demand={demand}
        setDemand={setDemand}
        hourSupply={hourSupply}
        setHourSupply={setHourSupply}
        avgSupply={avgSupply}
        setAvgSupply={setAvgSupply}
        existingCapacity={existingCapacity}
        setExistingCapacity={setExistingCapacity}
        fetchedDemandData={fetchedDemandData}
        fetchedOperationData={fetchedOperationData}
        selectedDemandPattern={selectedDemandPattern}
        selectedTimePattern={selectedTimePattern}
        />
      ) : (
        <CurvesBody
          setCurveTableform={setCurveTableform}
          setShowForm={setShowForm}
          population={population}
          setPopulation={setPopulation}
          demand={demand}
          setDemand={setDemand}
          hourSupply={hourSupply}
          setHourSupply={setHourSupply}
          avgSupply={avgSupply}
          setAvgSupply={setAvgSupply}
          existingCapacity={existingCapacity}
          setExistingCapacity={setExistingCapacity}
          fetchedDemandData={fetchedDemandData}
          fetchedOperationData={fetchedOperationData}
          setSelectedDemandPattern={setSelectedDemandPattern}
          setFetchedDemandData={setFetchedDemandData}
          setFetchedOperationData={setFetchedOperationData}
          setSelectedTimePattern={setSelectedTimePattern}
          selectedTimePattern={selectedTimePattern}

        />
      )}
    </CustomWaterLabMoadal>
  );
};

export default CurvesMain;






import { createStyles, makeStyles, Theme } from "@material-ui/core";

const MassCurveCss = makeStyles((theme: Theme) =>
  createStyles({
    MassCurveMain: {
        // display: "flex",
        // flexDirection: "column",
        width: "100%",
        height: "100%",
        // gap: "20px",
        // justifyContent: "flex-start",
        alignItems: "flex-start",
      },
      Body:{
        height:"75%",
        width:"100%"
      },
      LayersCon: {
        display: "flex",
        flexDirection: "column",
        marginTop: "10px",
        height:"20rem",
        overflowY:"auto",
        gap:"20px"
    },
    textFieldInput:{
        marginTop:"-10px"
    },
    textFieldDropDown:{
        marginTop:"-10px",
        width:"93%"
    },
    stickyHeader: {
      position: "sticky",
      top: 0,
      backgroundColor: "#f2f2f2",
      borderCollapse: "collapse",
      border: "1px solid #ccc",
    },
    textFieldClass: {
      height: "22px",
    },


  }))

  export default MassCurveCss;








  import React, { useEffect, useState } from "react";
import WaterLabFormButtonConatiner from "../../../../../../../components/shared/WaterLabFormsButtonContainer/WaterLabFormButtonConatiner";
import MassCurveCss from "./MassCurveCss";
import InputTextField from "../../../../../../../components/shared/inputTextField/inputTextField";
import FeatureValueCon from "../../../ToolsSharedComponent/FeatureValueCon/FeatureValueCon";
import InputDropdown from "../../../../../../../components/shared/inputDropdown/inputDropdown";
import axios from "axios";

interface ICurveBody {
  setCurveTableform: React.Dispatch<React.SetStateAction<boolean>>;
  setShowForm: (arg: any) => void;
  population: number | string;
  setPopulation: React.Dispatch<React.SetStateAction<number | string>>;

  demand: number | string;
  setDemand: React.Dispatch<React.SetStateAction<number | string>>;

  hourSupply: number | string;
  setHourSupply: React.Dispatch<React.SetStateAction<number | string>>;

  avgSupply: number;
  setAvgSupply: React.Dispatch<React.SetStateAction<number>>;

  existingCapacity: number | string;
  setExistingCapacity: React.Dispatch<React.SetStateAction<number | string>>;
}


const CurvesBody = ({
  setCurveTableform,
  setShowForm,
  population,
  setPopulation,
  demand,
  setDemand,
  hourSupply,
  setHourSupply,
  avgSupply,
  setAvgSupply,
  existingCapacity,
  setExistingCapacity,
  setSelectedTimePattern,
  setFetchedOperationData,
  fetchedDemandData,
  fetchedOperationData,
  setSelectedDemandPattern,
  setFetchedDemandData,
  selectedDemandPattern,
  selectedTimePattern,

}: ICurveBody) => {
  const classes = MassCurveCss();

  // State for fetched data

  const [selectedDemandPatternInput, setSelectedDemandPatternInput] = useState<string>("DP-1");

  // State for selected time pattern
  const [selectedTimePatternInput, setSelectedTimePatternInput] = useState<string>("T-1");
  
  
  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const operationResponse = await axios.get("http://localhost:5000/opration");
        const demandResponse = await axios.get("http://localhost:5000/demand");

        setFetchedOperationData(operationResponse.data);
        setFetchedDemandData(demandResponse.data);

        // Set the default selected demand pattern to the first column (if available)
        if (demandResponse.data.length > 0) {
          const firstDemandColumn = Object.keys(demandResponse.data[0]).find((key) => key !== "time");
          if (firstDemandColumn) {
            setSelectedDemandPatternInput(firstDemandColumn);
          }
        }

        // Set the default selected time pattern to the first column (if available)
        if (operationResponse.data.length > 0) {
          const firstTimeColumn = Object.keys(operationResponse.data[0]).find((key) => key !== "time");
          if (firstTimeColumn) {
            setSelectedTimePatternInput(firstTimeColumn);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Get column names from fetched demand data
  const demandColumns = fetchedDemandData.length > 0
    ? Object.keys(fetchedDemandData[0]).filter((key) => key !== "time")
    : [];
console.log(demandColumns)
  // Get column names from fetched operation data
  const timeColumns = fetchedOperationData.length > 0
    ? Object.keys(fetchedOperationData[0]).filter((key) => key !== "time")
    : [];

  const handleDemandPatternChange = (event: any, option: any) => {
    const selectedColumn = option?.value || "DP-1";

    setSelectedDemandPatternInput(selectedColumn);

    const selectedData = fetchedDemandData.map((row:any) => ({
      time: row.time,
      value: row[selectedColumn], 
    }));
    setSelectedDemandPattern(selectedData)
  };

  // Handle time dropdown change
  const handleTimePatternChange = (event: any, option: any) => {
    const selectedColumn =option?.value || "T-1"
    setSelectedTimePatternInput(selectedColumn);
  
    const selectedData = fetchedOperationData.map((row:any) => ({
      value: row[selectedColumn], 
    }));
    setSelectedTimePattern(selectedData)
  };

  // Effect to calculate average supply
  useEffect(() => {
    if (Number(demand) > 0 && Number(hourSupply) > 0) {
      const average = Number(demand) / Number(hourSupply);
      setAvgSupply(Number(average.toFixed(0)));
    } else {
      setAvgSupply(0); // Reset avgSupply if invalid inputs
    }
  }, [demand, hourSupply]);

  const handleNext = () => {
    setCurveTableform(true);
  };

  // Reusable Input Handler for Clearing and Blurring Inputs
  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<number | string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setter(value === "" ? "" : Number(value));
    };

  const handleInputBlur =
    (setter: React.Dispatch<React.SetStateAction<number | string>>) => () => {
      setter((prev) => (prev === "" ? 0 : prev));
    };

  return (
    <div className={classes.MassCurveMain}>
      <div className={classes.Body}>
        <div className={classes.LayersCon}>
          {/* Population Input */}
          <FeatureValueCon LayerName={"Tank ID"}>
            <div className={classes.textFieldInput}>
              <InputTextField
                type="number"
                value={population === "" ? "" : population}
                required={false}
                placeholder={"Enter Population"}
                onChange={handleInputChange(setPopulation)}
                onBlur={handleInputBlur(setPopulation)}
              />
            </div>
          </FeatureValueCon>
          <FeatureValueCon LayerName={"Desine Year"}>
            <div className={classes.textFieldInput}>
              <InputTextField
                type="number"
                value={population === "" ? "" : population}
                required={false}
                placeholder={"Enter Population"}
                onChange={handleInputChange(setPopulation)}
                onBlur={handleInputBlur(setPopulation)}
              />
            </div>
          </FeatureValueCon>
          <FeatureValueCon LayerName={"Population"}>
            <div className={classes.textFieldInput}>
              <InputTextField
                type="number"
                value={population === "" ? "" : population}
                required={false}
                placeholder={"Enter Population"}
                onChange={handleInputChange(setPopulation)}
                onBlur={handleInputBlur(setPopulation)}
              />
            </div>
          </FeatureValueCon>

          {/* Demand Input */}

<FeatureValueCon LayerName={"Demand"}>
        <div className={classes.textFieldDropDown}>
          <div style={{ width: "39%" }}>
          <InputDropdown
  value={selectedDemandPatternInput}
  required={true}
  freeSolo
  placeholder="Select Demand Pattern"
  options={demandColumns.map((col) => ({ label: col, value: col }))}
  getOptionLabel={(option: any) =>
    option && typeof option === "object" && option.label ? option.label : ""
  }
  renderOption={(option: any) => (
    <React.Fragment>{option?.label || "Invalid Option"}</React.Fragment>
  )}
  onChange={handleDemandPatternChange}
/>

          </div>
        </div>
      </FeatureValueCon>



      <FeatureValueCon LayerName={"Time Of Day"}>
        <div className={classes.textFieldDropDown}>
          <div style={{ width: "39%" }}>
            <InputDropdown
              value={selectedTimePatternInput}
              required={true}
              freeSolo
              placeholder="Select Time Pattern"
              options={timeColumns.map((col) => ({ label: col, value: col }))}
              getOptionLabel={(option: any) => option?.label}
              renderOption={(option: any) => (
                <React.Fragment>{option?.label}</React.Fragment>
              )}
              onChange={handleTimePatternChange}
            />
          </div>
        </div>
      </FeatureValueCon>

          {/* Hours of Supply Input */}
       

          {/* Average Hours of Supply Display */}
     

          {/* Existing Capacity Input */}
          <FeatureValueCon LayerName={"Existing Capacity"}>
            <div className={classes.textFieldInput}>
              <InputTextField
                type="number"
                value={existingCapacity === "" ? "" : existingCapacity}
                required={false}
                placeholder={"Enter Existing Capacity"}
                onChange={handleInputChange(setExistingCapacity)}
                onBlur={handleInputBlur(setExistingCapacity)}
              />
            </div>
          </FeatureValueCon>
        </div>
      </div>

      {/* Button Container */}
      <WaterLabFormButtonConatiner
        handleCancleClick={() => setShowForm(false)}
        handleNextClick={handleNext}
        nextButtonName="Next"
        hiddenBackButton={true}
      />
    </div>
  );
};

export default CurvesBody;
