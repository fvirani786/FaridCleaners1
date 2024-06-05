const { Service, Review, Store } = require('./models');

// CREATE
const createService = async (data) => {
    try {
        const service = await Service.create(data);
        console.log('---- NEW SERVICE -----\n', service);
    } catch (error) {
        console.log('---- ERROR CREATING SERVICE -----\n', error);
    }
};

const createReview = async (data) => {
    try {
        const review = await Review.create(data);
        console.log('---- NEW REVIEW -----\n', review);
    } catch (error) {
        console.log('---- ERROR CREATING REVIEW -----\n', error);
    }
};

const createStore = async (data) => {
    try {
        const store = await Store.create(data);
        console.log('---- NEW STORE -----\n', store);
    } catch (error) {
        console.log('---- ERROR CREATING STORE -----\n', error);
    }
};

// READ
const getAllServices = async () => {
    try {
        const allServices = await Service.find({});
        console.log('---- ALL SERVICES -----\n', allServices);
    } catch (error) {
        console.log('---- ERROR READING SERVICES -----\n', error);
    }
};

const getAllReviews = async () => {
    try {
        const allReviews = await Review.find({});
        console.log('---- ALL REVIEWS -----\n', allReviews);
    } catch (error) {
        console.log('---- ERROR READING REVIEWS -----\n', error);
    }
};

const getAllStores = async () => {
    try {
        const allStores = await Store.find({});
        console.log('---- ALL STORES -----\n', allStores);
    } catch (error) {
        console.log('---- ERROR READING STORES -----\n', error);
    }
};

// UPDATE
const updateService = async (filter, update) => {
    try {
        const response = await Service.updateOne(filter, update);
        console.log('---- SERVICE UPDATED -----\n', response);
    } catch (error) {
        console.log('---- ERROR UPDATING SERVICE -----\n', error);
    }
};

// DELETE
const deleteService = async (filter) => {
    try {
        const response = await Service.deleteOne(filter);
        console.log('---- SERVICE DELETED -----\n', response);
    } catch (error) {
        console.log('---- ERROR DELETING SERVICE -----\n', error);
    }
};

// You can define similar functions for Review and Store CRUD operations

module.exports = {
    createService,
    createReview,
    createStore,
    getAllServices,
    getAllReviews,
    getAllStores,
    updateService,
    deleteService
    // Add similar exports for Review and Store CRUD operations
};
