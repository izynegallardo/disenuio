const variants = ['solid', 'outline', 'ghost']
const sizes = ['sm', 'md', 'lg']

export default function ButtonSamples() {
    return (
        <div>
            {variants.map((variant) => (
                <p key={variant}>{variant}</p>
            ))}
        </div>
    )
}
