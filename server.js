const dotenv = require('dotenv');
dotenv.config();

const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = require("./src/app");
const connectDB = require('./src/db/db');
const generateResponse = require('./src/service/ai.service');

connectDB();

// Express server communicates via http protocol
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

const chatHistory = [];

// Note: Remember this io is referring to server here and socket is referring to client or specific user who is connected

/**
 * There are two types of events: 
 * 1. Inbuilt-events => These are only two events (connection, disconnect)
 * 2. Custom Events => Can be of any number
*/

// When this connection event triggers and establishes a new connection with server then this callback executes.
io.on('connection', (socket) => {
    console.log('A user is connected');
    // built-in event
    socket.on('disconnect', () => {
        console.log("A user disconnected");
    });

    // Custom event listening
    socket.on('ai-message', async (message) => {
        chatHistory.push({
            role: 'user',
            parts: [{
                text: message
            }]
        });

        const response = await generateResponse(chatHistory);

        chatHistory.push({
            role: 'model',
            parts: [{
                text: response
            }]
        });

        socket.emit('ai-response', { response });
    });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});