import GptMessage from "../../components/chat-bubbles/GptMessage"
import MyMessage from "../../components/chat-bubbles/MyMessage"


const OrthographyPage = () => {
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          { /* Bienvenida */}

          <GptMessage text="Hola, Soy tu asistente puedes escribir el texto en español, y te ayudo con la corrección en la ortografía" />
        
        
          { /* Text User */}

          <MyMessage text='Hola Mundo' />
        </div>
      </div>
    </div>
  )
}

export default OrthographyPage