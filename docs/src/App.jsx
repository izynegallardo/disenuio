import BackgroundGrid from './components/BackgroundGrid/BackgroundGrid'
import Hero from './components/Hero/Hero'
import Samples from './components/Samples/Samples'
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'

export default function App() {
    return (
        <DefaultLayout>
            <BackgroundGrid />
            <Hero />
            <Samples />
        </DefaultLayout>
    )
}
