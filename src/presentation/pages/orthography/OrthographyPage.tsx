import { useState } from "react"
import GptMessage from "../../components/chat-bubbles/GptMessage"
import MyMessage from "../../components/chat-bubbles/MyMessage"
import TextMessageBox from "../../components/chat-input-boxes/TextMessageBox"
import TypingLoader from "../../components/loaders/TypingLoader"
import { orthographyUseCase } from "../../../core/use-case"
import GptOrthographyMessage from "../../components/chat-bubbles/GptOrtographyMessage"


interface Message {
  text: string
  isGpt: boolean
  info?:{
    userScore: number
    errors: string[]
    message: string
  }
}


const OrthographyPage = () => {

  const [Isloading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

const handlePost = async ( text: string) =>  {
  setIsLoading(true)
  setMessages( (prev) => [...prev, { text: text, isGpt: false}])

  //TODO UseCAse

  const { ok, errors, message, userScore } = await orthographyUseCase(text)

  if ( !ok ){
    setMessages( (prev) => [...prev, { text: 'No se pudo realizar la corrección', isGpt: true}])
  } else {
    setMessages( (prev) => [...prev, {
      text: message,
      isGpt: true,
      info:{
        errors: errors,
        message:message,
        userScore: userScore
      }
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

          <GptMessage text="Hola, Soy tu asistente puedes escribir el texto en español, y te ayudo con la corrección en la ortografía" />
        
          {
            messages.map( (message, index) => (
              message.isGpt
                ? (
                  <GptOrthographyMessage
                    key={ index }
                    errors={ message.info!.errors }
                    message={ message.info!.message }
                    userScore={ message.info!.userScore}
                  />
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