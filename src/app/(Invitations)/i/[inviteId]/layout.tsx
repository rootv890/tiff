const layout = (
  { children }: { children: React.ReactNode }
) => {
  return (
    <div className="flex justify-center items-center h-screen w-full">{children}</div>
  )
}
export default layout