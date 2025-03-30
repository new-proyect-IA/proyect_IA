

import { useRef, useState } from "react"
import GptMessage from "../../components/chat-bubbles/GptMessage"
import MyMessage from "../../components/chat-bubbles/MyMessage"
import TextMessageBox from "../../components/chat-input-boxes/TextMessageBox"
import TypingLoader from "../../components/loaders/TypingLoader"
import { prosConsStreamGeneratorUseCase } from "../../../core/use-case"



interface Message {
  text: string
  isGpt: boolean
}


const ProsConsStreamPage = () => {

  const abortController = useRef( new AbortController() )

  const [Isloading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

const handlePost = async ( text: string) =>  {
  setIsLoading(true)
  setMessages( (prev) => [...prev, { text: text, isGpt: false}])

  //TODO UseCAse

  const stream = prosConsStreamGeneratorUseCase(text, abortController.current.signal)
  setIsLoading(false)

  setMessages( (messages) => [ ...messages, { text: '', isGpt: true }])

  for await ( const text of stream ) {
    setMessages( (messages) =>{
          const newMessages = [...messages]
          newMessages[ newMessages.length - 1].text = text
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