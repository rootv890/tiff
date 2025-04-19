const Debugger = (props: { data: any }) => {
  return (
   <div className="max-w-sm fixed top-0 right-3 z-50">
     <pre className="p-4 border my-4 border-border rounded-md bg-secondary max-w-full overflow-x-auto">{JSON.stringify(props.data, null, 2)}</pre>
   </div>
  )
}
export default Debugger