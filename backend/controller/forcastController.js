const asyncHandler = require("express-async-handler");
const Forcast = require("../models/Forcastmodel");

const saveforcast = asyncHandler(async (req, res) => {
  const { forecastData, project_id, r2Values } = req.body;

  try {
    const forcastdata = await Forcast.create({
      forecastData,
      project_id,
      r2Values,
    });

    if (forcastdata) {
      res.status(201).json({
        forecastData,
        project_id,
        r2Values,
      });
    } else {
      res.status(400);
      throw new Error("Failed to save forecast data.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getForcast = asyncHandler(async (req, res) => {
  try {
    const { project_id } = req.params;
    console.log(req.params.project_id);
    const data = await Forcast.find({ project_id });
    if (data.length > 0) {
      res.status(200).send(data);
    } else {
      res.send("404 no data ");
      throw new Error("No data avaliable for this id ");
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

const updateForcast = asyncHandler(async (req, res) => {
  const { project_id } = req.params; // Extract project_id from URL params
  const { _id, ...updateData } = req.body; // Remove _id from the update data

  try {
    // Find the document by project_id and update it
    const updatedForcast = await Forcast.findOneAndUpdate(
      { project_id }, // Filter by project_id
      updateData, // Update data (excluding _id)
      { new: true } // Return the updated document
    );

    // If no document is found, return a 404 error
    if (!updatedForcast) {
      res.status(404);
      throw new Error("Forecast data not found for the specified project_id.");
    }

    // Send the updated document as a response
    res.status(200).json({
      message: "Forecast data updated successfully.",
      data: updatedForcast,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: error.message, // Send a generic error message
    });
  }
});

const deleteForcast = asyncHandler(async (req, res) => {
  const { project_id } = req.params;
  try {
    const deletedata = await Forcast.findOneAndDelete({
      project_id,
    });
    if (deletedata) {
      res.status(200).json(deletedata);
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

const findd = async (req, res) => {
  const { project_id } = req.params; // Extract project_id from URL params

  try {
    const result = await Forcast.find({ project_id });

    if (result.length === 0) {
      res.status(404).json({ message: "No forecast data found for the specified project_id." });
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const insertdata = async (req, res) => {
  try {
    // Insert a new document using the native MongoDB driver
    const result = await Forcast.collection.insertOne(
      {
      project_id: "6784b6b1-f59c-8004-8411-a98a50e2de232",
      forecastData: 755757,
      r2Values: 5757575,
      mobileNum: 99887744, // Extra field not in the schema
    },
      {
      project_id: "6784b6b1-f59c-8004-8411-a98a50e2de232",
      forecastData: 755757,
      r2Values: 5757575,
      mobileNum: 99887744, // Extra field not in the schema
    }
  );

    // Get the inserted document's ID
    const insertedId = result.insertedId;
    console.log(insertedId);

    // Find the inserted document using Mongoose
    const insertedDocument = await Forcast.findById(insertedId);

    // Send the inserted document as a response
    res.status(201).json({
      message: "Data inserted successfully.",
      data: insertedDocument,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: error.message,
    });
  }
};
const insertManydata = async (req, res) => {
  try {
    // Insert multiple documents using the native MongoDB driver
    const result = await Forcast.collection.insertMany([
      {
        project_id: "6784b6b1-f59c-8004-8411-a98a50e2de232",
        forecastData: 755757,
        r2Values: 5757575,
        mobileNum: 99887744, // Extra field not in the schema
      },
      {
        project_id: "6784b6b1-f59c-8004-8411-a98a50e2de232",
        forecastData: 755757,
        r2Values: 5757575,
        mobileNum: 99887744, // Extra field not in the schema
      },
    ]);

    // Get the inserted document IDs
    const insertedIds = result.insertedIds;
    console.log("Inserted IDs:", insertedIds);

    // Retrieve the inserted documents (if needed, but typically redundant)
    const insertedDocuments = await Forcast.find({
      _id: { $in: Object.values(insertedIds) },
    });

    // Send a success response with the inserted documents
    res.status(201).json({
      message: "Data inserted successfully.",
      data: insertedDocuments,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {findd,saveforcast, getForcast, updateForcast, deleteForcast,insertdata,insertManydata };
