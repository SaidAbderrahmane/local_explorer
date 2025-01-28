const { GoogleGenerativeAI,SchemaType } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



// AI suggestions based on location, weather, and time
const getSuggestions = async (location, weather, timeOfDay) => {
    const prompt = `
      Based on the weather in ${location} (currently ${weather.main.temp}°C and ${weather.weather[0].description}), suggest three activities to do during the ${timeOfDay}.
    `;
    const result = await model.generateContent(prompt);

    return result.response.text;
};

const getSuggestsionsJson = async (location, weather, timeOfDay) => {
    const prompt = `
    Based on the weather in ${location} (currently ${weather.main.temp}°C and ${weather.weather[0].description}), suggest three activities at ${timeOfDay}.
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