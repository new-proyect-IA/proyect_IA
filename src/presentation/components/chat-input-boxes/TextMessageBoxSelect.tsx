import { FormEvent, useState } from "react";


interface Props {
    onSendMessage: (message: string)=>void;
    placeholder?: string
    disableCorrections?: boolean
    options: Option[]
}

interface Option {
    id: string
    text: string
}


const TextMessageBoxSelect = ({ onSendMessage, placeholder, disableCorrections = false, options }: Props) => {


    const [ message, setMessage ] = useState('')

    const handleSendMessage = ( event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault()

        if ( message.trim().length === 0) return;

        onSendMessage(message)
        setMessage('')
    }

  return (
    <form
        onSubmit={ handleSendMessage }
        className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
        <div className="flex-grow">
            <div className="flex w-full mt-5 mb-5">
            <input
                        type="text"
                        name="message"
                        className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        placeholder={placeholder}
                        autoFocus
                        autoComplete={disableCorrections ? "off" : "on"}
                        autoCorrect={disableCorrections ? "off" : "on"}
                        spellCheck={disableCorrections ? "false" : "true"}
                        value = { message }
                        onChange={ (e) => setMessage( e.target.value )}
                    />

                    <select 
                        name="select"
                        className="w-2/5 ml-5 border rounded-xl text-gray-800 focus:outLine-none focus:border-indigo-300 pl-4 h-10"
                    >
                        {
                            options.map((options) => (
                                <option key={ options.id } value={ options.id }>{ options.text }</option>
                            ))
                        }
                    </select>
            </div>
        </div>
        <div className="ml-4">
            <button className="btn-primary">
                <span className="mr-2">Enviar</span>
                <i className="fa-regular fa-paper-plane"></i>
            </button>
        </div>
    </form>
  )
}

export default TextMessageBoxSelect