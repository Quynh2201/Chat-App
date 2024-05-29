const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
// const { app, server } = require('./socket/index');
const getUserDetailFromToken = require('../helpers/getUserDetailFromToken');
const UserModel = require('../models/UserModel');
const ConversationModel = require('../models/ConversationModel');
const MessageModel = require('../models/MessageModel');
const getConversation = require('../helpers/getConversation');

const app = express();
//socket connection
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true 
    }
})

io.on('connection', async(socket) => {
    console.log("connect user", socket.id);

    const token = socket.handshake.auth.token;

    //current user detail
    const user = await getUserDetailFromToken(token);

    console.log("user", user);

    //create 
    socket.join(user?._id.toString());

    socket.on("message-homepage", async(userId) => {
        console.log("userid-socket", userId);
        const userDetail = await UserModel.findById(userId).select("-password");

        const payload = {
            _id: userDetail?._id,
            username: userDetail?.username  ,
            email: userDetail?.email,
            profile_pic: userDetail?.profile_pic
        }

        socket.emit("message-user", payload);

        //previous message
        const getConversationMessage = await ConversationModel.findOne({
            "$or": [
                { sender: user?._id, receiver: userId },
                { sender: userId, receiver: user?._id }
            ]
        }).populate('messages').sort({updatedAt: -1})

        socket.emit('message', getConversationMessage?.messages || []);
    })

    

    //new message
    socket.on("new message", async(data) => {
        try {
            // console.log(ConversationModel);
            let conversation = await ConversationModel.findOne({
                "$or": [
                    { sender: data?.sender, receiver: data?.receiver },
                    { sender: data?.receiver, receiver: data?.sender }
                ]
            });

            console.log("conversation", conversation);

            if (!conversation) {
                const createConversation = new ConversationModel({
                    sender: data?.sender,
                    receiver: data?.receiver
                });
                conversation = await createConversation.save();
            }

            const message = new MessageModel({
                text: data.text,
                imageUrl: data.imageUrl,
                videoUrl: data.videoUrl,
                messageByUserId: data?.messageByUserId
            })

            const saveMessage = await message.save()

            const updateConversation = await ConversationModel.updateOne({ _id : conversation?._id },{
                "$push" : { messages : saveMessage?._id }
            })

            const getConversationMessage = await ConversationModel.findOne({
                "$or": [
                    { sender: data?.sender, receiver: data?.receiver },
                    { sender: data?.receiver, receiver: data?.sender }
                ]
            }).populate('messages').sort({updatedAt: -1})

            console.log("getConversation", getConversationMessage)

            io.to(data?.sender).emit('message', getConversationMessage?.messages || []);
            io.to(data?.receiver).emit('message', getConversationMessage?.messages || []);

            //send conversation
            const conversationSender = await getConversation(data?.sender);
            const conversationReceiver = await getConversation(data?.receiver)

            io.to(data?.sender).emit('conversation', conversationSender);
            io.to(data?.receiver).emit('conversation', conversationReceiver);

            // return getConversationMessage;
        } catch (error) {
            console.error("Error finding/creating conversation:", error);
        }
    })

    //chatlist
    socket.on('chatlist', async(currentUserId) => {
        console.log('current user', currentUserId);
        const conversation = await getConversation(currentUserId)

        socket.emit('conversation',conversation)
    })

    socket.on('seen', async(messageByUserId) => {
        let conversation = await ConversationModel.findOne({
            "$or": [
                { sender: user?._id, receiver: messageByUserId },
                { sender: messageByUserId, receiver: user?._id }
            ]
        })
        const conversationMessageId = conversation?.messages || [];
        const updateMessage = await MessageModel.updateMany(
            { _id: {"$in": conversationMessageId}, messageByUserId: messageByUserId },
            { "$set": {seen : true}}
        )
        //send conversation
        const conversationSender = await getConversation(user?._id?.toString());
        const conversationReceiver = await getConversation(messageByUserId)

        io.to(user?._id?.toString()).emit('conversation', conversationSender);
        io.to(messageByUserId).emit('conversation', conversationReceiver);
    })

    //disconnect
    // socket.on('disconnect', () => {
    //     console.log("disconnect user", socket.id);
    // })
})

module.exports = {
    app,
    server 
}
