








const FileUpload = (): JSX.Element => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (file.type == '' ) {
        assetMetadata1.mediaType = 'other';
      }else{
        console.log(file.type);
        assetMetadata1.mediaType = file.type;
      }
      
    }
  };

  const [binary, setBinary] = useState<string>('');

  
  
  
  const handleSubmit = async () => {
    // Call the async function and wait for the result
    const result = await handleSubmission();
    console.log(result);
    
    // Do other things with the result if needed
  };

  const addressWallet = async () => {
    
    const wallet = await BrowserWallet.enable(window.cardano.eternl.name === 'eternl' ? 'eternl' : 'Nami');

    return wallet;
    
    
    // if(window.cardano.nami.name == "Nami"){
    //   const wallet = await BrowserWallet.enable('nami');
    // }

    
  }

  const check = async () => {
    const wallet = await addressWallet();
    const address = await wallet.getChangeAddress();
    console.log(address);
  }


  async function mintNFT() {
    const result = await handleSubmission();
    console.log(result); 
    const token_name = Buffer.from(result.name, 'utf8').toString('hex');

    // const wallet1 = await addressWallet();
    // const wallet = await addressWallet();
    // const addressConnect = await wallet.getChangeAddress();
    // console.log(addressConnect);
    // return;

    const wallet = await BrowserWallet.enable('nami');
    // prepare forgingScript
        // prepare forgingScript
        const usedAddress = await wallet.getUsedAddresses();
        const address = usedAddress[0];
        const forgingScript = ForgeScript.withOneSignature(address);
        const tx = new Transaction({ initiator: wallet });
    
        
        const asset1: Mint = {
          assetName: result.name,
          assetQuantity: '1',
          metadata: result,
          label: '721',
          recipient: 'addr_test1qrxpzfwdwtq9dzu2swe2hlmn9dptmz7dmv8cfs64va29xa03y2thexqurrtyve545ssjqmeywq40wanpqgyl654h57pqqz9eyd',
        };
        tx.mintAsset(
          forgingScript,
          asset1,
        );

    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);

}

  const handleSubmission = async () => {

    if (!selectedFile) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);

    const metadata = JSON.stringify({
      name: selectedFile.name,
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    try {
      const headers = {
        "Content-Type": `multipart/form-data; boundary=${formData.toString().split("\n")[0].substring(2)}`,
        Authorization: JWT,
      };
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers,
        }
      );
      
      // ipfshash = res.data.IpfsHash;
      assetMetadata1.name = name;
      assetMetadata1.image =  `ipfs://${res.data.IpfsHash}`;
      // assetMetadata1.image =  `ipfs://QmbrkRwmA7bDgzx6QPt8VSUxSmtnC3SB8HjFZ7349oWqqp`;
      assetMetadata1.description = description;

      // const str = Buffer.from(name, "hex").toString();
      //   console.log(typeof str);
      // console.log(assetMetadata1);
      return assetMetadata1; 
      
      // return res.data.IpfsHash.toString();
    } catch (error) {
      console.log(error);
    }
  };
    // console.log(assetMetadata1);




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
    <link rel="stylesheet" href="../assets/css/createNFT.css" />
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
              <a>
                
                <i className="ti ti-wallet" /> <CardanoWallet/>
              </a>
              <a href="">
                
                <i className="ti ti-shopping-cart">
                  <sup>2</sup>
                </i>
              </a>
              <a href="">
                
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
        {/* <form onSubmit={handleSubmit}> */}
            <div className="form-control">
              <label htmlFor="nft">Image, Video, Audio, or 3D Model</label>
              <p style={{ color: "#ccc", fontSize: 12 }}>
                File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
                OGG, GLB, GLTF. Max size: 100 MB
              </p>
                <input className="fileipfs" type="file" onChange={changeHandler} />
            </div>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input type="text" value={name} onChange={handleNameChange} />
            </div>

            <div className="form-control">
              <label htmlFor="quantity">Quantity</label>
              <input type="text" value={"1"} />
            </div>
            
            <div className="form-control">
              <label htmlFor="mediatype">MediaType</label>
              <input type="text" value={"image/jpg"} />
  
            </div>
            
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <input type="text" value={description} onChange={handleDescriptionChange}/>
  
            </div>


  
      
            <div className="fee-tst">
              <h1>Transaction Fee</h1>
              <h2>
                <span>0.02 ADA</span>
              </h2>
            </div>
            <button onClick={mintNFT} type="submit" className="btn btn-warning">
              Create NFT
            </button>
        {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default FileUpload;


















// import CreateNFT from "./createNFT";
// import createCollection from "./createCollection";



// export default function HomePage (){

//   return (
//     <>
// <meta charSet="UTF-8" />
//     <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <link
//       rel="icon"
//       href="https://thumb.ac-illust.com/3e/3ed2e08c4f16e867d7129ee87fd320a8_t.jpeg"
//       type="image/gif"
//       sizes="16x16"
//     />
//     <link
//       href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
//       rel="stylesheet" 
//       integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" 
//       crossOrigin="anonymous"
//     />
//     <link rel="stylesheet" href="../assets/themify-icons/themify-icons.css" />
//     <link rel="stylesheet" href="../assets/css/nftinfo.css" />
//     <link rel="stylesheet" href="../assets/css/style.css" />
//     <title>NFT | Ownership</title>
//   <header>
//     <div className="container">
//       <div className="row menu">
//         <div className="col-md-8 menu-left">
//           <div className="logo">
//             <img src="./assets/img/Logo.png" alt="" />
//             <h1>SALT</h1>
//           </div>
//           <ul className="menu-right">
//             <li>
//               <a href="./">Home</a>
//             </li>
//             <li>
//               <a href="">Explore</a>
//             </li>
//             <li>
//               <a href="./createNFT">Create NFT</a>
//             </li>
//             <li>
//               <a href="./createCollection">Collection</a>
//             </li>
//             <li>
//               <a href="">Contact</a>
//             </li>
//           </ul>
//         </div>
//         <div className="col-md-4">
//           <div className="setting">
//             <a className="connectwallet" href="">
//               {" "}
//               <i className="ti ti-wallet" /> Wallet Connect
//             </a>
//             <a href="">
//               {" "}
//               <i className="ti ti-shopping-cart">
//                 <sup>2</sup>
//               </i>
//             </a>
//             <a href="">
//               {" "}
//               <i className="ti ti-bell">
//                 <sup>1</sup>
//               </i>
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   </header>
//   <div className="container">
//     <div className="row slider">
//       <div className="col-md-6 general">
//         <h1 className="h1first">Discover, find</h1>
//         <h1 className="h1second">Sell extraordinary</h1>
//         <h1 className="h1third">Monster NFTs</h1>
//         <p>
//           Marketplace For Monster Character Collections Non Fungible Token NFTs
//         </p>
//         <div className="buttonSlider">
//           <a href="">Explore</a>
//           <a href="">Create</a>
//         </div>
//       </div>
//       <div className="col-md-6 imgSlider">
//         <img src="./assets/img/slider.png" alt="" />
//       </div>
//     </div>
//     <div className="row title-product">
//       <div className="col-md-12">
//         <h1>Why choose NFTGuardian?</h1>
//       </div>
//     </div>
//     <div className="row whyChoose">
//       <div className="col-md-4">
//         <img src="./assets/img/nft003.png" alt="" />
//         <h4>Integrity</h4>
//         <p>
//           The process of creating an NFT typically involves using a specialized
//           platform that allows users to upload their digital assets and mint
//           them into NFTs
//         </p>
//       </div>
//       <div className="col-md-4">
//         <img src="./assets/img/search03.png" alt="" />
//         <h4>Validation</h4>
//         <p>
//           Check NFT&apos;s accuracy and track transaction history, number of
//           transfers or who is holding that NFT
//         </p>
//       </div>
//       <div className="col-md-4">
//         <img src="./assets/img/security03.png" alt="" />
//         <h4>Accuracy</h4>
//         <p>
//           All information is queried from the blockchain network against trusted
//           APIs
//         </p>
//       </div>
//     </div>
//     <div className="row steps">
//       <div className="col-md-6 imgHowitworks">
//         <img src="./assets/img/itworks.png" alt="" />
//       </div>
//       <div className="col-md-6">
//         <h3>How It Works</h3>
//         <h6>Secure your product future in 3 steps</h6>
//         <div className="stepWork">
//           <div>
//             <span className="icon btn btn-circle btn-primary disabled me-5">
//               <span className="number fs-18">1</span>
//             </span>
//           </div>
//           <div className="stepContent">
//             <h5>Add NFT To Blockchain</h5>
//             <p>
//               you can create an NFT token on Cardano using Cardano&apos;s native
//               token protocol
//             </p>
//           </div>
//         </div>
//         <div className="stepWork">
//           <div>
//             <span className="icon btn btn-circle btn-primary disabled me-5">
//               <span className="number fs-18">2</span>
//             </span>
//           </div>
//           <div className="stepContent">
//             <h5>Return your information NFT</h5>
//             <p>
//               Print the information of NFT and track the number of one transfers
//             </p>
//           </div>
//         </div>
//         <div className="stepWork">
//           <div>
//             <span className="icon btn btn-circle btn-primary disabled me-5">
//               <span className="number fs-18">3</span>
//             </span>
//           </div>
//           <div className="stepContent">
//             <h5>Track the number of NFT transfers</h5>
//             <p>
//               You need to prepare an image or audio file to use as an NFT. This
//               file must be in PNG, JPEG or GIF format
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="row title-product">
//       <div className="col-md-12">
//         <h1>How to mark ownership rights</h1>
//       </div>
//     </div>
//     <div className="row tutorialNFT">
//       <div className="col-md-3 sc-box-icon">
//         <div className="image">
//           <svg
//             width={60}
//             height={60}
//             viewBox="0 0 60 60"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <rect width={60} height={60} rx={16} fill="#5142FC" />
//             <path
//               fillRule="evenodd"
//               clipRule="evenodd"
//               d="M36.9227 28.0178H41.104C41.5988 28.0178 42 28.3981 42 28.8671V31.8195C41.9942 32.2862 41.5964 32.6633 41.104 32.6688H37.0187C35.8257 32.684 34.7826 31.9098 34.512 30.8084C34.3765 30.1247 34.5667 29.4192 35.0317 28.8809C35.4966 28.3427 36.1888 28.0268 36.9227 28.0178ZM37.1039 31.1219H37.4986C38.0052 31.1219 38.4159 30.7326 38.4159 30.2524C38.4159 29.7722 38.0052 29.3829 37.4986 29.3829H37.1039C36.8616 29.3802 36.6282 29.4695 36.4559 29.631C36.2835 29.7924 36.1866 30.0126 36.1866 30.2423C36.1865 30.7242 36.5956 31.1164 37.1039 31.1219Z"
//               fill="#F9F9FA"
//               fillOpacity="0.4"
//             />
//             <path
//               d="M36.9227 26.2788H42C42 22.3154 39.5573 20 35.4187 20H24.5813C20.4427 20 18 22.3154 18 26.2282V34.7718C18 38.6846 20.4427 41 24.5813 41H35.4187C39.5573 41 42 38.6846 42 34.7718V34.4078H36.9227C34.5662 34.4078 32.656 32.5971 32.656 30.3635C32.656 28.1299 34.5662 26.3192 36.9227 26.3192V26.2788Z"
//               fill="white"
//             />
//             <path
//               d="M30.4587 26.2788H23.6854C23.177 26.2733 22.768 25.8811 22.7681 25.3992C22.7739 24.9229 23.1829 24.5398 23.6854 24.5398H30.4587C30.9654 24.5398 31.3761 24.9291 31.3761 25.4093C31.3761 25.8895 30.9654 26.2788 30.4587 26.2788Z"
//               fill="#948BFB"
//             />
//           </svg>
//         </div>
//         <h3 className="heading">
//           <a href="">Connect Wallet</a>
//         </h3>
//         <p className="content">
//           You can create a wallet in many ways, such as using the wallet on the
//           Cardano official website or using Nami or Eternl wallets.
//         </p>
//       </div>
//       <div className="col-md-3 sc-box-icon">
//         <div className="image">
//           <svg
//             width={60}
//             height={60}
//             viewBox="0 0 60 60"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <rect width={60} height={60} rx={16} fill="#9835FB" />
//             <path
//               fillRule="evenodd"
//               clipRule="evenodd"
//               d="M21.396 25.8881C21.396 23.1621 23.061 21.3951 25.638 21.3951H34.354C36.94 21.3951 38.605 23.1621 38.605 25.8881V31.1901C38.159 30.8121 36.812 29.8711 36.624 29.7591C35.224 28.9191 33.544 29.2991 32.454 30.7191C32.359 30.8441 30.782 33.1441 30.224 33.4881C30.095 33.5681 29.959 33.6111 29.814 33.6311C29.464 33.6611 29.127 33.4811 28.554 33.0981C28.224 32.8881 27.864 32.6491 27.454 32.4791C25.749 31.7661 24.45 32.9441 23.758 33.7341C23.749 33.7421 21.812 36.1041 21.781 36.1411C21.538 35.5501 21.396 34.8671 21.396 34.1021V25.8881ZM40 25.888C40 22.362 37.731 20 34.354 20H25.638C22.271 20 20 22.362 20 25.888V34.102C20 35.674 20.447 37.013 21.238 38.009C21.247 38.018 21.247 38.028 21.256 38.028C22.043 39.013 23.166 39.666 24.519 39.899C24.531 39.901 24.543 39.903 24.556 39.905C24.903 39.962 25.262 40 25.638 40H34.354C34.535 40 34.7 39.966 34.874 39.953C35.078 39.936 35.289 39.932 35.483 39.898C35.74 39.854 35.976 39.777 36.215 39.703C36.319 39.67 36.43 39.65 36.53 39.612C36.773 39.52 36.996 39.401 37.217 39.279C37.297 39.235 37.383 39.199 37.461 39.15C37.678 39.014 37.875 38.855 38.068 38.689C38.132 38.634 38.201 38.584 38.262 38.526C38.45 38.347 38.616 38.15 38.775 37.944C38.824 37.879 38.876 37.819 38.923 37.752C39.076 37.534 39.208 37.299 39.33 37.054C39.364 36.983 39.4 36.914 39.433 36.842C39.546 36.585 39.64 36.316 39.72 36.034C39.741 35.958 39.762 35.883 39.78 35.805C39.851 35.514 39.902 35.214 39.935 34.9C39.939 34.862 39.95 34.827 39.954 34.789C39.961 34.704 39.96 34.619 39.965 34.534C39.973 34.388 40 34.253 40 34.102V25.888Z"
//               fill="white"
//             />
//             <path
//               d="M26.5053 28.9995C27.8668 28.9995 29.0005 27.8694 29.0005 26.5145C29.0005 25.8351 28.7156 25.2126 28.2611 24.7609C27.8086 24.2929 27.1768 23.9995 26.4792 23.9995C25.109 23.9995 24.0005 25.1035 24.0005 26.4681C24.0005 26.6486 24.0218 26.8233 24.0596 26.9931C24.2883 28.1252 25.3086 28.9995 26.5053 28.9995Z"
//               fill="white"
//               fillOpacity="0.4"
//             />
//           </svg>
//         </div>
//         <h3 className="heading">
//           <a href="">Prepare The Artwork</a>
//         </h3>
//         <p className="content">
//           You need to prepare an image or audio file to use as an NFT. This file
//           must be in PNG, JPEG, WAV, MP3... or GIF format
//         </p>
//       </div>
//       <div className="col-md-3 sc-box-icon">
//         <div className="image">
//           <svg
//             width={60}
//             height={60}
//             viewBox="0 0 60 60"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <rect width={60} height={60} rx={16} fill="#47A432" />
//             <path
//               d="M25.104 18H21.048C19.368 18 18 19.38 18 21.0732V25.164C18 26.868 19.368 28.2359 21.048 28.2359H25.104C26.796 28.2359 28.1519 26.868 28.1519 25.164V21.0732C28.1519 19.38 26.796 18 25.104 18Z"
//               fill="white"
//             />
//             <path
//               d="M25.104 31.7637H21.048C19.368 31.7637 18 33.1329 18 34.8369V38.9276C18 40.6196 19.368 41.9996 21.048 41.9996H25.104C26.796 41.9996 28.1519 40.6196 28.1519 38.9276V34.8369C28.1519 33.1329 26.796 31.7637 25.104 31.7637Z"
//               fill="white"
//             />
//             <path
//               d="M38.9521 18H34.8961C33.2041 18 31.8481 19.38 31.8481 21.0732V25.164C31.8481 26.868 33.2041 28.2359 34.8961 28.2359H38.9521C40.6321 28.2359 42.0001 26.868 42.0001 25.164V21.0732C42.0001 19.38 40.6321 18 38.9521 18Z"
//               fill="white"
//               fillOpacity="0.4"
//             />
//             <path
//               d="M38.9521 31.7637H34.8961C33.2041 31.7637 31.8481 33.1329 31.8481 34.8369V38.9276C31.8481 40.6196 33.2041 41.9996 34.8961 41.9996H38.9521C40.6321 41.9996 42.0001 40.6196 42.0001 38.9276V34.8369C42.0001 33.1329 40.6321 31.7637 38.9521 31.7637Z"
//               fill="white"
//             />
//           </svg>
//         </div>
//         <h3 className="heading">
//           <a href="">Create an NFT on Cardano</a>
//         </h3>
//         <p className="content">
//           After preparing the image or audio file, you can create an NFT token
//           on Cardano using Cardano&apos;s native token protocol
//         </p>
//       </div>
//       <div className="col-md-3 sc-box-icon">
//         <div className="image">
//           <svg
//             width={60}
//             height={60}
//             viewBox="0 0 60 60"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <rect width={60} height={60} rx={16} fill="#DF4949" />
//             <rect
//               x={23}
//               y={24}
//               width={13}
//               height={4}
//               fill="white"
//               fillOpacity="0.4"
//             />
//             <path
//               fillRule="evenodd"
//               clipRule="evenodd"
//               d="M26.125 18H33.8375C37.225 18 39.9625 19.284 40 22.5478V40.7631C40 40.9671 39.95 41.1711 39.85 41.3511C39.6875 41.6391 39.4125 41.8551 39.075 41.9511C38.75 42.0471 38.3875 41.9991 38.0875 41.8311L29.9875 37.9432L21.875 41.8311C21.6888 41.9259 21.475 41.9871 21.2625 41.9871C20.5625 41.9871 20 41.4351 20 40.7631V22.5478C20 19.284 22.75 18 26.125 18ZM25.2753 27.1437H34.6878C35.2253 27.1437 35.6628 26.7225 35.6628 26.1958C35.6628 25.6678 35.2253 25.2478 34.6878 25.2478H25.2753C24.7378 25.2478 24.3003 25.6678 24.3003 26.1958C24.3003 26.7225 24.7378 27.1437 25.2753 27.1437Z"
//               fill="white"
//             />
//           </svg>
//         </div>
//         <h3 className="heading">
//           <a href="">Register your NFT</a>
//         </h3>
//         <p className="content">
//           After creating the token, you need to register your NFT on the Cardano
//           blockchain. This ensures the authenticity and uniqueness of your NFT
//         </p>
//       </div>
//     </div>
//   </div>
//   {/* Continue */}
//   <div className="coming-soon">Coming Soon...</div>
//   {/* Footer */}
//   <footer className="text-center text-lg-start bg-light text-muted">
//     {/* Section: Links  */}
//     <section className="">
//       <div className="container text-center text-md-start mt-5">
//         {/* Grid row */}
//         <div className="row mt-3">
//           {/* Grid column */}
//           <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
//             {/* Content */}
//             <h6 className="text-uppercase fw-bold mb-4">
//               <i className="fas fa-gem me-3" />
//               Company name
//             </h6>
//             <p>
//               Here you can use rows and columns to organize your footer content.
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//             </p>
//           </div>
//           {/* Grid column */}
//           {/* Grid column */}
//           <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
//             {/* Links */}
//             <h6 className="text-uppercase fw-bold mb-4">Products</h6>
//             <p>
//               <a href="#!" className="text-reset">
//                 Angular
//               </a>
//             </p>
//             <p>
//               <a href="#!" className="text-reset">
//                 React
//               </a>
//             </p>
//             <p>
//               <a href="#!" className="text-reset">
//                 Vue
//               </a>
//             </p>
//             <p>
//               <a href="#!" className="text-reset">
//                 Laravel
//               </a>
//             </p>
//           </div>
//           {/* Grid column */}
//           {/* Grid column */}
//           <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
//             {/* Links */}
//             <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
//             <p>
//               <a href="#!" className="text-reset">
//                 Pricing
//               </a>
//             </p>
//             <p>
//               <a href="#!" className="text-reset">
//                 Settings
//               </a>
//             </p>
//             <p>
//               <a href="#!" className="text-reset">
//                 Orders
//               </a>
//             </p>
//             <p>
//               <a href="#!" className="text-reset">
//                 Help
//               </a>
//             </p>
//           </div>
//           {/* Grid column */}
//           {/* Grid column */}
//           <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
//             {/* Links */}
//             <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
//             <p>
//               <i className="fas fa-home me-3" /> New York, NY 10012, US
//             </p>
//             <p>
//               <i className="fas fa-envelope me-3" />
//               info@example.com
//             </p>
//             <p>
//               <i className="fas fa-phone me-3" /> + 01 234 567 88
//             </p>
//             <p>
//               <i className="fas fa-print me-3" /> + 01 234 567 89
//             </p>
//           </div>
//           {/* Grid column */}
//         </div>
//         {/* Grid row */}
//       </div>
//     </section>
//     {/* Section: Links  */}
//   </footer>
//   {/* Footer */}
// </>

//   );
// }


