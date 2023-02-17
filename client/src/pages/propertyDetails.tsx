import { useDelete, useGetIdentity, useShow } from '@pankod/refine-core';
import { useParams, useNavigate } from '@pankod/refine-react-router-v6';
import {
  ChatBubble,
  Delete,
  Edit,
  Phone,
  Place,
  Star,
} from '@mui/icons-material';
import { Typography, Box, Stack } from '@pankod/refine-mui';
import { CustomButton } from 'components';

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { id } = useParams();
  const { mutate } = useDelete();
  const { queryResult } = useShow();
  const { data, isLoading, isError } = queryResult;

  const propertyDetail = data?.data ?? {};

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Ocorreu um Erro</div>;

  const isCurrentUser = user.email === propertyDetail.creator.email;

  const handleDeleteProperty = () => {
    // eslint-disable-next-line no-restricted-globals
    const response = confirm('Tem certeza que quer deletar essa propriedade?');
    if (response) {
      mutate(
        {
          resource: 'propriedades',
          id: id as string,
        },
        {
          onSuccess: () => {
            navigate('/propriedades');
          },
        },
      );
    }
  };

  return (
    <Box
      borderRadius="15px"
      padding="20px"
      bgcolor="#FCFCFC"
      width="fit-content"
    >
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Detalhes da Propriedade
      </Typography>

      <Box
        mt="20px"
        display="flex"
        flexDirection={{ xs: 'column', lg: 'row' }}
        gap={4}
      >
        <Box flex={1} maxWidth={764}>
          <img
            src={propertyDetail.photo}
            alt="property_details-img"
            height={546}
            style={{ objectFit: 'cover', borderRadius: '10px' }}
            className="property_details-img"
          />

          <Box mt="15px">
            <Stack
              direction="row"
              justifyContent="space-between"
              flexWrap="wrap"
              alignItems="center"
            >
              <Typography
                fontSize={18}
                fontWeight={500}
                color="#11142D"
                textTransform="capitalize"
              >
                {propertyDetail.propertyType}
              </Typography>
              <Box>
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star key={`star-${item}`} sx={{ color: '#F2C94C' }} />
                ))}
              </Box>
            </Stack>

            <Stack
              direction="row"
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            >
              <Box>
                <Typography
                  fontSize={22}
                  fontWeight={600}
                  mt="10px"
                  color="#11142D"
                >
                  {propertyDetail.title}
                </Typography>
                <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                  <Place sx={{ color: '#808191' }} />
                  <Typography fontSize={14} color="#808191">
                    {propertyDetail.location}
                  </Typography>
                </Stack>
              </Box>

              <Box>
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  mt="10px"
                  color="#11142D"
                >
                  Preço
                </Typography>
                <Stack direction="row" alignItems="flex-end" gap={1}>
                  <Typography fontSize={25} fontWeight={700} color="#475BE8">
                    ${propertyDetail.price}
                  </Typography>
                </Stack>
              </Box>
            </Stack>

            <Stack mt="25px" direction="column" gap="10px">
              <Typography fontSize={18} color="#11142D">
                Description
              </Typography>
              <Typography fontSize={14} color="#808191">
                {propertyDetail.description}
              </Typography>
            </Stack>
          </Box>
        </Box>

        <Box
          width="100%"
          flex={1}
          maxWidth={326}
          display="flex"
          flexDirection="column"
          gap="20px"
        >
          <Stack
            width="100%"
            p={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            border="1px solid #E4E4E4"
            borderRadius={2}
          >
            <Stack
              mt={2}
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <Box mt="15px">
                <Typography fontSize={18} fontWeight={600} color="#11142D">
                  {propertyDetail.creator.name}
                </Typography>
                <Typography
                  mt="5px"
                  fontSize={14}
                  fontWeight={400}
                  color="#808191"
                >
                  Agent
                </Typography>
              </Box>

              <Stack mt="15px" direction="row" alignItems="center" gap={1}>
                <Place sx={{ color: '#808191' }} />
                <Typography fontSize={14} fontWeight={400} color="#808191">
                  Curitiba, PR
                </Typography>
              </Stack>

              <Typography mt={1} fontSize={16} fontWeight={600} color="#11142D">
                {propertyDetail.creator.allProperties.length} Propriedades
              </Typography>
            </Stack>

            <Stack
              width="100%"
              mt="25px"
              direction="row"
              flexWrap="wrap"
              gap={2}
            >
              <CustomButton
                title={!isCurrentUser ? 'Message' : 'Edit'}
                backgroundColor="#475BE8"
                color="#FCFCFC"
                fullWidth
                icon={!isCurrentUser ? <ChatBubble /> : <Edit />}
                handleClick={() => {
                  if (isCurrentUser) {
                    navigate(`/propriedades/edit/${propertyDetail._id}`);
                  }
                }}
              />
              <CustomButton
                title={!isCurrentUser ? 'Call' : 'Delete'}
                backgroundColor={!isCurrentUser ? '#2ED480' : '#d42e2e'}
                color="#FCFCFC"
                fullWidth
                icon={!isCurrentUser ? <Phone /> : <Delete />}
                handleClick={() => {
                  if (isCurrentUser) handleDeleteProperty();
                }}
              />
            </Stack>
          </Stack>

          <Box>
            <CustomButton
              title="Book Now"
              backgroundColor="#475BE8"
              color="#FCFCFC"
              fullWidth
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyDetails;
