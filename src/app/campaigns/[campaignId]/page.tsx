import { getCampaign } from '@/app/lib/getCampaign';
import React from 'react'
import CampaignDetails from './components/Campaign';
import { Box} from '@mui/material';
import Background from '@/app/refugee/components/Background';

type Props = {}

const page = async({params}) => {
   const {campaignId}=params;
   const {campaign}= await getCampaign(campaignId)
    
  return (
    <Box sx={{position:'relative',height:'100vh'}}>
<Background/>
<CampaignDetails campaign={campaign}/>
    </Box>
  )
}

export default page