// lib/session.ts
import { SessionOptions } from 'iron-session';
import { Booking } from '../types/Booking';
import { SessionData } from '@/types/SessionData';

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_PASSWORD as string,
    cookieName: process.env.SESSON_NAME as string,
    cookieOptions: {
        secure: false
    },
};

declare module 'iron-session' {
    interface IronSessionData {
        data?: SessionData
        booking?: Booking;
    }
}
