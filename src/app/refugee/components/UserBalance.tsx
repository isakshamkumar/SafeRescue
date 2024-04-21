import React, { useEffect, useState } from 'react'
import { Grid, TextField, Button, Card, Typography ,CircularProgress} from '@mui/material';
import { ethers } from 'ethers';
type Props = {}

export const UserBalance = ({contract}) => {
  const [actualBalance, setActualBalance] = useState(0);
  const [constractBalance,setContractBalance]=useState(0)
  const[loading,setLoading]=useState(false)
    useEffect(() => {
      setLoading(true)
      const fetchActualBalance = async () => {
        try {
          const balanceWei = await contract.checkActualBalance();
          const balanceEth = ethers.utils.formatEther(balanceWei);
          setActualBalance(balanceEth);
        } catch (error) {
          console.error("Error fetching actual balance:", error);
        }
      };
      const fetchContractBalance = async () => {
        try {
          const balanceWei = await contract.checkBalance();
          const balanceEth = ethers.utils.formatEther(balanceWei);
          setContractBalance(balanceEth);
        } catch (error) {
          console.error("Error fetching contract balance:", error);
        }
      };
  setLoading(false)
      fetchContractBalance();
      fetchActualBalance();
      
    }, [contract]);
  return (
    <>
   {loading ?<CircularProgress/> :   <Grid item xs={12} sm={4}>
    <Card sx={{
      p: 3,
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(20px)',
      borderRadius: '15px',
      boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
      border: '1px solid rgba( 255, 255, 255, 0.18 )',
    }}>
      <Typography variant="h3" gutterBottom style={{ color: '#fff' }}>Actual Balance </Typography>
      <Typography paragraph style={{ color: '#fff' }}> Your current balance is {actualBalance} ETH.</Typography>
      <Typography variant="h3" gutterBottom style={{ color: '#fff' }}>Contract Balance</Typography>
      <Typography paragraph style={{ color: '#fff' }}> Balance: {constractBalance} ETH.</Typography>
    </Card>
  </Grid> }
  
  </>
  )
}
