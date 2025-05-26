import mongoose from "mongoose";
import Timber from "../models/timber.model.js";

export const getTimbers = async (req, res) => {
	try{
		const timbers = await Timber.find({});
		res.status(200).json({success: true, data: timbers});
	}catch(error) {
		console.log("error in fetching timbers:", error.message);
		res.status(500).json({success: false, message:"Server Error"});
	}
};

export const createTimber = async (req, res) => {
	const timber = req.body;

	if(!timber.id || !timber.height || !timber.diameter || !timber.volume){
		return res.status(400).json({success:false, message: "please provide all fields"});
	}

	const newTimber = new Timber(timber)

	try{
		await newTimber.save();
		res.status(201).json({success: true, data: newTimber});
	} catch (error){
		console.error("Error in Adding timber", error.message);
		res.status(500).json({success: true, message: "Server Error"});
	}
};

export const updateTimber = async (req, res) => {
	const { id } = req.params;
	const timber = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ success: false, message: "Invalid Timber ID" });
	}

	try {
		const updatedTimber = await Timber.findByIdAndUpdate(id, timber, {
			new: true,
			runValidators: true,
		});

		if (!updatedTimber) {
			return res.status(404).json({ success: false, message: "Timber not found" });
		}

		res.status(200).json({ success: true, data: updatedTimber });
	} catch (error) {
		console.error("Error updating timber:", error);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteTimber = async (req, res) => {
	const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ success: false, message: "Invalid Timber ID" });
	}
    
	try{
		await Timber.findByIdAndDelete(id);
		res.status(200).json({success: true, message: "Timber deleted"});
	}catch(error) {
		console.log("error in deleting timber:", error.message);
		res.status(500).json({success: false, message:"Server Error"});
	}
};