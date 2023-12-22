import { type FC, type ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export const Layout: FC<LayoutProps> = ({
  children,
  title,
}) => {
  return (
    <html>
      <head>
        <title>{title}</title>
        <meta charSet="utf-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=''/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="./main.css"/>
      </head>
      <body>
        <div className="havok-design-system-container">
          {children}
        </div>
      </body>
    </html>
  );
};
