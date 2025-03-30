import { useState } from "react"
import GptMessage from "../../components/chat-bubbles/GptMessage"
import MyMessage from "../../components/chat-bubbles/MyMessage"
import TextMessageBox from "../../components/chat-input-boxes/TextMessageBox"
import TypingLoader from "../../components/loaders/TypingLoader"
import { prosConsUseCase } from "../../../core/use-case"


interface Message {
  text: string
  isGpt: boolean
}


const ProsConsPage = () => {

  const [Isloading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

const handlePost = async ( text: string) =>  {
  setIsLoading(true)
  setMessages( (prev) => [...prev, { text: text, isGpt: false}])

  //TODO UseCAse

  const { ok, message } = await prosConsUseCase(text)


  if ( !ok ){
    setMessages( (prev) => [...prev, { text: 'No se pudo realizar la Comparación', isGpt: true}])
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

          <GptMessage text="Hola, Soy tu asistente que te gustaria que compare" />

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

export default ProsConsPage