import SideBar from "./SideBar"

function LayoutSideBar({children}) {

    return(
        <div>
            <SideBar />
            <div className="sm:ml-[200px]">
                {children}
            </div>
        </div>
    )
}

export default LayoutSideBar