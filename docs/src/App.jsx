import BackgroundGrid from './components/BackgroundGrid/BackgroundGrid'
import Main from './components/Main/Main'
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'

export default function App() {
    return (
        <DefaultLayout>
            <BackgroundGrid />
            <Main />
        </DefaultLayout>
    )
}
