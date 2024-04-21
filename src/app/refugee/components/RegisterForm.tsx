"use client";
import React, { useState } from "react";
import { Grid, TextField, Button, Card, Typography ,Backdrop,CircularProgress} from "@mui/material";
import { UserBalance } from "./UserBalance";
import { ethers } from "ethers";

const RegistrationForm = ({contract}) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nationality, setNationality] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [unhrcID, setUnhrcID] = useState("");
const[open,setOpen]=useState(false)
  const handleRegister = async () => {
    if (
      name === "" ||
      phoneNumber === "" ||
      nationality === "" ||
      currentAddress === "" ||
      unhrcID === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    try {
      setOpen(true)
      const tx = await contract.registerAsRefugee(
        name,
        phoneNumber,
        nationality,
        currentAddress,
        unhrcID,
        {
          value: ethers.utils.parseEther("0.0001"), // Sending 0.0001 ether with registration
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
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container sx={{ height: "100%" }}>
         <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
        <Typography>Registering Refugee...</Typography>
      </Backdrop>
      <Grid item xs={12} sm={8}>
        <Card
          sx={{
            p: 3,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(20px)",
            borderRadius: "15px",
            height: "100%",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            pt: "2rem",
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            style={{ color: "#fff", fontWeight: "400", textAlign: "center" }}
          >
            Register As a Refugee
          </Typography>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              InputProps={{
                style: { color: "#fff" },
                inputProps: {
                  style: { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                },
              }}
              InputLabelProps={{ style: { color: "#fff" } }} // Add this line
              sx={{
                mb: 2,
                backgroundColor: "rgba(50, 50, 50, 0.8)",
                borderRadius: "5px",
                border: "1px solid #fff",
              }} // Add this line
            />

            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              InputProps={{
                style: { color: "#fff" },
                inputProps: {
                  style: { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                },
              }}
              InputLabelProps={{ style: { color: "#fff" } }} // Add this line
              sx={{
                mb: 2,
                backgroundColor: "rgba(50, 50, 50, 0.8)",
                borderRadius: "5px",
                border: "1px solid #fff",
              }} // Add this line}
            />
            <TextField
              label="Nationality"
              variant="outlined"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              fullWidth
              InputProps={{
                style: { color: "#fff" },
                inputProps: {
                  style: { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                },
              }}
              InputLabelProps={{ style: { color: "#fff" } }} // Add this line
              sx={{
                mb: 2,
                backgroundColor: "rgba(50, 50, 50, 0.8)",
                borderRadius: "5px",
                border: "1px solid #fff",
              }} // Add this line
            />
            <TextField
              label="Current Address"
              variant="outlined"
              fullWidth
              value={currentAddress}
              onChange={(e) => setCurrentAddress(e.target.value)}
              InputProps={{
                style: { color: "#fff" },
                inputProps: {
                  style: { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                },
              }}
              InputLabelProps={{ style: { color: "#fff" } }} // Add this line
              sx={{
                mb: 2,
                backgroundColor: "rgba(50, 50, 50, 0.8)",
                borderRadius: "5px",
                border: "1px solid #fff",
              }} // Add this line
            />
            <TextField
              label="UNHRC ID"
              variant="outlined"
              fullWidth
              value={unhrcID}
              onChange={(e) => setUnhrcID(e.target.value)}
              InputProps={{
                style: { color: "#fff" },
                inputProps: {
                  style: { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                },
              }}
              InputLabelProps={{ style: { color: "#fff" } }} // Add this line
              sx={{
                mb: 2,
                backgroundColor: "rgba(50, 50, 50, 0.8)",
                borderRadius: "5px",
                border: "1px solid #fff",
              }} // Add this line
            />
            <Button
              onClick={handleRegister}
              variant="contained"
              color="primary"
              sx={{ height: "3rem", width: "8rem" }}
              type="button"
            >
              Register
            </Button>
          </form>
        </Card>
      </Grid>
      <UserBalance contract={contract} />
    </Grid>
  );
};

export default RegistrationForm;
