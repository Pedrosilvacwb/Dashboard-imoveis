import { Box, Stack, Typography } from '@pankod/refine-mui';
import { useList } from '@pankod/refine-core';

import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
  TopAgent,
} from 'components';

const Home = () => {
  const { data, isLoading, isError } = useList({
    resource: 'propriedades',
    config: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const properties = data?.data ?? [];

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Ops, Algo deu errado...</div>;
  return (
    <Box>
      <Typography fontSize={25} fontWeight="700" color="#11142D">
        Dashboard
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Propriedades a venda"
          value={684}
          series={[75, 25]}
          colors={['#475ae8', '#e4e8ef']}
        />
        <PieChart
          title="Propriedades para alugar"
          value={550}
          series={[60, 40]}
          colors={['#475be8', '#e4e8ef']}
        />
        <PieChart
          title="Clientes"
          value={5684}
          series={[70, 30]}
          colors={['#275be8', '#e4e8ef']}
        />
        <PieChart
          title="Propriedades por cidade"
          value={555}
          series={[75, 25]}
          colors={['#475be8', '#e4e8ef']}
        />
      </Box>
      <Stack
        mt="25px"
        width="100%"
        direction={{ xs: 'column', lg: 'row' }}
        gap={4}
      >
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>
      <Box
        flex={1}
        borderRadius="15px"
        padding="20px"
        bgcolor="#fcfcfc"
        display="flex"
        flexDirection="column"
        minWidth="100%"
        mt="25px"
      >
        <Typography fontSize="18px" fontWeight={600} color="#11142d">
          Adicionados recentemente
        </Typography>
        <Box mt={2.5} sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {properties.map((prop) => (
            <PropertyCard
              key={prop.id}
              id={prop.id}
              title={prop.title}
              location={prop.location}
              photo={prop.photo}
              price={prop.price}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
