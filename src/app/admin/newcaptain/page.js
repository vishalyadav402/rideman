"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AdminLayout from '@/app/AdminLayout';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CaptainRegistration = () => {
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleFormSubmit = (data) => {
    console.log(data);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mt-5 mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Register as a Captain</h2>
        
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className="border border-gray-300 rounded-lg mb-4">
          <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-gray-100 px-4 py-2 font-semibold">
            Personal Information
          </AccordionSummary>
          <AccordionDetails className="p-4">
            <PersonalInfoForm onSubmit={handleFormSubmit} />
          </AccordionDetails>
        </Accordion>
        
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className="border border-gray-300 rounded-lg mb-4">
          <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-gray-100 px-4 py-2 font-semibold">
            KYC Information
          </AccordionSummary>
          <AccordionDetails className="p-4">
            <KYCForm onSubmit={handleFormSubmit} />
          </AccordionDetails>
        </Accordion>
        
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className="border border-gray-300 rounded-lg mb-4">
          <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-gray-100 px-4 py-2 font-semibold">
            Vehicle Details
          </AccordionSummary>
          <AccordionDetails className="p-4">
            <VehicleForm onSubmit={handleFormSubmit} />
          </AccordionDetails>
        </Accordion>
        
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} className="border border-gray-300 rounded-lg mb-4">
          <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-gray-100 px-4 py-2 font-semibold">
            Bank Details
          </AccordionSummary>
          <AccordionDetails className="p-4">
            <BankForm onSubmit={handleFormSubmit} />
          </AccordionDetails>
        </Accordion>
      </div>
    </AdminLayout>
  );
};

const InputField = ({ label, name, register, errors, type = 'text' }) => (
  <div>
    <label className="block text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      {...register(name, { required: `${label} is required` })}
    />
    {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
  </div>
);

const PersonalInfoForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField label="Full Name" name="fullName" register={register} errors={errors} />
      <InputField label="Email" name="email" register={register} errors={errors} type="email" />
      <InputField label="Phone Number" name="phone" register={register} errors={errors} type="tel" />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Submit</button>
    </form>
  );
};

const KYCForm = ({ onSubmit }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const aadharPreview = watch('aadharFile')?.[0] ? URL.createObjectURL(watch('aadharFile')[0]) : null;
    const licensePreview = watch('licenseFile')?.[0] ? URL.createObjectURL(watch('licenseFile')[0]) : null;
    
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField label="Aadhar Number" name="aadhar" register={register} errors={errors} />
        <label className="block text-gray-700">Upload Aadhar</label>
        <input type="file" className="w-full p-2 border rounded-lg" {...register('aadharFile', { required: 'Aadhar file is required' })} />
        {aadharPreview && <img src={aadharPreview} alt="Aadhar Preview" className="w-32 h-32 mt-2" />}
        {errors.aadharFile && <p className="text-red-500 text-sm">{errors.aadharFile.message}</p>}
        
        <InputField label="Driving License Number" name="license" register={register} errors={errors} />
        <label className="block text-gray-700">Upload Driving License</label>
        <input type="file" className="w-full p-2 border rounded-lg" {...register('licenseFile', { required: 'Driving License file is required' })} />
        {licensePreview && <img src={licensePreview} alt="License Preview" className="w-32 h-32 mt-2" />}
        {errors.licenseFile && <p className="text-red-500 text-sm">{errors.licenseFile.message}</p>}
        
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Submit</button>
      </form>
    );
  };

const VehicleForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField label="Vehicle Model" name="vehicleModel" register={register} errors={errors} />
      <InputField label="Vehicle Number" name="vehicleNumber" register={register} errors={errors} />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Submit</button>
    </form>
  );
};

const BankForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField label="Account Holder Name" name="accountHolder" register={register} errors={errors} />
      <InputField label="Bank Name" name="bankName" register={register} errors={errors} />
      <InputField label="Account Number" name="accountNumber" register={register} errors={errors} />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Submit</button>
    </form>
  );
};

export default CaptainRegistration;
