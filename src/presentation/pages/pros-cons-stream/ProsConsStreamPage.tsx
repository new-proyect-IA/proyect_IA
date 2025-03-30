

import { useState } from "react"
import GptMessage from "../../components/chat-bubbles/GptMessage"
import MyMessage from "../../components/chat-bubbles/MyMessage"
import TextMessageBox from "../../components/chat-input-boxes/TextMessageBox"
import TypingLoader from "../../components/loaders/TypingLoader"
import { prosConsStreamUseCase } from "../../../core/use-case"


interface Message {
  text: string
  isGpt: boolean
}


const ProsConsStreamPage = () => {

  const [Isloading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

const handlePost = async ( text: string) =>  {
  setIsLoading(true)
  setMessages( (prev) => [...prev, { text: text, isGpt: false}])

  //TODO UseCAse

  const reader = await prosConsStreamUseCase(text)
  setIsLoading(false)

  // Generar el ultimo mensaje

  if ( !reader ) return;

  const decoder = new TextDecoder()
  let message = ''
  setMessages( (messages) => [ ...messages, { text: message, isGpt: true }])

  while(true){
    const { value, done} = await reader.read();

    if(done) break;

    const decodeChunk = decoder.decode( value, { stream: true })
    message += decodeChunk

    setMessages( (messages) =>{
      const newMessages = [...messages]
      newMessages[ newMessages.length - 1].text = message
      return newMessages
    })

  }


}


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          { /* Bienvenida */}

          <GptMessage text="Hola, Soy tu asistente que te gustaria que compare hoy" />

          {
            messages.map( (message, index) => (
              message.isGpt
                ? (
                  <GptMessage key={ index } text={`${message.text}`} />
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

export default ProsConsStreamPage