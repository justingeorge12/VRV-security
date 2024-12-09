import Nav from "./Nav"

function LayoutNavBar({children}) {

    return(
        <div>
            <Nav />
            <div className="mt-24">
                {children}
            </div>
        </div>
    )
}

export default LayoutNavBar