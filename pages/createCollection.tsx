import React from "react";
import { text } from "stream/consumers";

const createCollection = () => {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="icon"
        href="https://thumb.ac-illust.com/3e/3ed2e08c4f16e867d7129ee87fd320a8_t.jpeg"
        type="image/gif"
        sizes="16x16"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href="../assets/themify-icons/themify-icons.css" />
      <link rel="stylesheet" href="../assets/css/createCollection.css" />
      <title>NFT | Ownership</title>
      {/* Header */}
      <header>
        <div className="container">
          <div className="row menu">
            <div className="col-md-8 menu-left">
              <div className="logo">
                <img src="../assets/img/Logo.png" alt="" />
                <h1>SALT</h1>
              </div>
              <ul className="menu-right">
                <li>
                <a href="./">Home</a>
                </li>
                <li>
                <a href="">Explore</a>
                </li>
                <li>
                <a href="./createNFT">Create NFT</a>
                </li>
                <li>
                <a href="./createCollection">Collection</a>
                </li>
                <li>
                <a href="">Contact</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <div className="setting">
                <a href="">
                  {" "}
                  <i className="ti ti-wallet" /> Wallet Connect
                </a>
                <a href="">
                  {" "}
                  <i className="ti ti-shopping-cart">
                    <sup>2</sup>
                  </i>
                </a>
                <a href="">
                  {" "}
                  <i className="ti ti-bell">
                    <sup>1</sup>
                  </i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Create NFT */}
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 style={{ color: "#fff" }}>
              <i className="ti ti-arrow-left">Return</i>
            </h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row createNFT">
          <div className="col-md-12">
            <div className="form-group">
              <div className="form-control">
                <label htmlFor="nft">Logo Image</label>
                <p style={{ color: "#ccc", fontSize: 12 }}>
                  This image will also be used for navigation. 350 x 350
                  recommended.
                </p>
                <input
                  type="file"
                  className="form-control"
                  placeholder="0xx..."
                />
              </div>
              <div className="form-control">
                <label htmlFor="nft">Featured image</label>
                <p style={{ color: "#ccc", fontSize: 12 }}>
                  This image will be used for featuring your collection on the
                  homepage, category pages, or other promotional areas of
                  OpenSea. 600 x 400 recommended.
                </p>
                <input
                  type="file"
                  className="form-control"
                  placeholder="0xx..."
                />
              </div>
              <div className="form-control">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="0xx..."
                />
              </div>
              <div className="form-control">
                <label htmlFor="url">URL</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="0xx..."
                />
              </div>
              <div className="form-control">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  defaultValue={""}
                />
              </div>
              <div className="form-control">
                <label htmlFor="">Category</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option>Enter your category</option>
                  <option value={1}> Artwork</option>
                  <option value={2}> Music</option>
                  <option value={3}> Video</option>
                  <option value={1}> Artwork</option>
                  <option value={2}> Music</option>
                  <option value={3}> Video</option>
                </select>
              </div>
              <button type="submit" className="btn btn-warning">
                Create Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default createCollection;
