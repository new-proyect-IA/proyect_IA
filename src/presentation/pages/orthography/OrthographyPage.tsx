import { useState } from "react"
import GptMessage from "../../components/chat-bubbles/GptMessage"
import MyMessage from "../../components/chat-bubbles/MyMessage"
import TextMessageBox from "../../components/chat-input-boxes/TextMessageBox"
import TypingLoader from "../../components/loaders/TypingLoader"
import TextMessageBoxFile from "../../components/chat-input-boxes/TextMessageBoxFile"


interface Message {
  text: string
  isGpt: boolean
}


const OrthographyPage = () => {

  const [Isloading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

const handlePost = async ( text: string) =>  {
  setIsLoading(true)
  setMessages( (prev) => [...prev, { text: text, isGpt: false}])

  //TODO UseCAse

  setIsLoading(false)

  // Todo: Añadir el mensaje de isGPT en true 
}


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          { /* Bienvenida */}

          <GptMessage text="Hola, Soy tu asistente puedes escribir el texto en español, y te ayudo con la corrección en la ortografía" />
        
          {
            messages.map( (message, index) => (
              message.isGpt
                ? (
                  <GptMessage key={ index } text='Text de OpenIA' />
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

      <TextMessageBox
        onSendMessage={ handlePost }
        placeholder="Escribe tu texto"
        disableCorrections
      />
      {/* <TextMessageBoxFile
        onSendMessage={ handlePost }
        placeholder="Escribe tu texto"
      /> */}

    </div>
  )
}

export default OrthographyPage