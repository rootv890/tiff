import ChatEditor from "@/modules/Lexical/ChatEditor"

const page = () => {
	return (
		<div className="w-full  relative h-screen">
			<div className="fixed bottom-0 left-0 w-full p-6 ">
				<ChatEditor />
			</div>
		</div>
	)
}
export default page
