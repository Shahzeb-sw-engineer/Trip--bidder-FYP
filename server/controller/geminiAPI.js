const { GoogleGenerativeAI } = require("@google/generative-ai");
const sendResponse = require('../utils/sendResponse')

async function createAITrip(req, res) {

    try {

        const { tripLocation, totalDays, totalPeople, travellingWith, budget, occation } = req.body

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // const prompt = `
        // Generate a detailed trip plan based on the following information:
        // 1. Trip Location: ${tripLocation}
        // 2. Total Days: ${totalDays}
        // 3. Total People: ${totalPeople}
        // 4. Travelling With: ${travellingWith}
        // 5. Budget: ${budget}
        // 6. Occasion: ${occation}

        // Please provide a day-by-day itinerary including activities, places to visit, and any recommendations for food and accommodation that fit within the budget (Dont include flight expenses). Make sure to consider the occasion if provided and the type of people the user is travelling with. Plan a scalable trip with above data provided and if some of the fields are not provided then you need to skip these`;


        const prompt = `
Pretend you are the world's best trip advisor and I have hired you to plan my trip. You will use the text that I give you as a reference for the trip. This text will include location, duration of the trip, who I am traveling with, activities should include ${occation}, budget max amount of ${budget}. Here is the information you will need to plan the trip:

- Location: ${tripLocation}
- Duration: ${totalDays} days
- Traveling With: ${travellingWith}
- Occasion: ${occation}

Flights and transportation have already been taken care of. I simply want to plan the most fun trip and take the most advantage of my time while I'm there. I am taking the trip to eat good food, find unique things to do, see beautiful sights, and go to cool events. It should be a trip of a lifetime and jam-packed with things to do. Help me craft the perfect trip. 

Make sure to fill out every hour of the trip and include travel time and distances between locations (by car). In a table, list out all the locations where we would need to make a reservation and the costs associated with each location. Column one should be all the locations that need reservations and column two should be the estimated prices associated with each location. Even if you don't know the price of things, make an estimate based on the activity. At the end of the list, total up all of column two for a total budget for activities.

The output text should be in English and should not exceed 2900 characters, Dont include tables, and format beautifully with a good spaces after paragraph.
`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        sendResponse(req, res, true, "Trip generated successfully", text)
    }
    catch (err) {
        sendResponse(req, res, false, err.message, null)
    }

}

module.exports = { createAITrip }
