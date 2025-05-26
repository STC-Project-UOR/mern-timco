import mongoose from "mongoose";
import Classification from "../models/classification.model.js";

export const getClassifications = async (req, res) => {
	try{
		const classifications = await Classification.find({});
		res.status(200).json({success: true, data: classifications});
	}catch(error) {
		console.log("error in fetching classifications:", error.message);
		res.status(500).json({success: false, message:"Server Error"});
	}
};

export const createClassification = async (req, res) => {
	const classification = req.body;

	if(!classification.class || !classification.name ){
		return res.status(400).json({success:false, message: "please provide all fields"});
	}

	const newClassification = new Classification(classification)

	try{
		await newClassification.save();
		res.status(201).json({success: true, data: newClassification});
	} catch (error){
		console.error("Error in Adding Classification", error.message);
		res.status(500).json({success: true, message: "Server Error"});
	}
};

export const updateClassification = async (req, res) => {
	const { id } = req.params;
	const classification = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ success: false, message: "Invalid Classification ID" });
	}

	try {
		const updatedClassification = await Classification.findByIdAndUpdate(id, classification, {
			new: true,
			runValidators: true,
		});

		if (!updatedClassification) {
			return res.status(404).json({ success: false, message: "Classification not found" });
		}

		res.status(200).json({ success: true, data: updatedClassification });
	} catch (error) {
		console.error("Error updating classification:", error);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteClassification = async (req, res) => {
	const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ success: false, message: "Invalid Classification ID" });
	}
    
	try{
		await Classification.findByIdAndDelete(id);
		res.status(200).json({success: true, message: "Classification deleted"});
	}catch(error) {
		console.log("error in deleting classification:", error.message);
		res.status(500).json({success: false, message:"Server Error"});
	}
};