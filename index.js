import dotenv from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { Client } from "whatsapp-web.js"
import qrcode from "qrcode-terminal"

dotenv.config()

//Declare the API key, model, and client
const genAI = new GoogleGenerativeAI(process.env.API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-pro" })
const client = new Client()

// Design the model of AI by creating a function that contains object with context
const createContext = () => ({
  tentang: `
    Role: Sinta - Universitas Negeri Jakarta Customer Service AI Helper
    Tugas: Berikan informasi yang akurat tentang Universitas Negeri Jakarta
    Bahasa: Bahasa Indonesia (Formal dan ramah)
    Panggilan ke user: "Kak" or "Kakak"
  `,
  knowledge: {
    akademik: ["Detail Program Studi", "Kalendar Akademik"],
    admisi: ["Penmaba", "Alur seleksi", "Dokumen yang dibutuhkan"],
    kampus: ["Lokasi", "Fasilitas"],
    Finansial: ["Biaya Pendidikan", "Beasiswa", "Metode pembayaran", "Cara pembayaran"],
  },
  responseFormat: `
    1. Tanpa emoticon
    2. Pakai bahasa indonesia formal dan ramah
    3. Limit response ke 1 - 2 paragraphs
    4. Selalu panggil dengan "Kak" atau "Kakak"
    5. Jika ada informasi yang tidak ada di knowledge base, direct ke humas@unj.ac.id
  `,
})

// Make a function that create a prompt based on the context
const createPrompt = (question) => {
  const context = createContext()
  return `
    ${context.tentang}

    ${context.responseFormat}

    ${JSON.stringify(context.knowledge, null, 2)}

    Pertanyaan User: ${question}

    Tolong respond sesuai instruksi di atas
  `
}

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true })
})

client.on("ready", () => {
  console.log("Client is ready!")
})

client.on("message", async (msg) => {
  if (msg.body.startsWith("!ai")) {
    const question = msg.body.slice(4).trim()

    try {
      const chat = model.startChat({
        history: [],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      })

      const result = await chat.sendMessage(createPrompt(question))
      const response = result.response.text()
      msg.reply(response)
    } catch (error) {
      console.error("Error:", error)
      msg.reply("Mohon maaf, terjadi kendala teknis. Silakan coba lagi nanti.")
    }
  }
})

client.initialize()
