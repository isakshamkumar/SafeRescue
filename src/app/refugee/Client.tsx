"use client";
import { useState, useEffect } from "react";
import abi from "./contracts/FFH.sol/FFH.json";
import { ethers } from "ethers";
// import { CircularProgress } from "@mui/material";

import RegisterAsRefugee from "./components/RegisterAsRefugee";
import VerifyRefugee from "./components/VerifyRefugee";
import RejectRefugee from "./components/RejectRefugee";
import NonVerifiedRefugees from "./components/NonVerifiedRefugees";
import VerifiedRefugees from "./components/VerifiedRefugees";
import ActualBalance from "./components/ActualBalance";
import ContractBalance from "./components/ContractBalance";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import './refugee.css'
import {
  Typography,
  Container,
  Paper,
  CircularProgress,
  Button,
  Box,
  Card,
  CardContent,
  Modal,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { motion } from "framer-motion";
import Grid from "@mui/material/Grid";
import Background from "./components/Background";
import RegistrationForm from "./components/RegisterForm";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [account, setAccount] = useState("Not connected");
  const [isGovernment, setIsGovernment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accountLoading, setAccountLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const connectUser = async () => {
    const contractAddress = "0xfe3f3288e93983572b2E32419cE43e940A71eF74";
    const contractABI = abi.abi;

    try {
      setAccountLoading(true);
      // Check for MetaMask
      if (window.ethereum) {
        const { ethereum } = window;

        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        setAccount(accounts[0]);
        setAccountLoading(false);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const government = await contract.government();
        setIsGovernment(government.toLowerCase() === accounts[0]);

        setState({ provider, signer, contract });
        setLoading(false);
      } else if (window.web3) {
        const web3 = window.web3;
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);

        const provider = new ethers.providers.Web3Provider(
          web3.currentProvider
        );
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const government = await contract.government();
        setIsGovernment(government.toLowerCase() === accounts[0]);

        setState({ provider, signer, contract });
        setLoading(false);
      } else {
        throw new Error("MetaMask or Web3 provider not detected");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "14px",
    border: "1px solid gray",
    height: "50rem",
    width: "84vw",
  };
  console.log(state.contract,'contr');
  // console.log(JSON.stringify(state.contract),'stringify');
  
  
  return (
    <>
      <div style={{ position: "relative", height: "100vh" }}>
        <Background />
        <Container
          maxWidth="lg"
          style={{
            paddingTop: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <header style={{ textAlign: "center", marginBottom: "40px" }}>
            <img
              style={{ filter: "brightness(0) invert(1)" }}
              src={"/logoNew.png"}
              alt="logo"
              className="logo"
            />
            <Typography variant="subtitle1" gutterBottom className="account">
              Connected Account: {account}
            </Typography>
          </header>
          {account === "Not connected" ? (
            <Button
              onClick={connectUser}
              sx={{ backgroundColor: "gray", color: "white" }}
              variant="outlined"
            >
              Connect Account
            </Button>
          ) : (
            <Button
              onClick={handleOpen}
              sx={{ color: "white" }}
              variant="outlined"
            >
              Register As A Refugee
            </Button>
          )}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <RegistrationForm contract={state.contract} />
            </Box>
          </Modal>

      {/* {state.contract && isGovernment && (
        <>
          <div className="govAccount">
            <VerifyRefugee contract={state.contract} />
            <br />
            <RejectRefugee contract={state.contract} />
            <br />
          </div>
          <NonVerifiedRefugees contract={state.contract} />
          <br />
          <VerifiedRefugees contract={state.contract} />
          <br />
        </>
      )} */}
        </Container>
        <div style={{ margin: "11rem", marginTop: "3rem" }}>
          <Typography
            variant="h3"
            gutterBottom
            style={{
              color: "#fff",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Key Features and Benefits
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={3}>
              <Card
                style={{
                  backgroundColor: "transparent",
                  backdropFilter: "blur(10px)",
                  borderRadius: "15px",
                  padding: "20px",
                  border: "1px solid gray",
                  minHeight: "20rem",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ color: "#fff", fontSize: "29px" }}
                >
                  Efficient Refugee Registration
                </Typography>
                <Typography
                  paragraph
                  style={{ color: "#eee", fontSize: "19px", opacity: 0.8 }}
                >
                  Our platform streamlines the refugee registration process,
                  making it quick and easy. Refugees can register securely and
                  efficiently, allowing for quick and accurate verification by
                  government authorities.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid gray",
                  backdropFilter: "blur(10px)",
                  borderRadius: "15px",
                  padding: "25px",
                  minHeight: "20rem",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ color: "#fff", fontSize: "29px" }}
                >
                  Government Verification
                </Typography>
                <Typography
                  paragraph
                  style={{ color: "#eee", fontSize: "19px", opacity: 0.8 }}
                >
                  Government authorities can efficiently verify refugees using
                  our system. The verification process ensures the accuracy and
                  legitimacy of refugee data.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card
                style={{
                  backgroundColor: "transparent",
                  backdropFilter: "blur(10px)",
                  borderRadius: "15px",
                  padding: "20px",
                  minHeight: "20rem",
                  border: "1px solid gray",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ color: "#fff", fontSize: "29px" }}
                >
                  Transparent Tracking
                </Typography>
                <Typography
                  paragraph
                  style={{ color: "#eee", fontSize: "19px", opacity: 0.8 }}
                >
                  Our transparent tracking system ensures accountability and
                  trust. Refugees and authorities can track the status and
                  movement of refugees securely and transparently.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid gray",
                  backdropFilter: "blur(10px)",
                  borderRadius: "15px",
                  minHeight: "20rem",
                  padding: "20px",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ color: "#fff", fontSize: "29px" }}
                >
                  Secure Fund Management
                </Typography>
                <Typography
                  paragraph
                  style={{ color: "#eee", fontSize: "19px", opacity: 0.8 }}
                >
                  We guarantee secure fund management for financial stability.
                  Our system ensures that funds allocated for refugee assistance
                  are managed transparently and securely.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default App;
