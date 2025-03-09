

interface Props {
    text: string
}

const MyMessage = ({ text }: Props) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
        <div className="flex items-center justify-start flex-row-reverse">
            <div className="flex items-center justify-center h-11 w-11 rounded-full bg-blue-700 flex-shrink-0">
                You
            </div>
            <div className="relative mr-3 text-sm bg-indigo-800 py-2 px-4 shadow rounded-xl">
                { text }
            </div>
        </div>
    </div>
  )
}

export default MyMessage