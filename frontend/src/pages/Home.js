import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <div className="hero-section">
        <h1 className="hero-title">WatchDogs</h1>
        <p className="hero-subtitle">Discover and explore dogs</p>

        <div className="features-grid">
          <Link to="/random">
            <div className="feature-card">
              <h3 className="feature-title">Random Dog</h3>
              <p className="feature-description">
                View random dog images with just one click
              </p>
            </div>
          </Link>

          <Link to="/gallery">
            <div className="feature-card">
              <h3 className="feature-title">Breed Gallery</h3>
              <p className="feature-description">
                Browse through all dog breeds and see images of your favorites
              </p>
            </div>
          </Link>

          <Link to="/explorer">
            <div className="feature-card">
              <h3 className="feature-title">Sub-Breed Explorer</h3>
              <p className="feature-description">
                Explore breeds with sub-breeds and view their images
              </p>
            </div>
          </Link>

          <Link to="/multi">
            <div className="feature-card">
              <h3 className="feature-title">Multi-Dog Generator</h3>
              <p className="feature-description">
                Generate multiple random dog images at once (1-50 dogs)
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="dog-gif">
        <div
          class="tenor-gif-embed"
          data-postid="9161967965362335111"
          data-share-method="host"
          data-aspect-ratio="0.866142"
          data-width="25%"
        >
          <a href="https://tenor.com/view/yungviral-gif-9161967965362335111">
            Yungviral GIF
          </a>
          from{" "}
          <a href="https://tenor.com/search/yungviral-gifs">Yungviral GIFs</a>
        </div>{" "}
        <script
          type="text/javascript"
          async
          src="https://tenor.com/embed.js"
        ></script>
      </div>
    </div>
  );
}

export default Home;
