"use client"

import { useEffect, useState } from "react";
import CardGrid from "../components/CardGrid";
import ImageCard from "../components/ImageCard";
import SearchBar from "../components/SearchBar";
import "./page.css"




export default function Home() {

  const [searchQuery, setSearchQuery] = useState("")
  const [inputQuery, setInputQuery] = useState("")

  useEffect(() => {
    if (inputQuery === "") {
      setSearchQuery("")
    }
  }, [inputQuery])

  const handleSearch = (event: React.FormEvent) => {
    event?.preventDefault()
    setSearchQuery(inputQuery)
  }

  return (
    <main className="container-main-page">
      <div className="header">
        <div className="website-desc">
          <h1 className="tagline">Your Ideas and Vision, their Support — made simple.</h1>
          <p className="defination">Got a game-changing idea? We’re the place where bold thinkers link up with the right people to make it happen. Simple tools, zero fluff — just vibes, connections, and turning “what if” into “what’s next.”</p>
          <SearchBar onInputChange={setInputQuery} inputQuery={inputQuery} onSearchSubmit={handleSearch} />
        </div>

        <div className="image-cards">
          <div className="image-holder">
            <ImageCard
              imageSrc="/cherful-positive-young-colleagues-using-laptop-computer.jpg"
              altText="Startup Desc image"
            />
          </div>

          <div className="image-holder">
            <ImageCard
              imageSrc="/cherful-positive-young-colleagues-using-laptop-computer.jpg"
              altText="Startup Desc image"
            />

            <ImageCard
              imageSrc="/cherful-positive-young-colleagues-using-laptop-computer.jpg"
              altText="Startup Desc image"
            />
          </div>

          <div className="image-holder">
            <ImageCard
              imageSrc="/cherful-positive-young-colleagues-using-laptop-computer.jpg"
              altText="Startup Desc image"
            />

            <ImageCard
              imageSrc="/cherful-positive-young-colleagues-using-laptop-computer.jpg"
              altText="Startup Desc image"
            />
          </div>
        </div>

        <div className="purple-grad"></div>
        <div className="yellow-grad"></div>
      </div>
      <CardGrid searchQuery={searchQuery} />
    </main>
  );
}
