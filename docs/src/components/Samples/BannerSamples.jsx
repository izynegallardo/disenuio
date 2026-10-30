const status = ['info', 'success', 'warning', 'error']
const titles = [
    'Congratulations!',
    'Attention',
    'There is a problem with your application',
    'Update available',
]

export default function BadgeSamples() {
    return (
        <div>
            {status.map((stat) => (
                <p key={stat}>{stat}</p>
            ))}
        </div>
    )
}
