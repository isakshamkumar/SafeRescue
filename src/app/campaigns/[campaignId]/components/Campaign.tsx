"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Grid,Backdrop,CircularProgress } from '@mui/material';
import { ethers } from 'ethers';
import abi from '../../../refugee/contracts/FFH.sol/FFH.json'

const CampaignDetails = ({ campaign }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    walletAddress: '',
  });
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
 useEffect(()=>{
    const connectUser = async () => {
        const contractAddress = "0xfe3f3288e93983572b2E32419cE43e940A71eF74";
        const contractABI = abi.abi;
    
        try {
          // Check for MetaMask
          if (window.ethereum) {
            const { ethereum } = window;
    
            const accounts = await ethereum.request({
              method: "eth_requestAccounts",
            });
            window.ethereum.on("accountsChanged", () => {
              window.location.reload();
            });
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
    
            const contract = new ethers.Contract(
              contractAddress,
              contractABI,
              signer
            );
    
            const government = await contract.government();
    
            setState({ provider, signer, contract });
          } else if (window.web3) {
            const web3 = window.web3;
            const accounts = await web3.eth.requestAccounts();
    
            const provider = new ethers.providers.Web3Provider(
              web3.currentProvider
            );
            const signer = provider.getSigner();
    
            const contract = new ethers.Contract(
              contractAddress,
              contractABI,
              signer
            );
    
           
    
            setState({ provider, signer, contract });
           
          } else {
            throw new Error("MetaMask or Web3 provider not detected");
          }
        } catch (err) {
          console.log(err);
        }
      };
      connectUser()
 },[])
 const handleRegister = async () => {

    try {
      setOpen(true)
      const tx = await state?.contract.registerAsRefugee(
        name,
        email,
        phone,
        address,
        walletAddress,
        {
          value: ethers.utils.parseEther("0.0001"), 
        }
      );
      await tx.wait();
      setOpen(false)
      alert("Registration Successful!");
    } catch (error) {
      setOpen(false)
      alert("Registration Failed: " + error.message);
    }
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const { name, email, phone, address, walletAddress } = formData;

  return (
    <>
     <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
        <Typography>Initiating Transaction...</Typography>
      </Backdrop>
    <Typography style={{fontSize:'50px',position:'absolute',left:'40%',top:'7%'}}>Claim Relief Funds</Typography>
    <Grid container style={{height:'100vh',placeItems:'center'}} spacing={2}>
      <Grid item xs={12} style={{marginLeft:'8rem'}} sm={4}>
      <Card
  sx={{
    backdropFilter: "blur(2px)",
    bgcolor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    border: "1px solid #fff",
    borderRadius: "15px",
    transition: "box-shadow 0.3s ease, transform 0.3s ease",
    padding: "20px",
    height:'60vh',
    display:'flex',
    flexDirection:'column',
    gap:'5rem',
    pt:'2rem',
    // justifyContent:'center',
    alignItems:'center',
    fontFamily: "Roboto, sans-serif", // Change font family
    fontSize: "1.6rem", // Increase font size
  }}
>
  <CardContent>
    <Typography style={{fontSize:'44px'}} variant="h4" gutterBottom>
      {campaign.title}
    </Typography>
    <Typography style={{fontSize:'22px',opacity:'.7'}} variant="body2">
      Description: {campaign.description}
    </Typography>
    <Typography  style={{fontSize:'22px',opacity:'.7'}} variant="body2">
      Total Fund Amount: {campaign.totalFundAmount}
    </Typography>
    <Typography style={{fontSize:'22px',opacity:'.7'}} variant="body2">
      Relief Aid Per Person: {campaign.reliefAidPerPerson}
    </Typography>
    <Typography style={{fontSize:'22px',opacity:'.7'}}  variant="body2">
      Funding Organization: {campaign.fundingOrganization}
    </Typography>
    <Typography style={{fontSize:'22px',opacity:'.7'}}  variant="body2">
      Funding Wallet Address:{" "}
      <a
        href={`https://mumbai.polygonscan.com/address/${campaign.fundingWalletAddress}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#fff" }}
      >
        {campaign.fundingWalletAddress}
      </a>
    </Typography>
    <Typography style={{fontSize:'22px',opacity:'.7'}} variant="body2">
      Current Fund Balance: {campaign.currentFundBalance}
    </Typography>
    <div style={{fontSize:'22px',opacity:'.7'}}>
      Percentage Claimed: {campaign.claimedPercentage.toFixed(2)}
    </div>
  </CardContent>
</Card>

      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.2)", borderRadius: "10px", padding: "20px" }}>
          <Typography variant="h5" gutterBottom style={{ color: "#fff", marginBottom: "20px" }}>
            Enter Your Details
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              value={name}
              onChange={handleChange}
              fullWidth
              InputProps={{
                style: { color: "#fff", backgroundColor: "rgba(255, 255, 255, 0.1)", padding: "10px", borderRadius: "5px" },
              }}
              InputLabelProps={{ style: { color: "#fff" } }}
              sx={{ mb: 2 }}
            />
            <TextField
              name="email"
              label="Email Address"
              variant="outlined"
              value={email}
              onChange={handleChange}
              fullWidth
              InputProps={{
                style: { color: "#fff", backgroundColor: "rgba(255, 255, 255, 0.1)", padding: "10px", borderRadius: "5px" },
              }}
              InputLabelProps={{ style: { color: "#fff" } }}
              sx={{ mb: 2 }}
            />
            <TextField
              name="phone"
              label="Phone Number"
              variant="outlined"
              value={phone}
              onChange={handleChange}
              fullWidth
              InputProps={{
                style: { color: "#fff", backgroundColor: "rgba(255, 255, 255, 0.1)", padding: "10px", borderRadius: "5px" },
              }}
              InputLabelProps={{ style: { color: "#fff" } }}
              sx={{ mb: 2 }}
            />
            <TextField
              name="address"
              label="Address"
              variant="outlined"
              value={address}
              onChange={handleChange}
              fullWidth
              InputProps={{
                style: { color: "#fff", backgroundColor: "rgba(255, 255, 255, 0.1)", padding: "10px", borderRadius: "5px" },
              }}
              InputLabelProps={{ style: { color: "#fff" } }}
              sx={{ mb: 2 }}
            />
            <TextField
              name="walletAddress"
              label="Wallet Address"
              variant="outlined"
              value={walletAddress}
              onChange={handleChange}
              fullWidth
              InputProps={{
                style: { color: "#fff", backgroundColor: "rgba(255, 255, 255, 0.1)", padding: "10px", borderRadius: "5px" },
              }}
              InputLabelProps={{ style: { color: "#fff" } }}
              sx={{ mb: 2 }}
            />
            <Button onClick={handleRegister} variant="contained" color="primary" type="submit">
              Claim Funds
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
    </>
  );
};

export default CampaignDetails;
