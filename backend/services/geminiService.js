const { GoogleGenerativeAI,SchemaType } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



// AI suggestions based on location, weather, and time
const getSuggestions = async (location, weather, timeOfDay) => {
    const prompt = `
      Based on the weather in ${location} (currently ${weather.main.temp}°C and ${weather.weather[0].description}), suggest 5 activities that you can do at ${timeOfDay}.
    `;
    const result = await model.generateContent(prompt);

    return result.response.text;
};

const getSuggestsionsJson = async (location, weather, timeOfDay) => {
    const prompt = `
    You are an expert activity planner tasked with recommending engaging, practical, and location-specific activities based on the current weather and time of day. 
    Using the following inputs:
    - Location: ${location}
    - Weather: ${weather.main.temp}°C, described as "${weather.weather[0].description}"
    - Time of Day: ${timeOfDay}
  
    Your task is to suggest **exactly 5 unique and creative activities** that are well-suited to the above conditions. Consider the following:
    1. Ensure the activities are **specific to the weather** (e.g., outdoor or indoor options based on temperature and conditions like rain, snow, or sunshine).
    2. Factor in the **time of day** to suggest activities that align with morning, afternoon, evening, or night preferences.
    3. Where possible, include a **short explanation** of why each activity is suitable for the given weather and time.
    4. Keep the suggestions diverse (e.g., a mix of physical, social, relaxing, or cultural activities), ensuring they appeal to a wide audience.
    `;
    
    const schema = {
        description: "List of activities",
        type: SchemaType.ARRAY,
        items: {
            type: SchemaType.OBJECT,
            properties: {
                activityName: {
                    type: SchemaType.STRING,
                    description: "Name of the activity (e.g. 'Beach', 'Restaurant', 'Café')",
                    nullable: false,
                },
                activityType: {
                    type: SchemaType.STRING,
                    description: "Type of the activity (e.g. 'outdoor', 'food', 'coffee')",
                    nullable: false,
                },
                description: {
                    type: SchemaType.STRING,
                    description: "Description of the activity",
                    nullable: true,
                },
                location: {
                    type: SchemaType.STRING,
                    description: "Location of the activity",
                    nullable: true,
                },
                distance: {
                    type: SchemaType.STRING,
                    description: "Distance to the activity",
                    nullable: true,
                },
                longitude: {
                    type: SchemaType.NUMBER,
                    description: "Longitude of the activity",
                    nullable: true,
                },
                latitude: {
                    type: SchemaType.NUMBER,
                    description: "Latitude of the activity",
                    nullable: true,
                },
            },
            required: ["activityName", "activityType", "description", "location","distance"],
        },
    };

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    });
    console.log(prompt);
    const result = await model.generateContent(prompt);
    console.log(result);

    return JSON.parse(result.response.text());
};

module.exports = {
    getSuggestions, getSuggestsionsJson
};