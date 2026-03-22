import UserCard from './UserCard'
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from 'axios'
import { addFeed } from "../store/feedSlice";
import { useDispatch, useSelector } from "react-redux";

const Feed = () => {
  const dispatch = useDispatch()
  const feed = useSelector(store => store.feed)
  const [index, setIndex] = useState(0)
  const [startX, setStartX] = useState(null)
  const [translateX, setTranslateX] = useState(0)

  const getFeed = async()=>{
    try{
      const response = await axios.get(BASE_URL + '/user/feed',{withCredentials: true})
      console.log(response)
      dispatch(addFeed(response.data.data))
    }catch(err){
      console.log(err.message)
    }
  }

  useEffect(()=>{
    getFeed()
  },[])

  const handleStart = (e) => {
    setStartX(e.touches ? e.touches[0].clientX : e.clientX)
  }

  const handleMove = (e) => {
    if(startX === null) return
    const currentX = e.touches ? e.touches[0].clientX : e.clientX
    setTranslateX(currentX - startX)
  }

  const handleEnd = () => {
    if(translateX > 120){
      console.log("Interested")
      nextCard()
    }else if(translateX < -120){
      console.log("Ignored")
      nextCard()
    }
    setTranslateX(0)
    setStartX(null)
  }

  const nextCard = () => {
    setIndex(prev => prev + 1)
  }

  if(!feed || feed.length === 0)
    return <div className='flex justify-center font-bold text-3xl m-5'>No new users found.</div>

  if(index >= feed.length)
    return <div className='flex justify-center font-bold text-3xl m-5'>No more users.</div>

  return (
    <div className="flex justify-center mt-10">
      <div
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        style={{
          transform: `translateX(${translateX}px) rotate(${translateX/20}deg)`,
          transition: startX ? "none" : "0.3s",
        }}
        className="cursor-grab active:cursor-grabbing"
      >
        <UserCard user={feed[index]} />
      </div>
    </div>
  )
}

export default Feed
