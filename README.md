# WhatsApp Chatbot with Gemini AI

A Node.js-based WhatsApp chatbot that uses whatsapp-web.js for WhatsApp interaction and Google's Gemini AI for intelligent responses. This project was developed as part of President University MSIT Machine Learning course assignment to demonstrate practical applications of AI in messaging platforms.

## Prerequisites

Before running this bot, make sure you have:

- Node.js
- npm
- A WhatsApp account
- Google Cloud account with Gemini AI API access
- Chrome/Chromium browser installed

## Installation

1. Clone the repository:
```bash
git clone https://github.com/nathanpasca/wa-chat-bot
cd wa-chat-bot
```

2. Install dependencies:
```bash
npm install whatsapp-web.js
npm install @google/generative-ai
npm install qrcode-terminal
```

3. Create a `.env` file in the root directory:
```env
API_KEY=your_gemini_api_key_here
```

## Usage

1. Start the bot:
```bash
node index.js
```

2. Scan the QR code with WhatsApp Web to authenticate

3. The bot is now ready to receive and respond to messages

## Academic Disclaimer

This project was developed as part of an academic assignment in Machine Learning. While it serves as a practical demonstration of AI concepts, it may need additional features and security measures for production use.

## Acknowledgments

- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- [Google Gemini AI](https://ai.google.dev/)
- Course instructors and teaching staff for guidance
