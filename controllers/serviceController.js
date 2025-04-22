import Service from "../models/Service.js";

export const createService = async (req, res, next) => {
  try {
    const { title, description, price } = req.body;

    const service = await Service.create({
      title,
      description,
      price,
      createdBy: req.user._id,
    });

    res.status(201).json(service);
  } catch (err) {
    next(err);
  }
};


export const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find().populate("createdBy", "name email");
    res.json(services);
  } catch (err) {
    next(err);
  }
};
