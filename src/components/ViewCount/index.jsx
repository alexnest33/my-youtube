import { useEffect } from "react"
import { getViews } from "../../redux/viewsSlice"
import { useDispatch, useSelector } from "react-redux"


const ViewCount = ({ id }) => {
    const dispatch = useDispatch()
    const { items } = useSelector((store) => store.views)

    useEffect(() => {
        dispatch(getViews(id))
    }, [])

    return (
        <>
            {items.map((item) => {
                return (
                    <div key={item.id.videoId} >
                        {item.statistics.viewCount}
                    </div>
                )
            })}
        </>
    )
}


export default ViewCount