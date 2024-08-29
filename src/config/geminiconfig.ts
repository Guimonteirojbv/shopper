import { env } from '@/env';
import { GoogleGenerativeAI } from '@google/generative-ai'
import { GoogleAIFileManager } from "@google/generative-ai/server";



const GenAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
const FileManager = new GoogleAIFileManager(env.GEMINI_API_KEY)

export {GenAI, FileManager} 