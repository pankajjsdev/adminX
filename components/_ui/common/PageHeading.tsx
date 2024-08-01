
type pageProps = {
    title: string,
    isCreateButton?: boolean
}

function PageHeading({ title }: pageProps) {
    return (
        <div className="my-7 space-y-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {title}
            </h1>
            <p className="text-xl text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipiscing.
            </p>
        </div>
    )
}

export default PageHeading