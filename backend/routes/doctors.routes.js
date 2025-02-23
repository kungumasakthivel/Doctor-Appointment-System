const express = require('express');
const Doctor = require('../models/Doctor');
const doctorRouter = express.Router();
const Joi = require('joi');

const doctorSchema = Joi.object({
    name: Joi.string().required(),
    workingHours: Joi.object({
        start: Joi.string().required(),
        end: Joi.string().required(),
    }).required(),
    specialization: Joi.string().optional(),
});

// retrive all doctors list
doctorRouter.get('/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

doctorRouter.post('/doctors', async(req, res) => {
    const { error, value } = doctorSchema.validate(req.body);
    console.log(value);
    if(error) {
        return res.status(400).json({
            message: "Provide valid data"
        })
    }

    const {name} = value;

    let data = await Doctor.findOne({name});
    if(data) {
        return res.status(400).json({
            message: 'doctor already registered'
        })
    }

    try {
        let doctor = new Doctor({...value})
        await doctor.save()
        res.send({
            message: 'doctor created successfully'
        })
    } catch(err) {
         res.send({
            message: "Error From Try Catch " + err.message
        })
    }
})

module.exports = {doctorRouter};