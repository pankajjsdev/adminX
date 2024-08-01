interface TypographyProps {
    title: string;
  }
  
  export function TypographyH1({ title }: TypographyProps) {
    return (
      <h1 className="my-7 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {title}
      </h1>
    );
  }
  
  export function TypographyH2({ title }: TypographyProps) {
    return (
      <h2 className="my-7 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {title}
      </h2>
    );
  }
  
  export function TypographyH3({ title }: TypographyProps) {
    return (
      <h3 className="my-7 scroll-m-20 text-2xl font-semibold tracking-tight">
        {title}
      </h3>
    );
  }
  
  export function TypographyH4({ title }: TypographyProps) {
    return (
      <h4 className="my-7 scroll-m-20 text-xl font-semibold tracking-tight">
        {title}
      </h4>
    );
  }
  
  export function TypographyP({ title }: TypographyProps) {
    return (
      <p className="my-7 leading-7 [&:not(:first-child)]:mt-6">
        {title}
      </p>
    );
  }
  
  export function TypographyLead({ title }: TypographyProps) {
    return (
      <p className="my-7 text-xl text-muted-foreground">
        {title}
      </p>
    );
  }
  
  export function TypographySmall({ title }: TypographyProps) {
    return (
      <small className="my-7 text-sm font-medium leading-none">{title}</small>
    );
  }
  