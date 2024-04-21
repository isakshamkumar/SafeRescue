"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  Modal,
  CardContent,
  LinearProgress,
  Card,
} from "@mui/material";
// import { useRouter } from "next/navigation";
import { IDKitWidget, VerificationLevel, useIDKit } from "@worldcoin/idkit";
import Background from "./refugee/components/Background";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
// import styled from "@emotion/styled/types/base";

export default function Home() {
  const [action, setAction] = useState(null); // State variable to store the action value
  const { idkOpen, setOpen } = useIDKit();
  const [locationData, setLocationData] = useState(null);
  const [modalOpen, setModalOpen] = useState(true);
  const [campains, setcampains] = useState([]);
  const router = useRouter();


  useEffect(() => {
    const getCampaigns = async () => {
      const response = await fetch("http://localhost:3001/campaigns");
      const data = await response.json();
      setcampains(data.campaigns);
    };
    getCampaigns();
  }, []);
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get("http://ip-api.com/json");
        setLocationData(response.data);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocation();
  }, []);
  const handleClose = (event, reason) => {
    console.log(reason);

    if (reason !== "backdropClick") {
      setModalOpen(false);
    }
  };

  const handleSeeCamps = () => {
    handleClose();
  };
  const handleVerify = async (proof) => {
    //TODO:  IMplement Backend Verificaition from the given docs
    // throw new Error("TODO: verify proof server route")
    console.log(proof, "proooffff");

    console.log("verify proof called");
  };
  const onSuccess = () => {
    console.log("success");
    router.push(`/campaigns/${action}`);
  };

  const handleClaimFunds = (campaign) => {
    setAction(campaign.id);
    setOpen(true);
  };
  return (
    <>
      {modalOpen ? (
        <Modal
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            bgcolor: "rgba(0,0,0,0.5)",
          }}
        >
          <Box
            sx={{
              backdropFilter: "blur(180px)",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              boxShadow: 24,
              p: 4,
              borderRadius: 1,
              width: "30%",
              height: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
            }}
          >
            {locationData ? (
              <>
                <Typography
                  id="modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ fontFamily: "Arial", fontWeight: 500, lineHeight: 1.5 }}
                >
                  We noticed that you are from{" "}
                  <span
                    style={{
                      backgroundColor: "green",
                      fontFamily: "Arial",
                      fontWeight: 600,
                    }}
                  >
                    {locationData.city}
                  </span>
                  ,{" "}
                  <span
                    style={{
                      backgroundColor: "green",
                      fontFamily: "Arial",
                      fontWeight: 600,
                    }}
                  >
                    {locationData.country}
                  </span>
                  .
                </Typography>
                <Typography
                  id="modal-description"
                  sx={{
                    mt: 2,
                    fontFamily: "Arial",
                    fontWeight: 400,
                    lineHeight: 1.6,
                  }}
                >
                  Would you like to see the available relief camps <br />
                  <div
                    style={{
                      textAlign: "center",
                      fontFamily: "Arial",
                      fontWeight: 400,
                    }}
                  >
                    Or Register As Refugee?
                  </div>
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSeeCamps}
                  sx={{ mt: 2, fontFamily: "Arial", fontWeight: 500 }}
                >
                  See the available relief camps
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => router.push("/refugee")}
                  sx={{ mt: 2, fontFamily: "Arial", fontWeight: 500 }}
                >
                  View As Refugee
                </Button>
              </>
            ) : (
              <>
                <CircularProgress color="inherit" />
                <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                  Getting geolocation...
                </Typography>
              </>
            )}
          </Box>
        </Modal>
      ) : (
        <Box
          sx={{
            minHeight: "100vh",
            bgcolor: "#121212",
            fontFamily: "Roboto",
            p: 8,
            pt: 2,
            color: "#fff",
          }}
        >
          <Typography
            style={{ textAlign: "center", marginTop: "2rem" }}
            variant="h4"
            gutterBottom
          >
            Active Relief Campaigns
          </Typography>
          <Typography style={{ textAlign: "center" }} variant="h6" gutterBottom>
            Displayed are a list of active campaigns to help people affected by
            disasters in{" "}
            <span
              style={{
                backgroundColor: "green",
                fontFamily: "Arial",
                fontWeight: 600,
              }}
            >
              {locationData.city}
            </span>
            ,{" "}
            <span
              style={{
                backgroundColor: "green",
                fontFamily: "Arial",
                fontWeight: 600,
              }}
            >
              {locationData.country}
            </span>
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 2,
              position: "relative",
            }}
          >
            <Background />
            <IDKitWidget
              app_id="app_staging_f7460dc474259c030a86e304359dca17"
              action="aisehi"
              onSuccess={onSuccess} // callback when the modal is closed
              handleVerify={handleVerify} // callback when the proof is received
              verification_level={VerificationLevel.Device} // Minimum verification level accepted
            />
            {campains.map((campaign) => (
              <Card
                key={campaign.id}
                sx={{
                  backdropFilter: "blur(180px)",
                  bgcolor: "transparent",
                  color: "#fff",
                  border: "1px solid gray",
                  borderRadius: "15px",
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
                    cursor: "pointer",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    {campaign.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#ccc" }}>
                    {campaign.description}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#ccc" }}>
                    Total Fund Amount: {campaign.totalFundAmount}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#ccc" }}>
                    Relief Aid Per Person: {campaign.reliefAidPerPerson}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#ccc" }}>
                    Funding Organization: {campaign.fundingOrganization}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#ccc" }}>
                    Funding Wallet Address:{" "}
                    <a
                      href={`https://mumbai.polygonscan.com/address/${campaign.fundingWalletAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#ccc" }}
                    >
                      {campaign.fundingWalletAddress}
                    </a>
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#ccc" }}>
                    Current Fund Balance: {campaign.currentFundBalance}
                  </Typography>
                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    Percentage Claimed: {campaign.claimedPercentage.toFixed(2)}
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={campaign.claimedPercentage}
                    sx={{ marginBottom: "10px" }}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleClaimFunds(campaign)}
                    sx={{ mt: 2 }}
                  >
                    Verify World ID
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}
