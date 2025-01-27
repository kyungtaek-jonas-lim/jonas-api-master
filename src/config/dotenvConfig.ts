import dotenv from 'dotenv';

dotenv.config();

export const config = {
    // Serer
    port: process.env.PORT || 3000,
    
    // OpenAI
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    openaiChatCompletionUrl: process.env.OPENAI_CHAT_COMPLETION_URL || 'https://api.openai.com/v1/chat/completions',

    // HuggingFace
    huggingfaceApiKey: process.env.HUGGINGFACE_API_KEY || '',
    huggingfaceGpt2Url: process.env.HUGGINGFACE_GPT2_URL || 'https://api-inference.huggingface.co/models/gpt2',

    // Google
    googleClientId: process.env.GOOGLE_CLIENT_ID || '',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    googleOidcRedirectUri: process.env.GOOGLE_OIDC_REDIRECT_URI || 'http://localhost:3000/auth/callback',
    googleAuthUrl : process.env.GOOGLE_AUTH_URL || 'https://accounts.google.com/o/oauth2/v2/auth',
    googleTokenUrl : process.env.GOOGLE_TOKEN_URL || 'https://oauth2.googleapis.com/token',
    googleUserinfoUrl : process.env.GOOGLE_USERINFO_URL || 'https://www.googleapis.com/oauth2/v3/userinfo',
}