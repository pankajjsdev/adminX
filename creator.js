const fs = require("fs");
const path = require("path");

// Check if folder name is provided as argument
if (process.argv.length < 3) {
  console.log("Usage: node create_files.js <folder_name>");
  process.exit(1);
}

// Extract folder name from command line arguments
const folderName = process.argv[2];
const currentPath = process.cwd(); // Get the current directory

// Create the folder in the current location
const folderPath = path.join(currentPath, folderName);
fs.mkdirSync(folderPath);

// Change directory to the newly created folder
process.chdir(folderPath);

// Controller file content
const controllerFile = `
const ${folderName}Service = require('./${folderName}Service');
const { sendErrorResponse, sendSuccessResponse } = require('../../common/responseHelper');
const messages = require('../../common/messages.json');

// Controller for handling GET requests to fetch all documents
exports.getAllDocuments = [
   async (req, res) => {
  try {
    const documents = await ${folderName}Service.getAllDocuments(req);
    sendSuccessResponse(res, 200, '${folderName} list found', documents);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]

// Controller for handling GET requests to fetch a single document by ID
exports.getDocumentById = [
  async (req, res) => {
  try {
    const document = await ${folderName}Service.getDocumentById(req.params.id);
    if (!document) {
      return sendErrorResponse(res, 404, '${folderName} not found');
    }
    sendSuccessResponse(res, 200, '${folderName} found', document);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]

// Controller for handling POST requests to create a new document
exports.createDocument = [
  async (req, res) => {
  try {
    const document = await ${folderName}Service.createDocument(req.body);
    sendSuccessResponse(res, 201, '${folderName} created successfully', document);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]

// Controller for handling PUT requests to update a document by ID
exports.updateDocument = [
  async (req, res) => {
  try {
    const document = await ${folderName}Service.updateDocument(req.params.id, req.body);
    if (!document) {
      return sendErrorResponse(res, 404, '${folderName} not found');
    }
    sendSuccessResponse(res, 200, '${folderName} updated successfully', document);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]

// Controller for handling DELETE requests to delete a document by ID
exports.deleteDocument =[
   async (req, res) => {
  try {
    const document = await ${folderName}Service.deleteDocument(req.params.id);
    if (!document) {
      return sendErrorResponse(res, 404, '${folderName} not found');
    }
    sendSuccessResponse(res, 200, '${folderName} deleted successfully');
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
}]
`;

// Model file content
const modelFile = `
// Require Mongoose
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Define Schema
const Schema = mongoose.Schema;

// Create a new Schema
const ${folderName}Schema = new Schema({
  // Define your schema fields and their types
  field1: {
    type: String,
    required: true
  },
  field2: {
    type: Number,
    required: true
  },
  // Add more fields as needed
},{timestamps:true});

// Apply the paginate plugin to the schema
${folderName}Schema.plugin(mongoosePaginate);

// Compile the schema into a model
const ${folderName}Model = mongoose.model('${folderName}Model', ${folderName}Schema);

// Export the model
module.exports = ${folderName}Model;
`;

// Route file content
const routeFile = `
const express = require('express');
const router = express.Router();
const ${folderName}Controller = require('./${folderName}Controller');

// GET all documents
router.get('/list', ${folderName}Controller.getAllDocuments);

// GET a document by ID
router.get('/:id', ${folderName}Controller.getDocumentById);

// POST create a new document
router.post('/create', ${folderName}Controller.createDocument);

// PUT update a document by ID
router.put('/update/:id', ${folderName}Controller.updateDocument);

// DELETE delete a document by ID
router.delete('/delete/:id', ${folderName}Controller.deleteDocument);

module.exports = router;
`;

// Service file content
const serviceFile = `
const ${folderName}Model = require('./${folderName}Model');

// Service function to fetch all documents
exports.getAllDocuments = async (req) => {
  try {
    // Extracting pagination parameters from the request query
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    const searchQuery = req.query.search || '';

    const options = {
        page: page,
        limit: limit,
        customLabels: {
          docs: 'list'
        },
        projection: {},
        pagination: limit ? true : false,
      };

    // Building the query object for search
    const query = {};

    if (searchQuery) {
      query.$or = [
        { 'name': { $regex: searchQuery, $options: 'i' } }
      ];
    }
    
    return ${folderName}Model.paginate(query, options);
  } catch (error) {
    throw new Error('Error fetching ${folderName}');
  }
};

// Service function to fetch a single document by ID
exports.getDocumentById = async (id) => {
  try {
    return await ${folderName}Model.findById(id);
  } catch (error) {
    throw new Error('Error fetching ${folderName} by ID');
  }
};

// Service function to create a new document
exports.createDocument = async (data) => {
  try {
    return await ${folderName}Model.create(data);
  } catch (error) {
    throw new Error('Error creating ${folderName}');
  }
};

// Service function to update a document by ID
exports.updateDocument = async (id, data) => {
  try {
    return await ${folderName}Model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  } catch (error) {
    throw new Error('Error updating ${folderName}');
  }
};

// Service function to delete a document by ID
exports.deleteDocument = async (id) => {
  try {
    return await ${folderName}Model.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting ${folderName}');
  }
};
`;

// Validator file content
const validatorFile = `
// validators.js
const ${folderName}Service = require('./${folderName}Service');
const { body, validationResult } = require('express-validator');

// Validation rules for creating a new document
exports.validateCreateDocument = [
  body('field1').notEmpty().withMessage('Field1 is required'),
  body('field2').notEmpty().withMessage('Field2 is required').isNumeric().withMessage('Field2 must be a number'),
];

// Validation rules for updating a document
exports.validateUpdateDocument = [
  body('field1').optional().notEmpty().withMessage('Field1 is required'),
  body('field2').optional().notEmpty().withMessage('Field2 is required').isNumeric().withMessage('Field2 must be a number'),
];

// Middleware to check for validation errors
exports.checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};
`;

// Write files to the folder
fs.writeFileSync(`${folderName}Controller.js`, controllerFile);
fs.writeFileSync(`${folderName}Model.js`, modelFile);
fs.writeFileSync(`${folderName}Route.js`, routeFile);
fs.writeFileSync(`${folderName}Service.js`, serviceFile);
fs.writeFileSync(`${folderName}Validator.js`, validatorFile);
fs.writeFileSync(`${folderName}Helper.js`, "");
fs.writeFileSync(`${folderName}Middleware.js`, "");
fs.writeFileSync(`${folderName}.test.js`, "");

console.log("Files created successfully.");
