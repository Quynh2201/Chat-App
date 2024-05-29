const ConversationModel = require('../models/ConversationModel');

const getConversation = async(currentUserId)=>{
    if(currentUserId){
        const currentUserConversation = await ConversationModel.find({
            "$or" : [
                { sender : currentUserId },
                { receiver : currentUserId}
            ]
        }).sort({  updatedAt : -1 }).populate('messages').populate('sender').populate('receiver')

        const conversation = currentUserConversation.map((conv)=>{
            const countUnseenMessage = conv?.messages?.reduce((prev,current) => {
                const messageByUserId = current?.messageByUserId?.toString();

                if(messageByUserId !== currentUserId){
                    return  prev + (current?.seen ? 0 : 1);
                }else{
                    return prev;
                }
             
            },0)
            
            return{
                _id : conv?._id,
                sender : conv?.sender,
                receiver : conv?.receiver,
                unseenMessage : countUnseenMessage,
                lastMessage : conv.messages[conv?.messages?.length - 1]
            }
        })

        return conversation;
    }else{
        return [];
    }
}

module.exports = getConversation;