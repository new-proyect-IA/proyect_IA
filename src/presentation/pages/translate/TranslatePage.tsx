import { useState } from "react"
import GptMessage from "../../components/chat-bubbles/GptMessage"
import MyMessage from "../../components/chat-bubbles/MyMessage"
import TypingLoader from "../../components/loaders/TypingLoader"
import { TextMessageBoxSelect } from "../../components"
import { traslateUseCase } from "../../../core/use-case"





interface Message {
  text: string
  isGpt: boolean
}

const languages = [
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "inglés", text: "Inglés" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
];

const TranslatePage = () => {

  const [Isloading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

const handlePost = async ( text: string, selectedOption: string) =>  {

  setIsLoading(true);

  const newMessage = `Traduce: ${text} al idioma ${selectedOption}`

  setMessages( (prev) => [...prev, { text: newMessage, isGpt: false}])

  //TODO UseCAse
  const { ok, message } = await traslateUseCase(text, selectedOption)

  if ( !ok ){
    setMessages( (prev) => [...prev, { text: 'No se pudo realizar la Traducción', isGpt: true}])
  } else {
    setMessages( (prev) => [...prev, {
      text: message,
      isGpt: true,
    }])
  }

  setIsLoading(false)

  // Todo: Añadir el mensaje de isGPT en true 
}


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          { /* Bienvenida */}

          <GptMessage text="Hola, que puedo traducir para ti" />
        
          {
            messages.map( (message, index) => (
              message.isGpt
                ? (
                  <GptMessage key={ index } text={ message.text } />
                )
                : (
                  <MyMessage key={ index } text={ message.text } />
                )
            ))
          }

          {
            Isloading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader />
              </div>
            )
          }
        </div>
      </div>
|     
      { /* componente para el texto del usuario */}

      <TextMessageBoxSelect
        onSendMessage={ handlePost }
        placeholder="Escribe tu texto"
        options={ languages }
      />

    </div>
  )
}

export default TranslatePage