import { useState } from "react"
import GptMessage from "../../components/chat-bubbles/GptMessage"
import MyMessage from "../../components/chat-bubbles/MyMessage"
import TypingLoader from "../../components/loaders/TypingLoader"
import { TextMessageBoxSelect } from "../../components"
import { textToAudioUseCase } from "../../../core/use-case"
import GptMessageAudio from "../../components/chat-bubbles/GptMessageAudio"

const displaimer = `## ¿Qué audio quieres generar hoy?
* Todso el audio generado es por AI`

const voices = [
  { id: "nova", text: "Nova" },
  { id: "alloy", text: "Alloy" },
  { id: "echo", text: "Echo" },
  { id: "fable", text: "Fable" },
  { id: "onyx", text: "Onyx" },
  { id: "shimmer", text: "Shimmer" },
  { id: "coral", text: "coral"},
  { id: "ash", text: "ash"}

]

interface TextMessage {
  text: string
  isGpt: boolean
  type: 'text'
}

interface AudioMessage {
  text: string;
  isGpt: boolean;
  audio: string;
  type: 'audio'
}

type Message = TextMessage | AudioMessage


const TextToAudioPage = () => {

  const [Isloading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

const handlePost = async ( text: string, selectedVoice: string) =>  {
  setIsLoading(true)
  setMessages( (prev) => [...prev, { text: text, isGpt: false, type: 'text'}])

  //TODO UseCAse

  const { ok, message, audioUrl } = await textToAudioUseCase( text, selectedVoice)

  if( !ok ) return;
  setMessages( (prev) => [...prev, {text: `${selectedVoice} - ${message} `, isGpt: false, type: 'audio', audio: audioUrl! }])


  setIsLoading(false)

  // Todo: Añadir el mensaje de isGPT en true 
}


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          { /* Bienvenida */}

          <GptMessage text = {displaimer} />
        
          {
            messages.map( (message, index) => (
              message.isGpt
                ? (
                  message.type === 'audio'
                  ? (
                    <GptMessageAudio 
                    key={ index } 
                    text={ message.text } 
                    audio= { message.audio}/>
                  )
                  :
                  (
                    <GptMessage key={ index } text={ message.text } />
                  )
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
        options={voices}
      />

    </div>
  )
}

export default TextToAudioPage