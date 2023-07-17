
import type { Mint, AssetMetadata } from "@meshsdk/core";
// import BrowserWallet
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Transaction, ForgeScript } from "@meshsdk/core";
import { BrowserWallet } from '@meshsdk/core';
import { Buffer } from 'buffer';
import { CardanoWallet } from "@meshsdk/react";
import CreateNFT from "./createNFT";
import createCollection from "./createCollection";
const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwOTYwYjExOC03MDBlLTQ1ZTgtOTFiZS01YmM1MTE1OWNjZTkiLCJlbWFpbCI6ImtodWF0dGhhbmgzNDBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjIyZTYwYWUwMDE1MzhjMTgwM2NkIiwic2NvcGVkS2V5U2VjcmV0IjoiZDYyMDA0ZTI4NzUzNTMwNTI2NjlhNDU0ZjZiZGE2ZDg2ZWM2NmMzZDJhMDYxNmQyZTQwNGFlYmNlMTBiZjNjNCIsImlhdCI6MTY3NzgyNzc3Mn0.FZ5X6lIWe3t__G95qBPU90SZEnbn7-zjhXU-_h-khSA`;

// const myString = 'Hello, world!';



const assetMetadata1: AssetMetadata = {
  name: "",
  image: "",
  mediaType: "",
  description: ""
};



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
              <a href="http://localhost:8000">Home</a>
            </li>
            <li>
              <a href="http://localhost:8000/search">Search</a>
            </li>
            <li>
              <a href="./createNFT">Create NFT</a>
            </li>
            <li>
              <a href="http://localhost:8000/track">Track</a>
            </li>
            <li>
              <a href="http://localhost:8000/query-all-nft">Check Assets</a>
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
            {/* <i className="ti ti-arrow-left">Return</i> */}
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
              <input type="text" value={assetMetadata1.mediaType} />
  
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













































// import { useState } from 'react';
// import { Transaction, ForgeScript } from "@meshsdk/core";
// import type { Mint, AssetMetadata } from "@meshsdk/core";
// // import BrowserWallet
// import { BrowserWallet } from '@meshsdk/core';
// import axios from 'axios';

// function MyForm() {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [formData, setFormData] = useState({
//     ipfs: '',
//     title: '',
//     description: ''
//   });
  


//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   }

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(formData['ipfs']);
//     const handleSubmission = async () => {
//       if (!selectedFile) {
//         console.log("No file selected");
//         return;
//       }
  
//       const formData = new FormData();
  
//       formData.append("file", selectedFile);
  
//       const metadata = JSON.stringify({
//         name,
//         description,
//       });
  
//       formData.append("pinataMetadata", metadata);
  
//       const options = JSON.stringify({
//         cidVersion: 0,
//       });
  
//       formData.append("pinataOptions", options);
  
//       try {
//         const headers = {
//           "Content-Type": `multipart/form-data; boundary=${formData.toString().split("\n")[0].substring(2)}`,
//           Authorization: JWT,
//         };
//         const res = await axios.post(
//           "https://api.pinata.cloud/pinning/pinFileToIPFS",
//           formData,
//           {
//             headers,
//           }
//         );
//         console.log(res.data);
//         if (onUploadSuccess) {
//           onUploadSuccess(res.data.IpfsHash);
//         }
//         return res.data.IpfsHash;
  
//       } catch (error) {
//         console.log(error);
//       }
  
  
//     };

//     const CID = pinFileToIPFS();

//     async function mintNFT() {
//       const wallet = await BrowserWallet.enable('nami');

//       // prepare forgingScript
//       const usedAddress = await wallet.getUsedAddresses();
//       const address = usedAddress[0];
//       const forgingScript = ForgeScript.withOneSignature(address);

//       const tx = new Transaction({ initiator: wallet });

//       // define asset#1 metadata
      // const assetMetadata1: AssetMetadata = {
      //   "name": formData['title'],
      //   "image": CID,
      //   "mediaType": "image/jpg",
      //   "description": formData['description']
      // };
//       const asset1: Mint = {
//         assetName: 'T1',
//         assetQuantity: '1',
//         metadata: assetMetadata1,
//         label: '721',
//         recipient: 'addr_test1qrxpzfwdwtq9dzu2swe2hlmn9dptmz7dmv8cfs64va29xa03y2thexqurrtyve545ssjqmeywq40wanpqgyl654h57pqqz9eyd',
//       };
//       tx.mintAsset(
//         forgingScript,
//         asset1,
//       );

//       const unsignedTx = await tx.build();
//       const signedTx = await wallet.signTx(unsignedTx);
//       const txHash = await wallet.submitTx(signedTx);

//   }

//     // mintNFT();
//   }


//   return (
//     <>
//   <meta charSet="UTF-8" />
//   <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <link
//     rel="icon"
//     href="https://thumb.ac-illust.com/3e/3ed2e08c4f16e867d7129ee87fd320a8_t.jpeg"
//     type="image/gif"
//     sizes="16x16"
//   />
//   <link
//     href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
//     rel="stylesheet"
//     integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
//     crossOrigin="anonymous"
//   />
//   <link rel="stylesheet" href="../assets/themify-icons/themify-icons.css" />
//   <link rel="stylesheet" href="../assets/css/createNFT.css" />
//   <title>NFT | Ownership</title>
//   {/* Header */}
//   <header>
//     <div className="container">
//       <div className="row menu">
//         <div className="col-md-8 menu-left">
//           <div className="logo">
//             <img src="../assets/img/Logo.png" alt="" />
//             <h1>SALT</h1>
//           </div>
//           <ul className="menu-right">
//             <li>
//               <a href="">News</a>
//             </li>
//             <li>
//               <a href="">Explore</a>
//             </li>
//             <li>
//               <a href="">Create NFT</a>
//             </li>
//             <li>
//               <a href="">Community</a>
//             </li>
//             <li>
//               <a href="">Contact</a>
//             </li>
//           </ul>
//         </div>
//         <div className="col-md-4">
//           <div className="setting">
//             <a href="">
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
//   {/* Create NFT */}
//   <div className="container">
//     <div className="row">
//       <div className="col-md-12">
//         <h1 style={{ color: "#fff" }}>
//           <i className="ti ti-arrow-left">Return</i>
//         </h1>
//       </div>
//     </div>
//   </div>
//   <div className="container">
//     <div className="row createNFT">
//       <div className="col-md-12">
//         <div className="form-group">
// 	    <form onSubmit={handleSubmit}>
//           <div className="form-control">
//             <label htmlFor="nft">Image, Video, Audio, or 3D Model</label>
//             <p style={{ color: "#ccc", fontSize: 12 }}>
//               File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
//               OGG, GLB, GLTF. Max size: 100 MB
//             </p>
//             <input type="file" onChange={handleInputChange} />
//           </div>
//           <div className="form-control">
//             <label htmlFor="title">Title</label>
//             <input type="text" name="title" value={formData.title} onChange={handleInputChange}  className="form-control" placeholder="0xx..." />
//           </div>
          
//           <div className="form-control">
//             <label htmlFor="description">Description</label>
//             <input type="text" name="description" value={formData.description} onChange={handleInputChange}  className="form-control"  />
//           </div>

		
//           <div className="fee-tst">
//             <h1>Transaction Fee</h1>
//             <h2>
//               <span>0.02 ADA</span>
//             </h2>
//           </div>
//           <button type="submit" className="btn btn-warning">
//             Create NFT
//           </button>
// 	    </form>
//         </div>
//       </div>
//     </div>
//   </div>
// </>

//   );
// }

// export default MyForm;
