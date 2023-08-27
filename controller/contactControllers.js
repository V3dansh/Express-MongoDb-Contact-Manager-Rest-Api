const asyncHandler=require("express-async-handler");
const Contact =require("./../models/contactModel");
//Get all contacts
//@access private
const getContacts=asyncHandler(async(req,res)=>{
    const contacts= await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
})

//Post contacts
//@access private
const createContact=asyncHandler(async(req,res)=>{
    console.log("Request body: ",req.body)
    const {name,email,phone}=req.body;
    if(!name || !email || !phone)
    {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact=await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(201).json(contact);
})

//Get all contacts
//@access public
const getContact=asyncHandler(async(req,res)=>{ 
    const contact=await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!==req.user.id)
    {
        res.status(403);
        throw new Error("User don't have permissions to update other's contact");
    }
    res.status(200).json(contact);
})

//Update contacts
//@access public
const updateContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!==req.user.id)
    {
        res.status(403);
        throw new Error("User don't have permissions to update other's contact");
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(201).json(updatedContact);
});

//Delete contacts
//@access public
const deleteContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!==req.user.id)
    {
        res.status(403);
        throw new Error("User don't have permissions to update other's contact");
    }
    await contact.deleteOne({user_id: req.user.id});
    res.status(200).json(contact);
});

module.exports={getContacts,createContact,getContact,updateContact,deleteContact};