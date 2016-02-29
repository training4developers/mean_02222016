var
	mongoose = require("mongoose"),

	creditCardSchema = mongoose.Schema({
		name: String,
		minCreditScore: Number,
		introApr: Number,
		normalApr: Number
	}),

	CreditCardModel = mongoose.model("creditCard", creditCardSchema);

module.exports = CreditCardModel;
