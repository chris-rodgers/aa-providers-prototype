interface CardProps extends React.BaseHTMLAttributes<HTMLDivElement> {
    title?: string
}

export default function Card({ className, title, children, ...rest }: CardProps) {
    return (
        <div {...rest} className={`bg-gray-100 border border-gray-600 shadow-md flex flex-col ${className}`}>
            <div className="flex justify-between items-center w-full h-6 bg-gradient-to-r from-purple-100 to-purple-200 p-4">
                {title && <div className="text-m font-bold">{title}</div>}
            </div>
            <div className="grow p-4">
                {children}
            </div>
        </div>
    );
}
