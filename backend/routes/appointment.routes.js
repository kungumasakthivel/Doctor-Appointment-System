const express = require('express');
const mongoose = require('mongoose');
const Appointment = require('../models/Appointment');
const appointmentRouter = express.Router();
const Joi = require('joi');

const objectIdSchema = Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid Id format');
    }
    return value;
});

const appointmentIdSchema = Joi.object({
    appointmentId: objectIdSchema.required()
})

const appointmentSchema = Joi.object({
    doctorId: objectIdSchema.required(),
    date: Joi.date().greater('now').required().messages({
        'date.base': 'Date must be a valid date format',
        'date.greater': 'Appointment date must be in the future'
    }),
    duration: Joi.number().valid(30, 60).required().messages({
        'any.only': 'Duration must be either 30 or 60 minutes'
    }),
    appointmentType: Joi.string().required(),
    patientName: Joi.string().required(),
    notes: Joi.string().max(500).optional(),
});

appointmentRouter.get('/appointment', async (req, res) => {
    try {
        const doctors = await Appointment.find();
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

appointmentRouter.post('/appointment', async (req, res) => {
    const {error, value} = appointmentSchema.validate(req.body);
    if(error) {
        return res.status(400).json({
            message: "Provide valid data"
        })
    }

    const {doctorId, duration} = value;
    let data = await Appointment.find({duration});

    try {
        let appointment = new Appointment({...value})
        await appointment.save();
        res.status(200).send({
            message: 'Appointment booked successfully'
        })
    } catch (err) {
        res.send({
            message: "Error From Try-Catch " + err.message
        })
    }
})

appointmentRouter.get('/appointment/:id', async (req, res) => {
    const appointmentId = req.params.id;
    const {error, value} = appointmentIdSchema.validate({appointmentId});

    if(error) {
        return res.status(400).json({
            message: "Provide valid appointment Id"
        })
    }
    try {
        let appointment = await Appointment.findOne({_id: appointmentId});
        if(appointment == null) {
            return res.status(404).json({
                message: "Appointment does not exist"
            })
        }
        return res.status(200).json({
            details: appointment
        }) 
    } catch (err) {
        res.send({
            message: "Error From Try Catch " + err.message
        })        
    }
})

appointmentRouter.put('/appointment/:id', async (req, res) => {
    const appointmentId = req.params.id;
    const {errorId} = objectIdSchema.validate({appointmentId});
    if(errorId) {
        return res.status(400).json({
            message: "Provide valid data"
        })
    }
    const {error, value} = appointmentSchema.validate(req.body);

    if(error) {
        return res.status(400).json({
            message: "Provide valid User data"
        })
    }

    try {
        await Appointment.findByIdAndUpdate({_id: appointmentId}, value)
        return res.status(200).json({
            message: "Updated appointment successfully"
        })
    } catch (err) {
        res.send({
            message: "Error in Updating From Try-Catch " + err.message
        })
    }
})

appointmentRouter.delete('/appointment/:id', async (req, res) => {
    const appointmentId = req.params.id;
    const {error, value} = appointmentIdSchema.validate({appointmentId});
    if(error) {
        return res.status(400).json({
            message: "Provide valid appointment Id"
        })
    }
    try {
        await Appointment.findByIdAndDelete({_id:appointmentId})
        return res.status(200).json({
            message: "Appointment deleted successfully"
        })
    } catch (err) {
        res.send({
            message: "Not Deleted or Error " + err.message
        })         
    }
})

module.exports = {appointmentRouter}