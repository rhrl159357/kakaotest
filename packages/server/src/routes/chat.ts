import {Router} from 'express'
import Chat from '../schemas/chat';
import Room from '../schemas/room';
import User from '../schemas/user';

const router = Router();

// 채팅 목록

router.get('/:roomId', async(req, res)=> {
    try {
        const chat = await Chat.findAll({
            where: {
                roomId: req.params.roomId
            },
            include:[User,Room]
        })
        res.json(chat);
    } catch (e) {
        
    }
})

//채탱 전송

router.post('/:roomId', async(req, res)=>{
    try {
        const chat = await Chat.create({
            senderId: req.session.userId,
            content: req.body.content,
            roomId: req.params.roomId
        })
        /*  TODO:: socket */

        const io = req.app.get('io');

        io.of('/chat').to(req.params.roomId).emit('chat',chat)

        res.json({message: 'Ok'});
    } catch (e) {
        
    }
})

export default router