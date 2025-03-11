import Markdown from 'react-markdown'

interface Props {
    userScore: number
    errors: string[]
    message: string
}

const GptOrthographyMessage = ({ userScore, errors, message }: Props) => {
  return (
    <div className="col-start-1 col-end-10 p-3 rounded-b-lg">
        <div className="flex flex-row items-start">
            <div className="flex items-center justify-center h-11 w-11 p-1 rounded-full bg-green-600 flex-shrink-0">
                BOT
            </div>
            <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">

                <h3 className='text-3xl'>Puntaje:{userScore}%</h3>
                <p>{message}</p>

                {
                    (errors.length === 0)
                    ? <p>No se encontraron errores, perfecto</p>
                    : (
                        <>
                        <h3 className='text-2xl'>Errores encontrados</h3>

                        <ul>
                            {
                                errors.map( (error, i) => (
                                    <li key={i}>
                                        { error }
                                    </li>
                                ))
                            }
                        </ul>
                        </>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default GptOrthographyMessage