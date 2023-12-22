const LandingLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
  return (
    <main className="h-full bg-gradient-power overflow-auto">
        <div>
            {children}
        </div>
    </main>
  )
}

export default LandingLayout;