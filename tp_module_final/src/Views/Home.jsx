import Header from '../components/Header/Header.jsx';
import Main from '../components/Main/Main.jsx';
import Footer from '../components/Footer/Footer.jsx';
import '../Styles/Home.css';

const Home = () => {
    return (
        <>
            {/* renderizar el header */}
            <Header />
            {/* renderizar el main */}
            <Main />
            {/* renderizar el footer */}
            <Footer />
        </>
    )
}

export default Home
