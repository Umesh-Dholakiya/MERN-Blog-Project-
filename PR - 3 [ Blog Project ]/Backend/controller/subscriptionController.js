const SubscriptionModel = require('../models/Subscription');

// Add new subscription email
const addSubscription = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const alreadySubscribed = await SubscriptionModel.findOne({ email });
        if (alreadySubscribed) {
            return res.status(400).json({
                success: false,
                message: "Email already subscribed",
            });
        }

        const newSubscription = new SubscriptionModel({ email });
        await newSubscription.save();

        return res.status(201).json({
            success: true,
            message: "Subscription successful",
            email: newSubscription.email,
        });
    } catch (error) {
        console.error("Error adding subscription:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Get all subscription emails (admin)
const getSubscriptions = async (req, res) => {
    try {
        const subscriptions = await SubscriptionModel.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            emails: subscriptions,
        });
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Delete subscription email
const deleteSubscription = async (req, res) => {
    try {
        const { email } = req.params;

        const deleted = await SubscriptionModel.findOneAndDelete({ email });

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Email not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Subscription deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting subscription:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = {
    addSubscription,
    getSubscriptions,
    deleteSubscription
};
