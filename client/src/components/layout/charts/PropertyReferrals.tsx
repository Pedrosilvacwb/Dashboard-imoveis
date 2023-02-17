import React from 'react';
import { Box, Typography, Stack } from '@pankod/refine-mui';

import { propertyReferralsInfo } from 'constants/index';

interface ProgressBarProps {
  title: string;
  percentage: number;
  color: string;
}
const ProgressBar = ({ title, percentage, color }: ProgressBarProps) => (
  <Box width="100%">
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography fontSize={16} fontWeight={500} color="#11142d">
        {title}
      </Typography>
      <Typography fontSize={16} fontWeight={500} color="#11142d">
        {percentage}%
      </Typography>
    </Stack>
    <Box
      mt={2}
      position="relative"
      width="100%"
      height="8px"
      borderRadius={1}
      bgcolor="#E4E8EF"
    >
      <Box
        position="absolute"
        height="100%"
        borderRadius={1}
        width={`${percentage}%`}
        bgcolor={color}
      ></Box>
    </Box>
  </Box>
);

const PropertyReferrals = () => {
  return (
    <Box
      p={4}
      bgcolor="#FCFCFC"
      id="chart"
      minWidth={490}
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={600} color="#11142D">
        Referencias à propriedades
      </Typography>

      <Stack my="20px" direction="column" gap={4}>
        {propertyReferralsInfo.map((bar) => (
          <ProgressBar
            key={bar.title}
            title={bar.title}
            percentage={bar.percentage}
            color={bar.color}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default PropertyReferrals;
