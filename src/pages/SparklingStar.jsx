import React, { useEffect, useState } from "react";
import SparklingStarImg from "../../assets/SparklingStarImg.png";

const SparklingStar = ({ leftz, id, starPositions }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    document.querySelector(`.star-cont-parent-${id}`).style.left = `${leftz}px`;
    const starCount = 3; // Number of stars
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: starPositions[i].top, // Random vertical position
      left: starPositions[i].left, // Random horizontal position
      animationDelay: Math.random() * id * 1.5, // Random delay for twinkle effect
    }));
    setStars(newStars);
  }, []);

  return (
    <div className={`star-container star-cont-parent-${id}`}>
      {stars.map((star) => (
        <img
          key={star.id}
          src={SparklingStarImg}
          alt="star"
          className="sparkling-star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default SparklingStar;
