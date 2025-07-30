import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import "./Layout.css"

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <div className="content-layout">
                {children}
            </div>
            <Footer />
        </>
    )
}

export default Layout