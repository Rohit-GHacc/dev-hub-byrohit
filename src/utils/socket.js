import {io} from 'socket.io-client'
import { BASE_URL } from './constants'

export const createSocketConnection = ()=>{
    // connect to backend system
    return io(BASE_URL)
}